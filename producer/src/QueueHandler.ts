
export abstract class QueueHandler {
  public static establishConnection(): any {}
  public abstract echo(query: string): Promise<any>;
}