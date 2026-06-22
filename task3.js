function greet1(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

// const greet2 = function(name, greeting = 'Hello') {
//   return `${greeting}, ${name}!`;
// };
// const greet3 = (name, greeting = 'Hello') => `${greeting}, ${name}!`;



class calculator{
    constructor(initialValue = 0){
    this.result=initialValue;
}
add(value){
    this.result += value;
    return this;
}
sub(value){
    this.result -= value;
    return this;
}
  multiply(value) {
    this.result *= value;
    return this;
  }
  divide(value) {
    if (value === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    this.result /= value;
    return this;
  }

    getResult() {
    return this;
  }

    clear() {
    this.result = 0;
    return this;
  }

}
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
console.log(createMultiplier(3)(7) === 21);

const calc = new calculator(10);

const answer = calc.add(5)      
                   .multiply(2)  
                   .sub(4) 
                   .divide(2)    
                   .getResult();

console.log(answer);