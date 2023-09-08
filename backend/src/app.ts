import express, { Request, Response } from 'express';
import router from './routers';

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.get(
      '/',
      async (_req: Request, res: Response): Promise<Response> => res.status(200).json(
        { message: 'Yeeeiiiii'} ),
    );
    this.routers();
  }

  private routers(): void {
    this.app.use(router);
  }


  public start(PORT: string | number): void {
    this.app.listen(PORT,
      () => console.log(`backend de todoList up and running on PORT ${PORT}`));
  }

}