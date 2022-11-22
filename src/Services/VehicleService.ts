import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import VehicleFactory from '../Domains/VehicleFactory';

export default class VehicleService {
  private createVehicleDomain(vehicle: ICar | IMotorcycle | null): Car | Motorcycle | null {
    if (vehicle) {
      return new Vehicle(vehicle);
    }
    return null;
  }

  public async create(car: ICar) {
    const vehicle = VehicleFactory.create(car);
    const carODM = new CarODM();
    const newCar = await carODM.create(vehicle);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const carODM = new CarODM();
    const allCars = await carODM.findAll();
    return allCars.map((car: ICar) => this.createCarDomain(car));
  }

  public async findById(id: string) {
    const regex = /^[a-f\d]{24}$/i;
    const isValid = regex.test(id);
    if (!isValid) throw new Error('Invalid mongo id');

    const carODM = new CarODM();
    const carById = await carODM.findById(id);
    if (!carById) throw new Error('Car not found');

    return this.createCarDomain(carById);
  }

  public async updateById(id: string, car: ICar) {
    const regex = /^[a-f\d]{24}$/i;
    const isValid = regex.test(id);
    if (!isValid) throw new Error('Invalid mongo id');

    const carODM = new CarODM();
    const carById = await carODM.updateById(id, car);
    if (!carById) throw new Error('Car not found');

    return this.createCarDomain(carById);
  }
}
