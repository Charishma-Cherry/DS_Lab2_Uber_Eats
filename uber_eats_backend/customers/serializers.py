from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Customer, Order, FavoriteRestaurant, CartItem, DeliveryAddress
from restaurants.serializers import RestaurantSerializer, DishSerializer
from .models import Restaurant, Dish

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = '__all__'

   
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer().create(user_data)
        customer = Customer.objects.create(user=user, **validated_data)
        return customer

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
        return super().update(instance, validated_data)


class FavoriteRestaurantSerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer(read_only=True)

    class Meta:
        model = FavoriteRestaurant
        fields = '__all__'


class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = ['id', 'address_line1', 'city', 'state', 'postal_code', 'country','is_default']
        read_only_fields = ['id']


class OrderSerializer(serializers.ModelSerializer):
    delivery_address = DeliveryAddressSerializer(read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    customer = CustomerSerializer(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    dish = DishSerializer(read_only=True)
    order = OrderSerializer(read_only=True)

    # class Meta:
    #     model = CartItem
    #     fields = '__all__'
    class Meta:
        model = CartItem
        fields = ['id', 'dish', 'quantity', 'restaurant' , 'customer' , 'order']

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'address', 'phone_number', 'image', 'rating']

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id', 'name', 'description', 'price', 'image', 'is_vegetarian', 'is_vegan', 'is_gluten_free']