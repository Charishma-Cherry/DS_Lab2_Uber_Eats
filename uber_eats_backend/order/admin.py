from django.contrib import admin

# Importing models to be registered in the Django admin site
from .models import Order

# Registering the Order model with the admin site
admin.site.register(Order)


