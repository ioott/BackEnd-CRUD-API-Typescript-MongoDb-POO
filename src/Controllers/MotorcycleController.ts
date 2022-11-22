import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';
const INVALID_MONGO_ID = 'Invalid mongo id';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const allMotorcycles = await this.service.findAll();
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const allMotorcycles = await this.service.findById(id);
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      if ((error as Error).message === MOTORCYCLE_NOT_FOUND) {
        this.res.status(404).json({ message: MOTORCYCLE_NOT_FOUND });
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
      const motorcycle: IMotorcycle = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        category: this.req.body.category,
        engineCapacity: this.req.body.engineCapacity,
      };
      const updatedMotorcycle = await this.service.updateById(id, motorcycle);
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      if ((error as Error).message === MOTORCYCLE_NOT_FOUND) {
        this.res.status(404).json({ message: MOTORCYCLE_NOT_FOUND });
      }
      if ((error as Error).message === INVALID_MONGO_ID) {
        this.res.status(422).json({ message: INVALID_MONGO_ID });
      }
      this.next();
    }
  }
}
