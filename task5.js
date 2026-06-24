// Given 20 employee objects (name, dept, salary, yearsExp), chain methods to: filter Engineering
// with salary > 70000, map to {name, salary}, sort by salary descending - all in one expression
// 313. Destructure a nested config object into flat variables in a single destructuring statement
// 314. Merge two objects with spread. Show Object.entries(), keys(), values() on the result.
// 315. Write deepClone(obj) that clones a flat object without JSON.parse/stringify
const employee = [
    {
        name : "employe1",
        dep : "CS",
        sal : 170000,
        exp : 2 
    },
    {
        name : "employe2",
        dep : "EC",
        sal : 160000,
        exp : 2 
    },
    {
        name : "employe3",
        dep : "MECH",
        sal : 130000,
        exp : 2 
    },
    {
        name : "employe4",
        dep : "BIO",
        sal : 134000,
        exp : 2 
    },
    {
        name : "employe5",
        dep : "MATH",
        sal : 123000,
        exp : 2 
    },
    {
        name : "employe6",
        dep : "CIVIL",
        sal : 165000,
        exp : 2 
    },
    {
        name : "employe7",
        dep : "CSE",
        sal : 192000,
        exp : 2 
    },
    {
        name : "employe8",
        dep : "EEE",
        sal : 123000,
        exp : 2 
    },
    {
        name : "employe9",
        dep : "IC",
        sal : 100000,
        exp : 2 
    },
    {
        name : "employe10",
        dep : "CS",
        sal : 75000,
        exp : 2 
    },
    {
        name : "employe11",
        dep : "CS",
        sal : 123000,
        exp : 2 
    },
    {
        name : "employe12",
        dep : "CS",
        sal : 156000,
        exp : 2 
    },
    {
        name : "employe13",
        dep : "CS",
        sal : 16000,
        exp : 2 
    },
    {
        name : "employe14",
        dep : "CS",
        sal : 16000,
        exp : 2 
    },
    {
        name : "employe15",
        dep : "CS",
        sal : 16050,
        exp : 2 
    },
   
    {
        name : "employe16",
        dep : "CS",
        sal : 145000,
        exp : 3
    },
    {
        name : "employe17",
        dep : "CS",
        sal : 156700,
        exp : 2 
    },
    {
        name : "employe18",
        dep : "CS",
        sal : 143000,
        exp : 2 
    },
    {
        name : "employe19",
        dep : "CS",
        sal : 160760,
        exp : 6
    },
     {
        name : "employe20",
        dep : "CS",
        sal : 160000,
        exp : 2 
    }
    
]

const result = employee
.filter(emp => emp.dep == "CS" && emp.sal > 70000)
.map(emp=>({name:emp.name, salary : emp.sal}))
.sort((a,b) => b.sal - a.sal);

console.log(result);    

const user = {
    name: "abc",
    age : 32,
    education :{
        degree: "masters"
    }
};
const {education:{degree}} = user;
console.log(degree);

function deepClone(obj) {

  if (obj === null || typeof obj !== 'object') return obj;
  
  return { ...obj };
}
console.log(deepClone(user))