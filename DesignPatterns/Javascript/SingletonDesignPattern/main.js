// Importing
import Singleton from "./singleton.js";

const Singleton1 = new Singleton();
const Singleton2 = new Singleton();

Singleton1.increment();

console.log(Singleton1.getData());
console.log(Singleton2.getData());

console.log(Singleton1 === Singleton2); // True
