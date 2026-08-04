"use strict";
class DocumentClass {
    data;
    value = {
        name: "Vaisakh",
        msg: "Greatest Actor of all time",
    };
    fromJSON(data) {
        this.data = JSON.parse(data);
        return this;
    }
    toJSON() {
        return JSON.stringify(this.data);
    }
    print() {
        console.log(this.value);
    }
    getDisplayName() {
        return this.value.name;
    }
    validate() {
        return Math.random() > 0.5 ? true : false;
    }
}
