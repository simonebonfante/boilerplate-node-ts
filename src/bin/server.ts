import 'reflect-metadata';
import { config } from 'dotenv';
import { Container } from 'inversify';
import inversifyConfig from '../ioc/inversify.config';
import applicationConfig from '../app';
import { Application, NextFunction, Request, Response, Router } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import httpStatusCodes from 'http-status-codes';
import { SequelizeConfig } from '../utils/sequelize.config';

(async (): Promise<void> => {
  config();
  const container: Container = inversifyConfig();
  const application: Application = applicationConfig();

  const router: Router = Router({
    mergeParams: true,
    caseSensitive: true,
    strict: false,
  });

  const db = new SequelizeConfig();
  db.setupModels();
  await db.setupDb();

  const server: InversifyExpressServer = new InversifyExpressServer(container, router, { rootPath: '/' }, application);
  server.setErrorConfig((app: Application) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((req: Request, res: Response, next: NextFunction) => {
      res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ status: httpStatusCodes.NOT_FOUND, message: 'Endpoint is not found' });
    });
  });
  const serverInstance = server.build();
  const port = Number(process.env.PORT) || 8080;
  serverInstance.listen(port, process.env.DB_HOST as string, () => {
    console.log(`${process.env.APP_NAME} listening on ${port}`);
  });
})()
.then(() => {
  console.log(`${process.env.APP_NAME} has been initialized`);
})
.catch((error: Error) => {
  throw error;
});