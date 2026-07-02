const promise = new Promise(function(resolve,reject){
    setTimeout(() => resolve(3), 2000);
});
promise.then((result) => console.log(result));

const promise2 = new Promise(function(resolve,reject){
    resolve("first resolve");
    setTimeout(() => resolve("second resolve"),2000);
});
promise2.then((result) => console.log(result));

const promise3 = new Promise(function(resolve,reject){
    setTimeout(() => resolve("first resolve from third promise"), 2000);
    resolve("this should be the output: second resolve from promise 3")
})
promise3.then((result) => console.log(result));

const promise4 = new Promise(function(resolve,reject){
    setTimeout(() => reject(new Error("promise failed")),4000);
});
promise4.catch((error) => console.log("error on promise 4"));

const promise5 = new Promise(function(resolve,reject){
    setTimeout(() => reject(new Error("promise 5 failed")),4000);
    reject("error occured");
});
promise5.catch((error) => console.log(error));

const promise6 = new Promise(function(resolve,reject){
    resolve("resolve 6");
});
promise6.then((result) => console.log("this is promise 6"));

const promise7 = new Promise(function(resolve,reject){
    resolve("resolve 7");
});
promise7.then((result) => console.log(result));

queueMicrotask(() =>{
    console.log("this is after promise 7");
});

const promise8 = new Promise(function(resolve,reject){
    resolve("resolve 8");
});
promise8.then((result) => console.log(result));

queueMicrotask(() =>{
    console.log("this is before promise 9");
});

const promise9 = new Promise(function(resolve,reject){
    resolve("resolve 9");
});
promise8.then((result) => console.log(result));

const promise10 = new Promise(function(resolve,reject){
        setTimeout(() => console.log("inside timeout"),4000);
        resolve("promise10");
        queueMicrotask(() => console.log("inside queueMicrotask"));
    
}).then((result) => console.log(result));
