//  Link a JS file to portfolio index.html. Use every selection method: getElementById,
// getElementsByClassName, getElementsByTagName, querySelector, querySelectorAll
// 317. Use DOM traversal to walk to parent, first child, last child, next sibling - log each
// 318. Build addCard(title, body, imageUrl) that creates a card element and appends it using
// createElement + textContent (never innerHTML for user data)
// 319. Build removeCard(id) and clearAllCards() 

const header = document.getElementById("main-header");
console.log(header)
header.style.backgroundColor = "#be1c1c";

const col = document.getElementsByClassName("column");
col[2].style.backgroundColor = "#918585";

const head = document.getElementsByTagName("h3");
head[1].style.color = "green";

const firstCard = document.querySelector('.column'); 
firstCard.style.backgroundColor = "#215bcf";

const allCard = document.querySelectorAll(".column");
console.log(allCard);
allCard[0].style.backgroundColor = "#340e66";

const target = document.getElementById("unli");
console.log(target)
const parentEl = target.parentElement;
console.log(parentEl)

const card = document.createElement('div');
card.className="card";

const chead = document.createElement('h2');
chead.textContent = "card-title";

const ccont = document.createElement('p');
ccont.textContent = "This is a card content"

card.appendChild(chead);
card.appendChild(ccont);

document.body.appendChild(card)
