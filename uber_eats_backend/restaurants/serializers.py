from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Restaurant, Dish


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class RestaurantSerializer(serializers.ModelSerializer):
    #user = UserSerializer()

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'address', 'phone_number', 'image', 'rating']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer().create(user_data)
        restaurant = Restaurant.objects.create(user=user, **validated_data)
        return restaurant

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
        return super().update(instance, validated_data)

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id', 'name', 'restaurant', 'description', 'price', 'image', 'is_vegetarian', 'is_vegan', 'is_gluten_free']