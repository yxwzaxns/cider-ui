x = {
  aInternal: 10,
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
}

x.registerListener(function(val) {
  console.log("Someone changed the value of x.a to " + val);
});

// x.a = 43;

console.log(x)
// mya.register("name",(v)=>{console.log(v)})


// setTimeout(()=>{
//   x.a = 2333
// }, 5000)
