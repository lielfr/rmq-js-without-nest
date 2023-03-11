# Important Note
This is just for experimentation, not for any production code. It does not have any proper error handling/timeout/etc.

# Getting Started

Make sure you have Docker installed and running.

Create a `.env.local` file at the root with at least these parameters:
```
RMQ_HOST=amqp://rmq:5672
QUEUE_NAME=consumer_queue
```

If you wish to have custom username and password, you can do it like this:
```
RMQ_HOST=amqp://user:pass@rmq:5672
QUEUE_NAME=consumer_queue
RABBITMQ_DEFAULT_USER=user
RABBITMQ_DEFAULT_PASS=pass
```

Then you can run the project with `docker compose up --build` (recommended to run without `-d` for real time logs).

# APIs and URLs

* Use https://localhost:15672 to access RabbitMQ management console (use the username and password you gave in the env file, or just `guest` for both if you haven't set custom ones)
* Use https://localhost:3000 to access the producer's API. You have two endpoints:
    * `/health` - health check, returns just two parameters: status=OK and current time
    * `/echo?q=<string>` - uses RMQ and the consumer to execute a simple echo, with an added prefix. You can also see the string passed as query param in the consumer's logs