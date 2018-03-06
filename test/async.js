function dosometing(time) {
  return new Promise((resolve, reject) => {
    // do some aysnc work
    setTimeout(()=>{}, time * 1000);

    if (time < 5) {
      reject("no")
    }else{
      resolve("ok")
    }
  });
}

// async function asyncPrint(value, ms) {
//   await timeout(ms);
//   console.log(value)
// }

// timeout(5000).then((t)=>{console.log(t)})
dosometing(3).then((res)=>{console.log(res)},(err)=>{console.log(err)})
// asyncPrint('hello world', 50);
