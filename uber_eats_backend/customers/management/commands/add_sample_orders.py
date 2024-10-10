from django.core.management.base import BaseCommand
from customers.models import Customer, Order, DeliveryAddress
from restaurants.models import Restaurant
import random

class Command(BaseCommand):
    help = 'Adds sample orders to the database'

    def handle(self, *args, **kwargs):
        customers = Customer.objects.all()
        restaurants = Restaurant.objects.all()

        if not customers or not restaurants:
            self.stdout.write(self.style.ERROR('No customers or restaurants found. Please add some first.'))
            return

        for customer in customers:
            # Create a sample delivery address for each customer
            delivery_address = DeliveryAddress.objects.create(
                customer=customer,
                address_line1=f'{customer.user.username} Street',
                city='Sample City',
                state='Sample State',
                country='Sample Country',
                postal_code=str(random.randint(10000, 99999))
            )

            for _ in range(random.randint(1, 5)):  # 1-5 orders per customer
                restaurant = random.choice(restaurants)
                Order.objects.create(
                    customer=customer,
                    restaurant=restaurant,
                    status=random.choice(['new', 'preparing', 'on_the_way', 'delivered']),
                    total_price=random.uniform(10.0, 100.0),
                    delivery_address=delivery_address
                )

        self.stdout.write(self.style.SUCCESS('Successfully added sample orders'))