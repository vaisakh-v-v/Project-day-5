// Build Cart with addItem, removeItem, updateQuantity, applyCoupon, getTotal - every method
// returns a NEW Cart, never mutates current one
// 383. Implement observer: addObserver(fn) registers a listener, notifyObservers() calls all after each
// change
// 384. Render cart to the DOM. Subscribe a render function - it re-renders on every state change.
// 385. Persist to localStorage. Restore on page load. Add undo() with a history stack.

class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(fn) {
    this.observers.push(fn);
  }
  notifyObservers(data) {
    this.observers.forEach((observer) => {
      observer(data);
    });
  }
}
const cartElement = document.querySelector(".cart");
const listener = new Subject();

function render(items) {
  const existingCartItems = document.querySelectorAll(".cart div");
  for (let existingCartItem of existingCartItems) {
    existingCartItem.remove();
  }
  console.log(items);
  if (items[0] === undefined) return;
  for (let item of items) {
    const cartItem = document.createElement("div");
    cartItem.textContent = `id:${item["id"]} quantity:${item.quantity} price:${item.price}`;
    cartElement.appendChild(cardItem);
    localStorage.setItem("cart", JSON.stringify(items));
  }
}

class Stack {
  arr = [];
  push(value) {
    this.arr.push(value);
  }
  display() {
    for (let item of this.arr) {
      console.log(item);
    }
  }
}

class Cart {
  constructor(stack, ...items) {
    this.items = items.flat(1);
    stack.push(this.items);
    this.stack = stack;
    listener.notifyObservers(this.items);
  }
  addItem(item) {
    let newCart = structuredClone(this.items);
    newCart.push(item);
    console.log("newcart", newCart);
    return new Cart(this.stack, newCart);
  }

  removeItem(itemId) {
    let newCart = structuredClone(this.item);
    return new Cart(
      this.stack,
      newCart.filter((item) => item.id != itemId),
    );
  }
  updateQuantity(itemId, quantity) {
    let newCart = structuredClone(this.items);
    for (let item of newCart) {
      if (item.id === itemId) {
        item.quantity = quantity;
        break;
      }
    }
    return new Cart(this.stack, newCart);
  }

  getTotal() {
    let total = 0;
    for (let item of this.items) {
      total = total + item.price * item.quantity;
    }
    return total;
  }

  applyCoupon(coupon) {
    let total = this.getTotal();
    let newValue = total - (total * coupon) / 100;
    return newValue;
  }

  undo() {
    let stackArray = this.stack["arr"];
    stackArray.pop();
    let previousState = stateArray.pop();
    return new cart(this.stack, previousState);
  }
}
listener.addObserver(render);
const newStack = new Stack();
let cart;
if (localStorage.getItem("cart") !== null) {
  cart = new Cart(newStack, JSON.parse(localStorage.getItem("cart")));
} else cart = new Cart(newStack);
