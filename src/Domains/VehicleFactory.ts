import IValid from '../Interfaces/IValid';
import IVehicle from '../Interfaces/IVehicle';
import Car from './Car';

class VehicleFactory {
  public static create(vehicle: IVehicle): IVehicle & IValid {
    if (vehicle.doorsQty) {
      return new Car(vehicle);
    }
    throw new Error('Invalid vehicle!');
  }
}

export default VehicleFactory;
