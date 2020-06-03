import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import LoginController from './controllers/LoginController';
import FavoriteController from './controllers/FavoriteController';

const routes = Router();

routes.get('/user', UserController.show);
routes.post('/user', UserController.store);

routes.post('/session/:id', SessionController.store);

routes.post('/login', LoginController.store);

routes.get('/favorites', FavoriteController.index);
routes.post('/favorite', FavoriteController.store);
routes.delete('/favorite/:id', FavoriteController.destroy);

export default routes;
