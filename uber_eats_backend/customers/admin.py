##Added
from django.contrib import admin
from .models import Customer, Order, FavoriteRestaurant, CartItem

admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(FavoriteRestaurant)
admin.site.register(CartItem)