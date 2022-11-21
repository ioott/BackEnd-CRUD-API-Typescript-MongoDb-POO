import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

const CAR_NOT_FOUND = 'Car not found';
const INVALID_MONGO_ID = 'Invalid mongo id';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const allCars = await this.service.findAll();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const allCars = await this.service.findById(id);
      return this.res.status(200).json(allCars);
    } catch (error) {
      if ((error as Error).message === CAR_NOT_FOUND) {
        this.res.status(404).json({ message: CAR_NOT_FOUND });
      }
      if ((error as Error).message === INVALID_MONGO_ID) {
        this.res.status(422).json({ message: INVALID_MONGO_ID });
      }
      this.next();
    }
  }

  public async updateById() {
    try {
      const { id } = this.req.params;
      const car: ICar = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        doorsQty: this.req.body.doorsQty,
        seatsQty: this.req.body.seatsQty,
      };
      const updatedCar = await this.service.updateById(id, car);
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      if ((error as Error).message === CAR_NOT_FOUND) {
        this.res.status(404).json({ message: CAR_NOT_FOUND });
      }
      if ((error as Error).message === INVALID_MONGO_ID) {
        this.res.status(422).json({ message: INVALID_MONGO_ID });
      }
      this.next();
    }
  }
}

// erros de console.log no server
