// Convert the three-chained Promise exercise to async/await. Compare side by side.
// 405. Write loadDashboard(userId) that fetches user, posts, and todos in parallel (Promise.all), then
// fetches the first post's comments. Handle errors at each step.
// 406. Demonstrate the sequential vs parallel bug: time both approaches
// 407. Show the forEach async bug - it doesn't await. Fix with for...of and with
// Promise.all(arr.map(async fn)).
let id = 10;

function getUsers(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(id);
        },2000);
    });
}


async function getOrders() {
    let userId = await getUsers();
    return new Promise((resolve, reject) => {
        if(userId === undefined) reject(new Error("Error:user id is not defined"));
        else resolve(userId);
    });
}
async function getOrderDetail(){
    try{
        let orderId = await getOrders();
        console.log("orderId:", orderId);
    }catch(error){
        console.log(error);
    }
}
getOrderDetail();

async function fetchUser() {
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
            if (id === undefined) reject(new Error("rejected from user"));
            else resolve(id);
        },2000);
    });
}
let posts = [
    {id:101, heading:"random", comments:["this", "is", "vaisakh"],},
    {id:102 , heading:"FIFA", comment:["Messi", "Messi", "Messi"]},
];

async function fetchPosts() {
    return new Promise((resolve, reject) =>{
        setTimeout(() => resolve(posts),3000);
    });
}
let todo = ["task5", "task6", "task7", "task8"];

async function fetchTodo(){
    return todo;
}
async function loadDashboard(){
    try{
        console.time("parallel");
        let result = await Promise.all([fetchUser(), fetchPosts(),fetchTodo()]);
        console.timeEnd("parallel");
        return result[1][0].comments;
    }catch(error){
        return "error:"+ error;
    }
}
loadDashboard().then((result) => console.log(result));
async function sequentialLoadDashboard() {
    try{
        console.time("sequential");
        const user = await fetchUser();
        const posts = await fetchPosts();
        const todo = await fetchTodo();
        console.timeEnd("sequential");

        return posts[0].comments;
    }catch(error){
        return "this is an error:" + error;
    }
}
sequentialLoadDashboard().then((result) => console.log(result));
let names = [" Messi", " Demeria", " Martiniz"];

async function greet(name) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => resolve("hello" + name),3000);
    });
}

names.forEach(async(name) => {
    const greeting = await greet(name);
    console.log(greeting);
});
console.log("greeting finished");
 async function  greetCaller() {
    for (let name of names){
        const greeting = await greet(name);
        console.log(greeting);
    }
    console.log("greeting finished");
 }
 greetCaller();

 async function greetCaller2() {
    let promiseAll = await Promise.all(
        names.map(async (name) => {
            const greeting = await greet(name);
            console.log("greet2" + greeting);
        }),
    );
    console.log("greeting 3 finished");
 }
 greetCaller2();