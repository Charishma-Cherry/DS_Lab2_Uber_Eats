import logging
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from order.models import Order,OrderItem
from customers.models import Customer,CartItem,DeliveryAddress
from .producer import send_order_message
from .serializers import OrderSerializer,OrderItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt

# Set up logging
logger = logging.getLogger(__name__)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    #permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny] 

    @csrf_exempt
    def get_queryset(self): 
        user = self.request.user
        if hasattr(user, 'customer'):
            return Order.objects.filter(customer=user.customer)
        elif hasattr(user, 'restaurant'):
            return Order.objects.filter(restaurant=user.restaurant)
        return Order.objects.none()

    @csrf_exempt
    @action(detail=False, methods=['post'], url_path='place_order')
    def place_order(self, request):
        customer = Customer.objects.get(user=request.user)
        restaurant_id = request.data.get('restaurant_id')
        cart_items = CartItem.objects.filter(customer=customer, restaurant_id=restaurant_id, state='placing')

        if not cart_items:
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        logger.info(request.data)

        deliveryAddr = DeliveryAddress.objects.get(id=request.data.get('delivery_address_id'))


        total_price = sum(item.dish.price * item.quantity for item in cart_items)
        order = Order.objects.create(
            customer=customer,
            restaurant_id=restaurant_id,
            total_price=total_price,
            delivery_address=deliveryAddr
        )

        # Create OrderItem instances from CartItem
        order_items = []
        for item in cart_items:
            order_item = OrderItem(
                order=order,
                dish=item.dish,
                quantity=item.quantity
            )
            order_items.append(order_item)
        OrderItem.objects.bulk_create(order_items)  # Bulk insert for efficiency

        # Link Cart Items to Order and update state
        cart_items.update(order=order, state='placed')

        
        #  # Publish to Kafka
        message = {
             "order_id": order.id,
             "customer_id": customer.id,
             "restaurant_id": restaurant_id,
             "total_price": total_price,
             "items": [{"dish": item.dish.name, "quantity": item.quantity} for item in order_items],
            }
        send_order_message(message)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @csrf_exempt
    @action(detail=False, methods=['get'])
    def getOrderDetail(self, request):
        order_id = request.GET.get('orderId')
        order = Order.objects.filter(id=order_id).first()
        if order:
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @csrf_exempt
    @action(detail=False, methods=['post'])
    def updateOrderStatus(self, request):
        order_id = request.data.get('orderId')
        order = Order.objects.filter(id=order_id).first()
        status = request.data.get('status')
        if status in dict(Order.STATUS_CHOICES):
            order.status = status
            order.save()
            return Response({'status': 'Order status updated'})
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
    
    @csrf_exempt
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='order_history')
    def order_history(self, request):
            customer = request.user.customer
            orders = Order.objects.filter(customer=customer).prefetch_related('orderitem_set')
            
            order_history_data = []
            for order in orders:
                order_data = OrderSerializer(order).data
                order_items = OrderItem.objects.filter(order=order)
                order_data['items'] = OrderItemSerializer(order_items, many=True).data
                order_history_data.append(order_data)

            return Response(order_history_data, status=status.HTTP_200_OK)