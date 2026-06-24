// Create ValidationError extending Error with statusCode, message, and field name
// 342. Write parseUserInput(input) that throws TypeError, RangeError, or ValidationError for specific
// failures
// 343. Catch each error type separately with different handling
// 344. Add window.onerror and window.addEventListener('unhandledrejection') that display errors in a
// visible overlay on the page
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = ValidationError;
  }
}
class TypeError extends Error {
  constructor(message) {
    super(message);
    this.name = TypeError;
  }
}
class RangeError extends Error {
  constructor(message) {
    super(message);
    this.name = RangeError;
  }
}
function parseUserInput(input) {
  const { age, name } = input;
  if (typeof input !== "object" || input === null) {
    throw new TypeError("Invalid input: expeted an object");
  }

  if (typeof name !== "string") {
    throw new ValidationError("Invalid input: name must be a string");
  }
  if (typeof age !== "number" || age < 1 || age > 125) {
    throw new RangeError(
      "Invalid input: age must be a number between 1 and 125",
    );
  }
  return { message: "Input parsed successfully", user: { name, age } };
}

try {
  const userInput = {name:"a" , age: 23};
  console.log(parseUserInput(userInput));
} catch (error) {
  if (error instanceof TypeError)
    console.error("TypeError Caught:", error.message);
  else if (error instanceof RangeError)
    console.error("RangeError Caught:", error.message);
  else if (error instanceof ValidationError)
    console.error("ValidationError Caught:", error.message);
}

const a = document.getElementById("notthere");
const b = document.getElementById("unhandled");

setTimeout(function() {
    random();
} ,0);
window.onerror = (...e) =>{
    a.innerHTML= (e);
};


Promise.reject(new Error("fail"));
window.addEventListener("unhandledrejection", (event) => {
    b.innerHTML = event.reason;
})
