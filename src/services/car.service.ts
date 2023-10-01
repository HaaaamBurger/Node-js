import { ICar } from "../interfaces/car.interface";
import { Car } from "../models/car.model";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await Car.find();
  }
  public async getById(id: string) {
    return await Car.findById(id);
  }
  public async createCar(car: ICar): Promise<void> {
    await Car.create(car);
  }
  public async deleteCar(id: string) {
    await Car.deleteOne({ _id: id });
  }
  public async putCar(id: string, car: Partial<ICar>) {
    await Car.findByIdAndUpdate(id, car);
  }
}

export const carService = new CarService();
