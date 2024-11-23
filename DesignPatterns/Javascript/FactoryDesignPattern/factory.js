import { Model3, ModelY } from "./tesla.js";

export default class TeslaFactory {
  static createTesla(teslaType) {
    switch (teslaType) {
      case "model3":
        return new Model3();
      case "modely":
        return new ModelY();
      default:
        throw new Error("Invalid tesla type");
    }
  }
}
