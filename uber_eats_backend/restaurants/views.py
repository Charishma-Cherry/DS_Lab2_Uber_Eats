# restaurants/views.py
import logging
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Restaurant, Dish
from .serializers import RestaurantSerializer, DishSerializer

logger = logging.getLogger(__name__)

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    @action(detail=True, methods=['get'])
    def dishes(self, request, pk=None):
        logger.info(f"Fetching dishes for restaurant with ID: {pk}")
        restaurant = self.get_object()
        dishes = Dish.objects.filter(restaurant=restaurant)
        serializer = DishSerializer(dishes, many=True)
        logger.info(f"Found {len(dishes)} dishes for restaurant {restaurant.name}")
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        logger.info(f"Retrieving restaurant details for ID: {kwargs.get('pk')}")
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        logger.info(f"Retrieved details for restaurant: {instance.name}")
        return Response(serializer.data)

class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer