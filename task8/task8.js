"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function log(target, propertyKey, descriptor) {
    const orginalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Method Name - ${propertyKey}`);
        console.log(`Arguements - ${JSON.stringify(args)}`);
        const returnValue = orginalMethod(...args);
        console.log(`Return Value - ${returnValue}`);
        return returnValue;
    };
    return descriptor;
}
let User = class User {
    type = "report";
    title;
    constructor(t) {
        this.title = t;
    }
    getTitle() {
        return this.title;
    }
    getReturnWithParams(param) {
        return `Some Value`;
    }
};
__decorate([
    log
], User.prototype, "getReturnWithParams", null);
User = __decorate([
    sealed
], User);
const user = new User("some title");
user.getReturnWithParams("some params");
