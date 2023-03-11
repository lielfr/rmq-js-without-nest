import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.json({
    status: 'OK',
    timestamp: new Date()
  });
});

export default router;