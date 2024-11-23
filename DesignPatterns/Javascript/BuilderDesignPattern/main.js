import TeslaBuilder from "./teslaBuilder.js";

const myTesla = new TeslaBuilder("400 Mile", "All Season")
  .choosePaintColor("Black")
  .chooseInteriorColor("Red")
  .build(); // Finally build the Tesla

console.log(myTesla);
