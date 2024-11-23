class Tesla {
  source() {
    throw new error('Method "source()" must be implemented');
  }
  manufacture() {
    console.log("manufacturing parts");
  }
  assemble() {
    console.log("assembling tesla");
  }
  ship() {
    console.log("shipping tesla");
  }
}

export class Model3 extends Tesla {
  source() {
    console.log("sourcing materials for model 3");
  }
}

export class ModelY extends Tesla {
  source() {
    console.log("sourcing materials for model y");
  }
}