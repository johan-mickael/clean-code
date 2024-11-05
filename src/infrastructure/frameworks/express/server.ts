import express, { Request, Response } from 'express';

const app = express();
const PORT = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
