import IMotorcycle from '../Interfaces/IMotorcycle';
import IValid from '../Interfaces/IValid';

export default class Motorcycle implements IValid {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined = false;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    if (motorcycle._id && !this.isValid(motorcycle._id)) throw new Error('Invalid mongo id');
    this.id = motorcycle._id;
    this.model = motorcycle.model;
    this.year = motorcycle.year;
    this.color = motorcycle.color;
    this.status = motorcycle.status;
    this.buyValue = motorcycle.buyValue;
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  isValid(value: string): boolean {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(value);
  }
}
