from django.db import models
from django.contrib.auth.models import User
from restaurants.models import Restaurant, Dish

# Defining the Order model for storing customer orders
class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('preparing', 'Preparing'),
        ('on_the_way', 'On the Way'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('pickup_ready', 'Pick up Ready'),
        ('picked_up', 'Picked Up'),
    ]
    customer = models.ForeignKey('customers.Customer', on_delete=models.CASCADE)  # Lazy reference
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    delivery_address = models.ForeignKey('customers.DeliveryAddress', on_delete=models.SET_NULL, null=True)  # Lazy reference

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.dish.name} (x{self.quantity})"
