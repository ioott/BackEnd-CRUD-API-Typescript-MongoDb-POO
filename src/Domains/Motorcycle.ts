import IMotorcycle from '../Interfaces/IMotorcycle';
import IValid from '../Interfaces/IValid';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle implements IValid {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);

    if (motorcycle._id && !this.isValid(motorcycle._id)) throw new Error('Invalid mongo id');

    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  isValid(value: string): boolean {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(value);
  }
}
