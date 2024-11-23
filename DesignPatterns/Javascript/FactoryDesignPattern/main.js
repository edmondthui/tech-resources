import TeslaFactory from "./factory.js";

function makeTesla() {
  const teslaType = "model3";
  try {
    const tesla = TeslaFactory.createTesla(teslaType);
    tesla.source();
    tesla.manufacture();
    tesla.assemble();
    tesla.ship();
  } catch (error) {
    console.log(error.message);
  }
}

makeTesla();
