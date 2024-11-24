from django.apps import AppConfig
import threading
from restaurants.consumer import process_messages

class RestaurantsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'restaurants'

    def ready(self):
    # Start the Kafka consumer in a background thread
        threading.Thread(target=process_messages, daemon=True).start()
