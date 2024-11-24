from django.apps import AppConfig
import threading
import asyncio
from aiokafka import AIOKafkaConsumer
from aiokafka.errors import KafkaError, NoBrokersAvailable

def run_consumer_in_thread():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    async def consume():
        try:
            consumer = AIOKafkaConsumer(
                'orders',
                bootstrap_servers='redpanda-service:9092',
                group_id='restaurants_group'
            )
            await consumer.start()
            try:
                async for msg in consumer:
                    print(f"Consumed: {msg.topic}, {msg.partition}, {msg.offset}, {msg.key}, {msg.value}, {msg.timestamp}")
                    # Process the message here
            finally:
                await consumer.stop()
        except NoBrokersAvailable:
            print("No brokers available. Check if the bootstrap server is up.")
        except KafkaError as e:
            print(f"An error occurred: {e}")
        finally:
            await consumer.stop()
    
    loop.run_until_complete(consume())

class RestaurantsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'restaurants'

    # def ready(self):
    # # Start the Kafka consumer in a background thread
    #     consumer_thread = threading.Thread(target=run_consumer_in_thread)
    #     consumer_thread.start()

 
