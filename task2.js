const x = 20;
function fun(){
    console.log(this.x);
}


fun.x = 40;

fun();

let nameObj = {
    name:"Vaisakh"
}

let PrintName = {
    name: "steve",
    sayHi: function () {
        console.log(this.name); 
    }
}

PrintName.sayHi();
let hifun2 = PrintName.sayHi.bind(nameObj);
hifun2();

let nameObj = {
    name:"Vaisakh"
}

let PrintName = {
    name: "steve",
    sayHi: function () {
        console.log(this.name); 
    }
}


let nameObj2 = {
    name:"Vaisakh"
}

let PrintName2 = {
    name: "steve",
    sayHi: function (age) {
        console.log(this.name + "age is " + age); 
    }
}

PrintName2.sayHi.call(nameObj2,37);

let nameObj3 = {
    name:"Vaisakh"
}

let PrintName3 = {
    name: "steve",
    sayHi: function (age) {
        console.log(this.name + "age is " + age); 
    }
}

PrintName3.sayHi.app(nameObj2,[ 2026]);

class Test2 {
  x = 20;
  print() {
    console.log(this.x);
  }
}
let test2 = new Test2();
let print2 = test2.print.bind(test2);
print2();
class Test3 {
  x = 20;
  constructor() {
    this.print = () => console.log(this.x);
  }
}
let test3 = new Test3();
let print3 = test3.print;
print3();

class Test4 {
  x = 20;
  print = () => {
    console.log(this.x);
  };
}
let test4 = new Test4();
let print4 = test4.print;
print4();

function bindAll(object1) {
  let methods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(object1),
  ).filter(function (p) {
    return typeof object1[p] === "function";
  });
  methods.forEach((method) => {
    if (method !== "constructor") {
      object1[method] = object1[method].bind(object1);
    }
  });
}
bindAll(test);
let print10 = test.print;
print10();

class Test5 {
  x = 30;
  print = () => {
    setTimeout(function () {
      console.log(this.x);
    }, 3000);
  };
}
let test5 = new Test5();
test5.print();
class Test6 {
  x = 30;
  print = () => {
    setTimeout(() => {
      console.log(this.x);
    }, 3000);
  };
}
let test6 = new Test6();
test6.print();