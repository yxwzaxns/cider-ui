l = {
  list: [],
  cur: -1,
  push: function(c){
    this.cur += 1;
    this.list.push(c)
  },
  next: function(){
    let c = this.list[this.cur + 1]
    if (c == undefined ) {
      return ""
    }else{
      this.cur += 1
      return c;
    }
  },
  last: function(){
    // exclude cur = -1
    if (this.cur <= 0) {
      return ""
    }
    // common condition
    this.cur -= 1;

    return this.list[this.cur];
  }
}

l.push("ls")
l.push("show")
l.push("auth")


console.log(l)

console.log("--------")

console.log(l.last())
console.log(l.last())
console.log(l.last())


l.push("fuck")

console.log("--------")

console.log(l.next())
console.log(l.next())
