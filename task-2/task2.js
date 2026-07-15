const EventEmitter1 = require("events");
const emitter = new EventEmitter1();

emitter.addListener("welcomeEvent", (name) => {
  console.log("welcome " + name);
});
emitter.emit("welcomeEvent", "vaisakh v");

const person1 = (msg) => {
  console.log("Message from person1: " + msg);
};

const person2 = (msg) => {
  console.log("Message from person2: " + msg);
};

emitter.addListener("printEvent", person1);
emitter.addListener("printEvent", person2);

emitter.emit("printEvent", "Event occurred");

emitter.removeAllListeners("printEvent");

emitter.emit("printEvent", "Event occurred");

emitter.on("data", (data) => {
  console.log("listener 1 recevied:", data);
});
emitter.on("*", () => {
  console.log("always trigered");
});

emitter.emit("*");

emitter.emit("data", "Sample data");

emitter.once("connect", () => {
  console.log("Connected");
});
emitter.emit("connect");
emitter.emit("connect");

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove,
    );
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    const listeners = this.events[event].slice();
    listeners.forEach((listener) => {
      listener(...args);
    });
    return true;
  }
}

const emiter = new EventEmitter();
const greet = (name, age) => console.log(`hello ${name}, age ${age}`);
emiter.on("greet", greet);
emiter.emit("greet", "vaisakh", 21);

emiter.off("greet", greet);
emiter.emit("greet", "vaisakh", 21);
