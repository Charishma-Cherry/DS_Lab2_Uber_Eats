from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Restaurant, Dish
from .serializers import RestaurantSerializer, DishSerializer, UserSerializer
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse("Welcome to Uber Eats!")

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

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
