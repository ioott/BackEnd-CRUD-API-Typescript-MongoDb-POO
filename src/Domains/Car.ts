import ICar from '../Interfaces/ICar';
import IValid from '../Interfaces/IValid';

export default class Car implements IValid {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined = false;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    if (car._id && !this.isValid(car._id)) throw new Error('Invalid mongo id');
    this.id = car._id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  isValid(value: string): boolean {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(value);
  }
}
