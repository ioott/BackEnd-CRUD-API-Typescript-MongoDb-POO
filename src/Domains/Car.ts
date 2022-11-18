import ICar from '../Interfaces/ICar';

export default class Car {
  private id: string | undefined;
  private model: string;
  private year: number;
  private color: string;
  private status: boolean | undefined = false;
  private buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    this.id = car._id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public getId(): string | undefined {
    return this.id;
  }
  public setId(value: string | undefined) {
    this.id = value;
  }
  public getModel(): string {
    return this.model;
  }
  public setModel(value: string) {
    this.model = value;
  }
  public getYear(): number {
    return this.year;
  }
  public setYear(value: number) {
    this.year = value;
  }
  public getColor(): string {
    return this.color;
  }
  public setColor(value: string) {
    this.color = value;
  }
  public getStatus(): boolean | undefined {
    return this.status;
  }
  public setStatus(value: boolean | undefined) {
    this.status = value;
  }
  public getBuyValue(): number {
    return this.buyValue;
  }
  public setBuyValue(value: number) {
    this.buyValue = value;
  }
}
