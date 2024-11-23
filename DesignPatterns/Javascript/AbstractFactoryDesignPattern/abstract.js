// Abstract product
class Car {
  drive() {
    throw new error("driving car");
  }
}

class Plane {
  fly() {
    throw new error("flying plane");
  }
}

class ElectricCar extends Car {
  drive() {
    console.log("driving electric car");
  }
}

class ElectricPlane extends Plane {
  fly() {
    console.log("flying electric plane");
  }
}

class ClassicCar extends Car {
  drive() {
    console.log("driving classic car");
  }
}

class ClassicPlane extends Plane {
  fly() {
    console.log("flying classic plane");
  }
}

// Abstract factory
class VehicleFactory {
  createCar() {
    throw new error("creating car");
  }
  createPlane() {
    throw new error("creating plane");
  }
}

export class ElectricVehicleFactory extends VehicleFactory {
  createCar() {
    return new ElectricCar();
  }
  createPlane() {
    return new ElectricPlane();
  }
}

export class ClassicVehicleFactory extends VehicleFactory {
  createCar() {
    return new ClassicCar();
  }
  createPlane() {
    return new ClassicPlane();
  }
}
