import joi from "joi";

export class CarValidation {
  static carBrand = joi.string().min(2).max(12).trim();
  static carPrice = joi.number().min(0).max(1000000);
  static carYear = joi.number().min(1990).max(new Date().getFullYear());

  static create = joi.object({
    brand: this.carBrand.required(),
    price: this.carPrice.required(),
    year: this.carYear.required(),
  });
  static update = joi.object({
    brand: this.carBrand,
    price: this.carPrice,
    year: this.carYear,
  });
}
