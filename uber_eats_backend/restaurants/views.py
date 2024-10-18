from rest_framework import viewsets, status
from rest_framework.decorators import action
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

logger = logging.getLogger(__name__)

def home(request):
    return HttpResponse("Welcome to Uber Eats!")

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        logger.info(f"Login attempt for Restaurant: {username}")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            serializer = self.get_serializer(user.restaurant)
            logger.info(f"Login successful for user: {username}")
            return Response({
                'token': token.key,
                'user': serializer.data,
            })
        else:
            logger.warning(f"Login failed for Restaurant: {username}")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'])
    def orders(self, request):
        restaurant_id = request.GET.get('restaurantId')
        logger.info("rest id: " + restaurant_id)
        order_items = Order.objects.filter(restaurant__id=restaurant_id)
        logger.info(order_items)
        if(order_items) :
            serializer = OrderSerializer(order_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['post'])
    def signup(self, request):
        user_data = request.data['user']
        restaurant_data = request.data

        # Create the user first
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()

            # Then create the restaurant profile associated with the user
            restaurant_serializer = RestaurantSerializer(data=restaurant_data)
            if restaurant_serializer.is_valid():
                restaurant = Restaurant.objects.create(user=user, **restaurant_data)
                return Response({'message': 'Restaurant created successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response(restaurant_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def dishes(self, request, pk=None):
        restaurant = self.get_object()
        dishes = Dish.objects.filter(restaurant=restaurant)
        serializer = DishSerializer(dishes, many=True)
        return Response(serializer.data)

class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

   
    @action(detail=False, methods=['post'])
    def createDish(self, request):
        restaurant_id = request.data.get('restaurant_id')
        logger.info(restaurant_id)

        #TODO: write logic to create dish from request
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
