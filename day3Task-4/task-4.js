// Given orders (each with an items array), use flatMap to get all items with their parent order id
// 374. Use findLast and findLastIndex on a log array to find the most recent error entry
// 375. Build chunk(arr, size), zip(...arrays) that interleaves arrays, and groupBy(arr, keyFn) without
// Object.groupBy
// 376. Use Array.from({ length: 12 }, (_, i) => ...) to generate a monthly calendar array

orders = [{
    orderId:10,
    items: [23, 32, 54, 67]

},
{
    orderId:10,
    items: [23, 32, 54, 63, 43, 34]
},
];

let parentId = 10;
let allItems = orders.flatMap((obj) => {
  if (obj.orderId === parentId) return obj.items;
});
console.log(allItems);

let log = [
    {
        logid:10,
        entry:'pass'
    },
    {
        logid:11,
        entry:"fail"
    },
    {
        logid:12,
        entry:"pass"
    },
     {
        logid:13,
        entry:"fail"
    },
];

const lastFail = log.findLast((obj) => {
    if(obj.entry === "fail")return obj;
});
console.log(lastFail);

const lastFailIndex = log.findLastIndex((obj) => {
    if(obj.entry === "fail")return obj;
});
console.log(lastFailIndex);
console.log(log[lastFailIndex]);


function chunkedArray(arr,size){
    arrchnk = []
    for(let i = 0; i<arr.length; i=i+size){
        let index = i + size;
        arrchnk.push(arr.slice(i,index));
    }
    return arrchnk;
}

let arr = [2, 3, 5, 6, 7, 23 ,25 , 34];
let chnk = chunkedArray(arr,2);
console.log(chnk);
 
function zip(...arrays){
    console.log(arrays);
    const maxlength = Math.max(...arrays.map((a) => a.length));
    let ziparray = Array.from({length:maxlength},(_, i) => arrays.map((a) => a[i]));
    return ziparray; 
}
console.log(zip(["s", "p", "i", "d", "e", "r", "m", "a", "n"], [3, 1, 0, 7, 2, 0, 2, 6]));
const inventory = [
  { name: "carrot", type: "vegetables", quantity: 9 },
  { name: "apple", type: "fruit", quantity: 5 },
  { name: "chicken", type: "meat", quantity: 23 },
  { name: "lichy", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

function groupBy(arr, keyfun) {
  const newGroup = {};
  arr.forEach((element) => {
    const key = keyfun(element);
    if (!newGroup[key]) newGroup[key] = [];
    newGroup[key].push(element);
  });
  return newGroup;
}


function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function selection(obj) {
  if (obj.quantity < 6) return "restock";
  else return "sufficient";
}
console.log(groupBy(inventory, selection));
const monthCalendar = Array.from({ length: 12 }, (_, i) => {
  let month = new Date(0, i).toLocaleDateString("en", { month: "long" });
  let daysIn = daysInMonth(0, i);
  let days = Array.from({ length: daysIn }, (_, i) => i + 1);
  let obj = {};
  obj[month] = days;
  return obj;
});
console.log(monthCalendar);