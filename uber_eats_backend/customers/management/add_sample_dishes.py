# restaurants/management/commands/add_sample_dishes.py

from django.core.management.base import BaseCommand
from restaurants.models import Restaurant, Dish
from django.db import transaction
import random

class Command(BaseCommand):
    help = 'Adds sample dishes to existing restaurants'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        restaurants = Restaurant.objects.all()

        if not restaurants:
            self.stdout.write(self.style.ERROR('No restaurants found. Please add restaurants first.'))
            return

        sample_dishes = [
            {
                'name': 'Margherita Pizza',
                'description': 'Classic pizza with tomato sauce, mozzarella, and basil',
                'price': 10.99,
                'category': 'Pizza'
            },
            {
                'name': 'Chicken Burger',
                'description': 'Juicy chicken patty with lettuce, tomato, and special sauce',
                'price': 8.99,
                'category': 'Burger'
            },
            {
                'name': 'Caesar Salad',
                'description': 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
                'price': 7.99,
                'category': 'Salad'
            },
            {
                'name': 'Spaghetti Carbonara',
                'description': 'Classic Italian pasta with eggs, cheese, pancetta, and black pepper',
                'price': 12.99,
                'category': 'Pasta'
            },
            {
                'name': 'Vegetable Stir Fry',
                'description': 'Assorted vegetables stir-fried in a savory sauce',
                'price': 9.99,
                'category': 'Asian'
            }
        ]

        dishes_created = 0

        for restaurant in restaurants:
            # Add 3-5 random dishes to each restaurant
            for _ in range(random.randint(3, 5)):
                dish = random.choice(sample_dishes)
                Dish.objects.create(
                    restaurant=restaurant,
                    name=dish['name'],
                    description=dish['description'],
                    price=dish['price'],
                    category=dish['category']
                )
                dishes_created += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully added {dishes_created} sample dishes'))