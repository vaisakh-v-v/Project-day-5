"use strict";
function identity(arg) {
    return arg;
}
console.log(typeof identity(4));
function first(arr) {
    return arr[0];
}
async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
function getProperty(obj, key) {
    return obj[key];
}
const student = {
    name: "Vaisakh",
    class: "12th",
    rollNo: "61",
};
console.log(getProperty(student, "name"));
class Queue {
    container = [];
    enqueue(item) {
        this.container.push(item);
    }
    dequeue() {
        return this.container.shift();
    }
    peek() {
        return this.container[0];
    }
    isEmpty() {
        return this.container.length === 0;
    }
}
