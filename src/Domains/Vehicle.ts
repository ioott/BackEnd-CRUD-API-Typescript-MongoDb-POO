import IVehicle from '../Interfaces/IVehicle';
import IValid from '../Interfaces/IValid';

export default abstract class Vehicle implements IValid {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor(vehicle: IVehicle) {
    if (vehicle._id && !this.isValid(vehicle._id)) throw new Error('Invalid mongo id');

    this.id = vehicle._id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status || false;
    this.buyValue = vehicle.buyValue;
  }

  isValid(value: string): boolean {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(value);
  }
}
