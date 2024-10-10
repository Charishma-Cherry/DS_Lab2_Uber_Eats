import logging
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Customer, Order, FavoriteRestaurant, CartItem, DeliveryAddress
from .serializers import CustomerSerializer, OrderSerializer, FavoriteRestaurantSerializer, CartItemSerializer, DeliveryAddressSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.views import ObtainAuthToken

logger = logging.getLogger(__name__)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        logger.info(f"Login attempt for user: {username}")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            serializer = self.get_serializer(user.customer)
            logger.info(f"Login successful for user: {username}")
            return Response({
                'token': token.key,
                'user': serializer.data
            })
        else:
            logger.warning(f"Login failed for user: {username}")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def signup(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        customer = Customer.objects.create(user=user)
        token, _ = Token.objects.get_or_create(user=user)
        serializer = self.get_serializer(customer)
        return Response({
            'token': token.key,
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    @permission_classes([IsAuthenticated])
    def profile(self, request):
        serializer = self.get_serializer(request.user.customer)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    @permission_classes([IsAuthenticated])
    def logout(self, request):
        request.auth.delete()
        return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user.customer)

    @action(detail=False, methods=['post'])
    def place_order(self, request):
        customer = request.user.customer
        cart_items = CartItem.objects.filter(customer=customer)
        
        if not cart_items:
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        total_price = sum(item.dish.price * item.quantity for item in cart_items)
        order = Order.objects.create(
            customer=customer,
            restaurant=cart_items[0].dish.restaurant,
            total_price=total_price,
            delivery_address=request.data.get('delivery_address')
        )

        # Add order items and clear cart
        for item in cart_items:
            order.orderitem_set.create(dish=item.dish, quantity=item.quantity, price=item.dish.price)
            item.delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class FavoriteRestaurantViewSet(viewsets.ModelViewSet):
    queryset = FavoriteRestaurant.objects.all()
    serializer_class = FavoriteRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FavoriteRestaurant.objects.filter(customer=self.request.user.customer)

    @action(detail=False, methods=['post'])
    def toggle_favorite(self, request):
        customer = request.user.customer
        restaurant_id = request.data.get('restaurant_id')
        favorite, created = FavoriteRestaurant.objects.get_or_create(
            customer=customer,
            restaurant_id=restaurant_id
        )
        if not created:
            favorite.delete()
            return Response({'status': 'removed'})
        return Response({'status': 'added'})

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(customer=self.request.user.customer)

    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        customer = request.user.customer
        dish_id = request.data.get('dish_id')
        quantity = request.data.get('quantity', 1)

        cart_item, created = CartItem.objects.get_or_create(
            customer=customer,
            dish_id=dish_id,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = CustomerSerializer(request.user.customer)
    return Response(serializer.data)


class DeliveryAddressViewSet(viewsets.ModelViewSet):
    serializer_class = DeliveryAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DeliveryAddress.objects.filter(customer=self.request.user.customer)

    def perform_create(self, serializer):
        logger.info(f"Creating new delivery address for user: {self.request.user.username}")
        serializer.save(customer=self.request.user.customer)

    def create(self, request, *args, **kwargs):
        logger.info(f"Received data for new delivery address: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            logger.info(f"Successfully created new delivery address: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            logger.error(f"Failed to create delivery address. Errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    