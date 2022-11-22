import ICar from '../Interfaces/ICar';
import IValid from '../Interfaces/IValid';
import Vehicle from './Vehicle';

export default class Car extends Vehicle implements IValid {
  private _doorsQty: number;
  private _seatsQty: number;

  constructor(car: ICar) {
    super({ ...car });
    if (car._id && !this.isValid(car._id)) throw new Error('Invalid mongo id');

    this._doorsQty = car.doorsQty;
    this._seatsQty = car.seatsQty;
  }

  public get doorsQty(): number {
    return this._doorsQty;
  }
  public get seatsQty(): number {
    return this._doorsQty;
  }

  isValid(value: string): boolean {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(value);
  }
}
