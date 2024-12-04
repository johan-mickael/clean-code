import { Request, Response } from 'express';

export default class HelloController {
  async hello(req: Request, res: Response) {
    return res.status(200).json({ message: 'Hello World' });
  }
}
