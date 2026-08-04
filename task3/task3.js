"use strict";
class Shape {
    describe() {
        console.log(`This is a ${this}`);
    }
    static create(type, ...args) {
        switch (type) {
            case "circle":
                return new circle(...args);
            case "rect":
                return new Rectangle(...args);
            case "triangle":
                return new Triangle(...args);
        }
    }
}
class circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * Math.pow(this.radius, 2);
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}
class Rectangle extends Shape {
    l;
    b;
    constructor(l, b) {
        super();
        this.l = l;
        this.b = b;
    }
    area() {
        return this.l * this.b;
    }
    perimeter() {
        return 2 * (this.l + this.b);
    }
}
class Triangle extends Shape {
    b;
    h;
    constructor(b, h) {
        super();
        this.b = b;
        this.h = h;
    }
    area() {
        return (this.b * this.h) / 2;
    }
    perimeter() {
        return (this.b * (2 * Math.sqrt(this.h * this.h + ((this.b / 2) * this.b) / 2)));
    }
}
const Circle = Shape.create("circle", 12);
console.log(Circle instanceof circle);
