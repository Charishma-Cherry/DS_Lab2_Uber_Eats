from rest_framework import serializers
from django.apps import apps
from restaurants.serializers import RestaurantSerializer, DishSerializer
from .models import Order, OrderItem

# Serializer for the OrderItem model
class OrderItemSerializer(serializers.ModelSerializer):
    dish = DishSerializer(read_only=True)  # Nested read-only dish serializer

    class Meta:
        model = OrderItem
        fields = ['id', 'dish', 'quantity']  # Fields to include in the serialized representation

# Serializer for the Order model
class OrderSerializer(serializers.ModelSerializer):
    # Lazy imports to avoid circular import issues
    delivery_address = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()

    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)  # Total price field
    restaurant = RestaurantSerializer(read_only=True)  # Nested read-only restaurant serializer
    items = OrderItemSerializer(many=True, read_only=True)  # Nested read-only order items

    class Meta:
        model = Order
        fields = '__all__'  # Include all fields from the Order model

    def get_delivery_address(self, obj):
        # Lazy import to avoid circular import
        from customers.serializers import DeliveryAddressSerializer
        # Serialize and return the full delivery address details
        return DeliveryAddressSerializer(obj.delivery_address).data

    def get_customer(self, obj):
        # Lazy import to avoid circular import
        from customers.serializers import CustomerSerializer
        # Serialize and return the full customer details
        return CustomerSerializer(obj.customer).data

