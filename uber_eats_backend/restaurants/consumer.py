from kafka import KafkaConsumer
import time

def create_consumer():
    # for _ in range(10):
    try:
        return KafkaConsumer(
            'orders',
            bootstrap_servers=['redpanda:9092'],
            group_id='restaurants_group',
            auto_offset_reset='earliest',
        )
    except Exception as e:
        print(f"Waiting for Kafka... {e}")
        # time.sleep(600)
    # raise RuntimeError("Kafka is not available after 10 retries")

def process_messages():
    try:
        consumer = create_consumer()
        for message in consumer:
        # Safely decode message value
            value = message.value
            if value:
                decoded_value = value.decode('utf-8')
                print(f"Received: {decoded_value}")
            else:
                print("Received an empty message")
    except Exception as e:
        print(f"Error processing messages: {e}")
