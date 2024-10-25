from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import Restaurant, Dish
from .serializers import RestaurantSerializer, DishSerializer, UserSerializer
from django.http import HttpResponse
from django.shortcuts import render
from customers.models import Order
from customers.serializers import OrderSerializer
import logging
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny  # Ensure this is included


logger = logging.getLogger(__name__)


def home(request):
    return HttpResponse("Welcome to Uber Eats!")

# class RestaurantViewSet(viewsets.ModelViewSet):
#     queryset = Restaurant.objects.all()
#     serializer_class = RestaurantSerializer

#     @action(detail=False, methods=['post'])
#     def login(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         logger.info(f"Login attempt for Restaurant: {username}")
#         user = authenticate(username=username, password=password)
#         if user:
#             token, _ = Token.objects.get_or_create(user=user)
#             serializer = self.get_serializer(user.restaurant)
#             logger.info(f"Login successful for user: {username}")
#             return Response({
#                 'token': token.key,
#                 'user': serializer.data,
#             })
#         else:
#             logger.warning(f"Login failed for Restaurant: {username}")
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        


#     @action(detail=False, methods=['post'])
#     def signup(self, request):
#         user_data = request.data['user']
#         restaurant_data = request.data

#         # Create the user first
#         user_serializer = UserSerializer(data=user_data)
#         if user_serializer.is_valid():
#             user = user_serializer.save()

#             # Then create the restaurant profile associated with the user
#             restaurant_serializer = RestaurantSerializer(data=restaurant_data)
#             if restaurant_serializer.is_valid():
#                 restaurant = Restaurant.objects.create(user=user, **restaurant_data)
#                 return Response({'message': 'Restaurant created successfully'}, status=status.HTTP_201_CREATED)
#             else:
#                 return Response(restaurant_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     @action(detail=True, methods=['get'])
#     def dishes(self, request, pk=None):
#         restaurant = self.get_object()
#         dishes = Dish.objects.filter(restaurant=restaurant)
#         serializer = DishSerializer(dishes, many=True)
#         return Response(serializer.data)

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    @action(detail=False, methods=['post'])
    def signup(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        restaurant_name = request.data.get('restaurant_name')
        address = request.data.get('address')

        if not all([username, password, email, restaurant_name, address]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, password=password, email=email)
            restaurant = Restaurant.objects.create(user=user, name=restaurant_name, address=address)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'restaurant_id': restaurant.id,
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def orders(self, request):
        restaurant_id = request.GET.get('restaurantId')
        logger.info( OrderSerializer(Order.objects, many=True).data)
        logger.info("rest id: " + restaurant_id)

        order_items = Order.objects.filter(restaurant__id=restaurant_id)
        logger.info(order_items)
        if(order_items) :
            serializer = OrderSerializer(order_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    @permission_classes([IsAuthenticated])
    def dashboard(self, request):
        restaurant = request.user.restaurant
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)
    
    @action(detail=False, methods=['patch'])
    @permission_classes([IsAuthenticated])
    def update_profile(self, request):
        restaurant = request.user.restaurant
        serializer = self.get_serializer(restaurant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    @permission_classes([IsAuthenticated])
    def add_dish(self, request):
        try:
            restaurant = request.user.restaurant  # Ensure this retrieves the correct restaurant instance
            logger.info(f"Received data for new dish: {request.data}")
            
            serializer = DishSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save(restaurant=restaurant)  # Associate dish with the restaurant
                logger.info(f"Successfully added new dish: {serializer.data}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            logger.error(f"Failed to add dish. Errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Exception occurred while adding dish: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get'])
    @permission_classes([IsAuthenticated])
    def list_dishes(self, request, pk=None):
        try:
            restaurant = self.get_object()  # Get the restaurant instance by ID
            dishes = restaurant.dishes.all()  # Fetch all dishes associated with this restaurant
            serializer = DishSerializer(dishes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Restaurant.DoesNotExist:
            return Response({'error': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error fetching dishes for restaurant {pk}: {str(e)}")
            return Response({'error': 'Failed to fetch dishes'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        logger.info(f"Login attempt for user: {username}")
        user = authenticate(username=username, password=password)
        if user:
        # Check if the user has a related restaurant
            if hasattr(user, 'restaurant'):
              token, _ = Token.objects.get_or_create(user=user)
              return Response({
                'token': token.key,
                'user_id': user.id,
                'restaurant_id': user.restaurant.id,
            })
            else:
                logger.warning(f"User {username} does not have an associated restaurant.")
                return Response({'error': 'User does not have an associated restaurant'}, status=status.HTTP_400_BAD_REQUEST)
        else:
         logger.warning(f"Login failed for user: {username}")
         return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

   
    @action(detail=False, methods=['post'])
    def createDish(self, request):
        restaurant_id = request.data.get('restaurant_id')
        logger.info(restaurant_id)

        # : write logic to create dish from request
        logger.info(restaurant_id)

        # Add order items and clear cart
        # for item in cart_items:
        #     order.create(dish=item.dish, quantity=item.quantity, price=item.dish.price)
        #     item.delete()


        serializer = self.get_serializer(Dish.objects.filter(id= 1))
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def getDish(self, request):
        dish_id = request.GET.get('dishId')
        logger.info("dish id" + dish_id)

        dish = Dish.objects.filter(id=dish_id)
        logger.info(dish.values())

        if(dish) :
            serializer = DishSerializer(dish, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['put'])
    def editDish(self, request):
        dish_id = request.GET.get('dishId')
        logger.info("dish id" + dish_id)

        dish = Dish.objects.filter(id=dish_id)
        logger.info(dish.values())

        if(dish) :
            serializer = DishSerializer(dish, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)

