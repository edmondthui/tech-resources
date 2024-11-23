class Tesla {
  constructor(builder) {
    this.battery = builder.battery;
    this.wheel = builder.wheel;
    this.paintColor = builder.paintColor;
    this.interiorColor = builder.interiorColor;
  }
}

export default class TeslaBuilder {
  constructor(battery, wheel) {
    this.battery = battery;
    this.wheel = wheel;
  }

  // Methods with chaining
  choosePaintColor(paintColor) {
    this.paintColor = paintColor;
    return this;
  }

  chooseInteriorColor(interiorColor) {
    this.interiorColor = interiorColor;
    return this;
  }

  build() {
    return new Tesla(this); // Pass the builder methods to the tesla
  }
}
