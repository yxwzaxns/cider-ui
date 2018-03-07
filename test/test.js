// import {Mya} from "./proxyr.js"
let Mya = require("./proxyr.js")

// console.log(mya);
Mya.bind("name",()=>{console.log(Mya.name)})

console.log("var be set")

Mya.name = "aong"
// p.test()

// mya.test()

setTimeout(()=>{
  Mya.name = 2333
}, 1000)
