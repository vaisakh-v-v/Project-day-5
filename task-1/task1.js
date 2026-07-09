function fn1(num){
    return 2*num;
}
function addOne(num){
    return num+1;
}

function pipe(...fns){
    return (args) => fns.reduce((prev, fn) => fn(prev),args);
}

const result = pipe(fn1,addOne)(5);
console.log(result);

result2 = addOne(fn1(5));
console.log(result2);


function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}


function sum(a,b,c){
    return a + b + c;
}
let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1) (2,3));
console.log(curriedSum(1) (2) (3));

function multiply(a , b){
    return a*b;
}

function partialMultiply(a){
    return function(b){
        return multiply(a,b);
    };
}
const double = partialMultiply(2);
console.log(double(2));
console.log(double(3));
console.log(double(4));
console.log(double(5));

