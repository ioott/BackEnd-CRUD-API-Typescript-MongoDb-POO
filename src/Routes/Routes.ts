import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);
routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);
routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).findById(),
);
routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).findById(),
);
routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).findAll(),
);
routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).findAll(),
);
routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);
routes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);
routes.delete(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).delete(),
);
routes.delete(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).delete(),
);
export default routes;
