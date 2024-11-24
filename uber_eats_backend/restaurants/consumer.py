from aiokafka import AIOKafkaConsumer
import asyncio

async def consume():
    consumer = AIOKafkaConsumer(
        'orders', None,
        bootstrap_servers='redpanda-service:9092',
        group_id="restaurants_group"
    )
    
    # Start the consumer
    await consumer.start()
    
    try:
        # Consume messages
        async for msg in consumer:
            print("Consumed:", msg.topic, msg.partition, msg.offset, msg.key, msg.value, msg.timestamp)
    finally:
        # Stop the consumer
        await consumer.stop()

asyncio.run(consume())