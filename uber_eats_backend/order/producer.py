from kafka import KafkaProducer
import simplejson as json
def send_order_message(topic, order_data):

    # Initialize Kafka producer
    producer = KafkaProducer(
        bootstrap_servers='kafka-service:9092',
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    )
    producer.send(topic, value=order_data)
    producer.flush()
