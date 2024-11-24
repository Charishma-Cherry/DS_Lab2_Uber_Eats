from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers="redpanda:9092")

def send_order_message(order_data):
    producer.send("orders", value=order_data.encode("utf-8"))
    producer.flush()
