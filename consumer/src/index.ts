import { RMQHandler } from './RMQHandler';

(async () => {
  const handler = await RMQHandler.establishConnection();
  handler.handleResponses();
})();