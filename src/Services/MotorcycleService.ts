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

  //   public async findAll() {
  //     const carODM = new CarODM();
  //     const allCars = await carODM.findAll();
  //     return allCars.map((car: ICar) => this.createCarDomain(car));
  //   }

  //   public async findById(id: string) {
  //     const regex = /^[a-f\d]{24}$/i;
  //     const isValid = regex.test(id);
  //     if (!isValid) throw new Error('Invalid mongo id');

  //     const carODM = new CarODM();
  //     const carById = await carODM.findById(id);
  //     if (!carById) throw new Error('Car not found');

  //     return this.createCarDomain(carById);
  //   }

  //   public async updateById(id: string, car: ICar) {
  //     const regex = /^[a-f\d]{24}$/i;
  //     const isValid = regex.test(id);
  //     if (!isValid) throw new Error('Invalid mongo id');

  //     const carODM = new CarODM();
  //     const carById = await carODM.updateById(id, car);
  //     if (!carById) throw new Error('Car not found');

//     return this.createCarDomain(carById);
//   }
}
