from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from customers.views import CustomerViewSet, OrderViewSet, FavoriteRestaurantViewSet, CartItemViewSet, DeliveryAddressViewSet, me, CustomAuthToken
from restaurants.views import RestaurantViewSet, DishViewSet

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'favorite-restaurants', FavoriteRestaurantViewSet, basename='favorite-restaurant')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')
router.register(r'restaurants', RestaurantViewSet)  # Handles the new restaurant signup
router.register(r'dishes', DishViewSet)
router.register(r'delivery-addresses', DeliveryAddressViewSet, basename='delivery-address')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/me/', me, name='me'),
    # Begin New Chari
    path('api/restaurants/dashboard/', RestaurantViewSet.as_view({'get': 'dashboard'}), name='restaurant_dashboard'),
    path('api/restaurants/<int:pk>/', RestaurantViewSet.as_view({'get': 'retrieve'}), name='restaurant-detail'),
    path('api/restaurants/<int:pk>/dishes/', RestaurantViewSet.as_view({'get': 'list_dishes'}), name='restaurant-dishes'),
    # End New Chari
    path('api/customers/login/', CustomAuthToken.as_view(), name='api_token_auth'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
