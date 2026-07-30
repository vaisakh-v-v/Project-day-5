"use strict";
async function updateUser(id, changes) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
    });
    return res.json();
}
function createRequiredUser(data) {
    return data;
}
const config = {
    key1: "Hi this is vaisakh from palakkad",
    key2: "213",
    key3: "12312",
    key4: "randomstrin3"
};
const user = {
    name: "Vaiskah",
    avatar: "Spiderman no way home",
};
