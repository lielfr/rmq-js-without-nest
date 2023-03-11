import { Request, Response, Router } from 'express';
import { RMQHandler } from './RMQHandler';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const text = req.query['q'];
    const rmqHandler = await RMQHandler.establishConnection();
    if (!text || typeof(text) !== 'string') {
        res.status(400).send('Missing or invalid q param');
    } else {
        const response = await rmqHandler.echo(text);
        res.json(response);
    }
});

export default router;