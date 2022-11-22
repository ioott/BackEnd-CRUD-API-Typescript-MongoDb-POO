import ICar from '../Interfaces/ICar';
import IValid from '../Interfaces/IValid';
import Vehicle from './Vehicle';

export default class Car extends Vehicle implements IValid {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(car);

    if (car.id && !this.isValid(car.id)) throw new Error('Invalid mongo id');

    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  isValid(value: string): boolean {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(value);
  }
}
