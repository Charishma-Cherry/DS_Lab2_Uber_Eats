from kafka import KafkaProducer

def send_order_message(order_data):
    producer = KafkaProducer(bootstrap_servers="redpanda-service:9092")
    producer.send("orders", value=order_data.encode("utf-8"))
    producer.flush()
