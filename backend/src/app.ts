import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Routes from './routes';
import connection from './database/connection';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private database(): void {
    connection;
  }

  private routes(): void {
    this.app.use(Routes);
  }
}

export default new App().app;
