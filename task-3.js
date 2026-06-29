// Write impure updateUser(users, id, changes) that mutates the array. Write the pure version.
// Verify the original is unchanged.
// 371. Build a five-step pipeline: parseCSV, validateRows, transformRows, filterInvalid, formatOutput -
// each a pure function with no side effects
// 372. Write deepFreeze(obj) that recursively freezes all nested objects
const fs = require("fs");
const { type } = require("os");
function impureUpdateUsers(users,id,changes){
    users.splice(id, 1, changes);
}
users = ["hi", "this", "is", "vaisakh"];
impureUpdateUsers(users, 0, "hello");
console.log(users);

function pureUpdateUsers(users,id,changes){
    let arr = users.slice(0,users.length);
    console.log(arr);
    arr.splice(id,1,changes);
    return arr;
}
let arr = pureUpdateUsers(users, 1, "that");
console.log(arr);
console.log(users);

function parseCSV(data){
    let csv = [];
    let datalines = data.split(/\r?\n/);
    let csvHeadings = datalines[0].split(/,/);
    for(let i=1; i<datalines.length; i++){
        let dataValues = datalines[i].split(/,/); 
        let obj = {};
        for(let j = 0; j<csvHeadings.length; j++){
            obj[csvHeadings[j] = dataValues[j]];
        }
        csv.push(obj);
    }
    return csv;
}

function validateRows(parsedCsv) {
  csv = structuredClone(parsedCsv);
  csv.forEach((obj) => {
    if (obj["Age"] <= 0) {
      obj["valid"] = false;
    } else obj["valid"] = true;
  });
  return csv;
}

function transformRows(validatedCsv) {
  csv = structuredClone(validatedCsv);
  csv.forEach((obj) => {
    if (typeof obj["Age"] !== "Number") {
      obj["Age"] = Number(obj["Age"]);
    }
  });
  return csv;
}

function filterInvalid(transformedCsv) {
  csv = structuredClone(transformedCsv);
  for (let i = 0; i < csv.length; i++) {
    if (!csv[i]["valid"]) {
      csv.splice(i, 1);
    }
  }
  return csv;
}

function formatOutput(filteredCsv) {
  csv = structuredClone(filteredCsv);
  csv.forEach((obj) => {
    delete obj.valid;
  });
  return csv;
}

fs.readFile("csv.txt", (err, data) => {
  if (err) throw err;
  let csv = data.toString();
  console.log("before five-step pipeline");
  console.log(csv);
  //stored to seperate variables to show they are pure functions
  let parsedCsv = parseCSV(csv);
  let validatedCsv = validateRows(parsedCsv);
  let transformedCsv = transformRows(validatedCsv);
  let filteredCsv = filterInvalid(transformedCsv);
  let formatedOutput = formatOutput(filteredCsv);
  console.log("formated output:");
  console.log(formatedOutput);
});
