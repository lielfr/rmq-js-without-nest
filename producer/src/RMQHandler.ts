import amqplib, { Channel } from "amqplib";
import { v4 as uuidv4 } from "uuid";
import { QueueHandler } from './QueueHandler';

export class RMQHandler extends QueueHandler {
  private static readonly REQUEST_QUEUE = "echo_queue";
  private static readonly RESPONSE_QUEUE = "echo_response_queue";

  static async establishConnection() {
    const conn = await amqplib.connect(process.env.RMQ_HOST || "");
    const channel = await conn.createChannel();
    await channel.assertQueue(this.REQUEST_QUEUE);
    await channel.assertQueue(this.RESPONSE_QUEUE);
    return new RMQHandler(conn, channel);
  }

  private constructor(
    private conn: amqplib.Connection,
    private channel: Channel
  ) {
    super();
  }

  async echo(query: string) {
    console.log(`RMQHandler: Sending message ${query} to RMQ`);
    const messageID = uuidv4();
    return new Promise((resolve, reject) => {
      this.channel.consume(RMQHandler.RESPONSE_QUEUE, (msg) => {
        console.log(`Got message: ${msg?.content.toString()}`);
        if (msg !== null) {
          const parsedMsg = JSON.parse(msg.content.toString());
          if (parsedMsg.msg_id === messageID) {
            this.channel.ack(msg);
            this.channel.close();
            resolve(parsedMsg.msg);
          }
        } else {
          reject("Consumer cancelled by server!");
        }
      });

      console.log("Sending message to consumer...");
      this.channel.sendToQueue(
        RMQHandler.REQUEST_QUEUE,
        Buffer.from(JSON.stringify({ echo: query, msg_id: messageID }))
      );
    });
  }
}