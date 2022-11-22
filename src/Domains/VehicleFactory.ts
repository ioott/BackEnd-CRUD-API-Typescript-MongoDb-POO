import IValid from '../Interfaces/IValid';
import IVehicle from '../Interfaces/IVehicle';
import ICar from '../Interfaces/ICar';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Car from './Car';
import Motorcycle from './Motorcycle';

class VehicleFactory {
  public static create(vehicle: IVehicle, type: string): (Car | Motorcycle) & IValid {
    if (type === 'car') {
      return new Car(vehicle as ICar);
    }

    if (type === 'motorcycle') {
      return new Motorcycle(vehicle as IMotorcycle);
    }

    throw new Error('Invalid vehicle!');
  }
}

export default VehicleFactory;
