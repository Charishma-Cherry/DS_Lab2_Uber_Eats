# from django.db import models
# from django.contrib.auth.models import User  # Import the User model

    
# class Restaurant(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)  
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#     address = models.CharField(max_length=255, null=True, blank=True)
#     phone_number = models.CharField(max_length=20, null=True, blank=True)
#     image = models.ImageField(upload_to='restaurant_images/', null=True, blank=True)
#     rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
#     opening_time = models.TimeField(null=True, blank=True)  # Add opening time
#     closing_time = models.TimeField(null=True, blank=True)  # Add closing time

#     def __str__(self):
#         return self.name


# class Dish(models.Model):
#     restaurant = models.ForeignKey(Restaurant, related_name='dishes', on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#     price = models.DecimalField(max_digits=6, decimal_places=2)
#     image = models.ImageField(upload_to='dish_images/', null=True, blank=True)
#     is_vegetarian = models.BooleanField(default=False)
#     is_vegan = models.BooleanField(default=False)
#     is_gluten_free = models.BooleanField(default=False)

#     def __str__(self):
#         return f"{self.name} - {self.restaurant.name}"

# restaurants/models.py
from django.db import models
from django.contrib.auth.models import User

class Restaurant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    address = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    image = models.ImageField(upload_to='restaurant_images/', null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    opening_time = models.TimeField(null=True, blank=True)
    closing_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Dish(models.Model):
    restaurant = models.ForeignKey(Restaurant, related_name='dishes', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='dish_images/', null=True, blank=True)
    is_vegetarian = models.BooleanField(default=False)
    is_vegan = models.BooleanField(default=False)
    is_gluten_free = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"