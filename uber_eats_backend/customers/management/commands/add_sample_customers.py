from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from customers.models import Customer
import random

class Command(BaseCommand):
    help = 'Adds sample customers to the database'

    def handle(self, *args, **kwargs):
        for i in range(10):  # Create 10 sample customers
            username = f'customer{i}'
            email = f'customer{i}@example.com'
            password = 'password123'
            user = User.objects.create_user(username=username, email=email, password=password)
            Customer.objects.create(
                user=user,
                date_of_birth='1990-01-01',
                city='Sample City',
                state='Sample State',
                country='Sample Country',
                nickname=f'Nickname{i}',
                phone_number=f'123456789{i}'
            )
        self.stdout.write(self.style.SUCCESS('Successfully added sample customers'))