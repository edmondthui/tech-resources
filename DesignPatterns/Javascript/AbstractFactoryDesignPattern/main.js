import { ClassicVehicleFactory, ElectricVehicleFactory } from "./abstract.js";

function createVehicle(factory) {
  const car = factory.createCar();
  const plane = factory.createPlane();

  car.drive();
  plane.fly();
}

// Use the Electric Vehicle Factory
const electricFactory = new ElectricVehicleFactory();
createVehicle(electricFactory);

// Use the Classic Vehicle Factory
const classicFactory = new ClassicVehicleFactory();
createVehicle(classicFactory);
