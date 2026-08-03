"use strict";
const User = {
    id: "random id",
    name: "random name",
    createdAt: "today",
    avatar: "some url",
};
function getProperty(obj, key) {
    return obj[key];
}
console.log(getProperty(User, "id"));
