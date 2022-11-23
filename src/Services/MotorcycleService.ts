import Motorcycle from '../Domains/Motorcycle';
import VehicleFactory from '../Domains/VehicleFactory';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle as IMotorcycle);
    const manufacturedVehicle = VehicleFactory.create(newMotorcycle, 'motorcycle');
    return manufacturedVehicle;
  }

  public async findAll() {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.findAll();
    return allMotorcycles.map((motorcycle: IMotorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async findById(id: string) {
    const regex = /^[a-f\d]{24}$/i;
    const isValid = regex.test(id);
    if (!isValid) throw new Error('Invalid mongo id');

    const motorcycleODM = new MotorcycleODM();
    const motorcycleById = await motorcycleODM.findById(id);
    if (!motorcycleById) throw new Error('Motorcycle not found');

    return this.createMotorcycleDomain(motorcycleById);
  }

  public async updateById(id: string, motorcycle: IMotorcycle) {
    const regex = /^[a-f\d]{24}$/i;
    const isValid = regex.test(id);
    if (!isValid) throw new Error('Invalid mongo id');

    const motorcycleODM = new MotorcycleODM();
    const motorcycleById = await motorcycleODM.updateById(id, motorcycle);
    if (!motorcycleById) throw new Error('Motorcycle not found');

    return this.createMotorcycleDomain(motorcycleById);
  }

  public async delete(id: string) {
    const regex = /^[a-f\d]{24}$/i;
    const isValid = regex.test(id);
    if (!isValid) throw new Error('Invalid mongo id');

    const motorcycleODM = new MotorcycleODM();
    const motorcycleById = await motorcycleODM.delete(id);
    if (!motorcycleById) throw new Error('Motorcycle not found');
    return true;
  }
}
