// var handler = {
//     get: function(target, name) {
//         if (name in target.vlist) {
//           return target.vlist[name]
//         }else{
//           return Reflect.get(target, name)
//         }
//     },
//     set: function(target,name,value) {
//       if (name != null && name in target.vlist) {
//         target.vlist[name] = value;
//         target.flist[name]();
//       }else{
//         target.vlist[name] = value;
//       }
//     }
// };

let _mya = {
  handler : {
      construct: function(key,handler){
        // this.key = null;
        Reflect.set(this, key, null);
        this.flist[key] = handler;
      },
      get: function(target, name) {
          if (name in target.vlist) {
            return target.vlist[name]
          }else{
            return Reflect.get(target, name)
          }
      },
      set: function(target,name,value) {
        if (name != null && name in target.vlist) {
          target.vlist[name] = value;
          target.flist[name]();
        }else{
          target.vlist[name] = value;
        }
        return true
      }
  },
  vlist: {},
  flist: {},
  bind : function(key,handler){
    // this.key = null;
    Reflect.set(this, key, null);
    this.flist[key] = handler;
  },
  test: function(){console.log("ssss")}
}

let Nya = new Proxy(_mya, _mya.handler);
export { Nya }

// module.exports = Mya;
