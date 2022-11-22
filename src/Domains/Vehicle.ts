import IVehicle from '../Interfaces/IVehicle';
import IValid from '../Interfaces/IValid';

export default abstract class Vehicle implements IValid {
  private id: string | undefined;
  private _model: string;
  private _year: number;
  private _color: string;
  private _status: boolean;
  private _buyValue: number;

  constructor(vehicle: IVehicle) {
    if (vehicle._id && !this.isValid(vehicle._id)) throw new Error('Invalid mongo id');

    this.id = vehicle._id;
    this._model = vehicle.model;
    this._year = vehicle.year;
    this._color = vehicle.color;
    this._status = vehicle.status || false;
    this._buyValue = vehicle.buyValue;
  }

  get _id(): string | undefined {
    return this.id;
  }
  get model(): string {
    return this._model;
  }
  get year(): number {
    return this._year;
  }
  get color(): string {
    return this._color;
  }
  get status(): boolean {
    return this._status;
  }
  get buyValue(): number {
    return this._buyValue;
  }

  isValid(value: string): boolean {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(value);
  }
}
