import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);
// routes.post(
//   '/motorcycles',
//   (req, res, next) => new MotorcycleController(req, res, next).create(),
// );
routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).findById(),
);
routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).findAll(),
);
routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);

export default routes;
