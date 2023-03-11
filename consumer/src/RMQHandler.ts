import amqplib, { Channel, Connection } from 'amqplib';

export class RMQHandler {
  private static readonly REQUEST_QUEUE = "echo_queue";
  private static readonly RESPONSE_QUEUE = "echo_response_queue";

  private constructor(private conn: Connection, private channel: Channel) {}

  static async establishConnection() {
    const conn = await amqplib.connect(process.env.RMQ_HOST || '');
    const channel = await conn.createChannel();
    await channel.assertQueue(this.REQUEST_QUEUE);
    await channel.assertQueue(this.RESPONSE_QUEUE);

    return new RMQHandler(conn, channel);
  }

  public handleResponses() {
    this.channel.consume(RMQHandler.REQUEST_QUEUE, msg => {
      console.log(`Got message: ${msg?.content.toString()}`)
      if (msg !== null) {
        const { echo, msg_id } = JSON.parse(msg.content.toString());
        this.channel.sendToQueue(RMQHandler.RESPONSE_QUEUE, Buffer.from(JSON.stringify({
          msg_id,
          msg: `Hello from consumer: ${echo}`
        })));
        this.channel.ack(msg);
      } else {
        console.log('got NULL message, closing connection');
        this.channel.close();
        this.conn.close();
      }
    })
  }
}