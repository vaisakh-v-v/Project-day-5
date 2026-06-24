const gp = document.getElementById("gp");
const p = document.getElementById("p");
const c = document.getElementById("c");

gp.addEventListener("click", (e) => {
    console.log("grand parent");
},{capture:false}
);
p.addEventListener("click", (e) => {
    console.log(" parent");
},{capture:false}
);
c.addEventListener("click", (e) => {
    console.log("CHILD");
},{capture:false}
);


const gp2 = document.getElementById("gp2");
const p2 = document.getElementById("p2");
const c2 = document.getElementById("c2");

gp2.addEventListener("click", (e) => {
    console.log("grand parent");
},{capture:true}
);
p2.addEventListener("click", (e) => {
    console.log(" parent");
},{capture:true}
);
c2.addEventListener("click", (e) => {
    console.log("child");
},{capture:true}
);


const gp3 = document.getElementById("gp3");
const p3 = document.getElementById("p3");
const c3 = document.getElementById("c3");

gp3.addEventListener("click", (e) => {
    console.log("grand parent");
    
},{capture:true}
);
p3.addEventListener("click", (e) => {
    console.log(" parent");
    e.stopPropagation();
},{capture:true}
);
c3.addEventListener("click", (e) => {
    console.log("child");
},{capture:true}
);

const gp4 = document.getElementById("gp4");
const p4 = document.getElementById("p4");
const c4 = document.getElementById("c4");

gp4.addEventListener("click", (e) => {
    console.log("grand parent");
    
},{capture:true}
);
p4.addEventListener("click", (e) => {
    console.log(" parent");
    e.stopImmediatePropagation();
},{capture:true}
);
c4.addEventListener("click", (e) => {
    console.log("child");
},{capture:true}
);

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("this is prevented");
}
);