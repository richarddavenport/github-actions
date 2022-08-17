// Node.js program to demonstrate the
// process.argv Property

// Include process module
import { argv } from "process";

// Printing process.argv property value
console.log("number of arguments is " + argv.length);

argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
