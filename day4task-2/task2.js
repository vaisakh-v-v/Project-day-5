// Create five Promises using new Promise((resolve, reject) => { setTimeout(...) }) - mix resolves
// and rejects
// 398. Chain three dependent Promises: getUser → getOrders(userId) → getOrderDetail(orderId).
// Reject getOrders if userId is undefined.
// 399. Demonstrate Promise.all (three parallel calls, time ≈ slowest), Promise.allSettled (one resolves,
// one rejects - both returned), Promise.race

const promise = new Promise((resolve, reject) =>{
    setTimeout(() => resolve("resolve 1"),2000);
}).then((result) => console.log(result));

const promise2 = new Promise((resolve, reject) =>{
    setTimeout(() => reject(new Error("promise2 failed with an unexpected error")),2000);
}).catch((error) => console.log(error));


const promise3 = new Promise((resolve, reject) =>{
    setTimeout(() => resolve("resolve 3"));
})
.catch((error) => console.log(error))
.then((result) => {
    console.log(result);
});

const promise4 = new Promise((resolve, reject) =>{
    setTimeout(() => resolve("resolve 4"),3000);
})
.then((result) => console.log(result))
.catch((error) => console.log(error));

const promise5 = new Promise((resolve, reject) =>{
    setTimeout(() => reject(new Error("promise5 failed with an unexpected error")),2000);
})
    .then((result) => {
        console.log(result);
    })
    .catch((error) => console.log(error));

let userId = 10;
const getUser = new Promise((resolve, reject) =>{
    resolve(userId);
});
const getOrders = getUser.then((userId) => {
    return new Promise((resolve,reject) =>{
        if (userId === undefined) throw new Error("rejected");
        let orderId = userId + 100;
        resolve(orderId);
    });
});

const getOrderDetail = getOrders.catch((error) => console.log(error)).then((orderId) => {
    let orderDetail = "order id:" +orderId;
    console.log(orderDetail);
}) ;

const promise6 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(100),6000);
});

const promise7 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(200),5000);
});
const promise8 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(300),6000);
});

Promise.all([promise,promise6,promise7]).then((values) =>
    console.log(values),);

Promise.allSettled([promise, promise8]).then((result) =>{
result.forEach((result) =>{
    console.log(result.status);
});
});
Promise.race([promise6 ,promise7]).then((value) =>
    console.log("promise race",value),);