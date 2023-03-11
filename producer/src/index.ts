import express, { Application } from 'express';
import healthCheck from './healthCheck';
import echo from './echo';

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use('/health', healthCheck);
app.use('/echo', echo);

app.listen(PORT, ():void => {
  console.log(`Server running on port ${PORT}`);
});