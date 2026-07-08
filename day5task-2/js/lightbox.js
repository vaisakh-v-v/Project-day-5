const overlay = document.getElementById("image-overlay");
const images = document.querySelectorAll(".gallary-img");
function moveToPrev(){
    let imagenow = overlay.querySelector("img");
    for (let i = 0; i < images.length; i++) {
     if (images[i].src === imagenow.src) {
       let index = (((i - 1) % images.length) + images.length) % images.length;
       imagenow.src = images[index].src;
       break;
     }
     expandedImg.src = imagenow.src 
     overlay.style.display = 'flex';
   }
 }

const expandedImg = document.getElementById("expanded-img");
function moveToNext() {
   let imagenow = overlay.querySelector("img");
   for (let i = 0; i < images.length; i++) {
     if (images[i].src === imagenow.src) {
       let index = (((i + 1) % images.length) + images.length) % images.length;
       imagenow.src = images[index].src;
       break;
     }
     expandedImg.src = imagenow.src 
     overlay.style.display = 'flex';
   }
 }
const closeBtn = document.querySelector(".close-btn");
 images.forEach(img => {
  img.addEventListener('click', () => {
    expandedImg.src = img.src; 
    overlay.style.display = 'flex'; 
  });
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  
});

document.addEventListener("keydown", (event) => {
   if (event.key ===
  "Escape") {
     overlay.style.display = "none";
   }
   if (event.key === "ArrowLeft") {
     moveToPrev();
   }
   if (event.key === "ArrowRight") {
     moveToNext();
   }
 });

 const prevButton = document.querySelector(".left-btn")
  const nextButton = document.querySelector(".right")
 prevButton.addEventListener("click", (event) => {
   moveToPrev();
 });

 nextButton.addEventListener("click", (event) => {
   moveToNext();
 });