import Car from '../Domains/Car';
import VehicleFactory from '../Domains/VehicleFactory';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car as ICar);
    const manufacturedVehicle = VehicleFactory.create(newCar, 'car');
    return manufacturedVehicle;
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

  public async delete(id: string) {
    const regex = /^[a-f\d]{24}$/i;
    const isValid = regex.test(id);
    if (!isValid) throw new Error('Invalid mongo id');

    const carODM = new CarODM();
    const carById = await carODM.delete(id);
    if (!carById) throw new Error('Car not found');
  }
}
