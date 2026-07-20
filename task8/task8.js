const element = document.getElementById("element");

function animateCounter(element, start, end, duration){
    let startTime = null;
    const easeOutQuad = (t) => t * (2-t);
    function step(timestamp){
        if(!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration,1);
        const easedProgress = easeOutQuad(progress);
        const currentVaue = Math.floor(start + easedProgress * (end - start))
        element.textContent = currentVaue.toLocaleString();
        if(progress < 1){
            requestAnimationFrame(step);
            }
    }
    requestAnimationFrame(step)
}

animateCounter(element, 0, 50000,50000);

const progressBar = document.getElementById('progressBar');
const uploadBtn = document.getElementById('uploadBtn');

function simulateUpload() {
  let progress = 0;
  
  function step() {

    setTimeout(() => {
      progress += Math.floor(Math.random() * 5) + 1;
      
      if (progress >= 100) {
        progress = 100;
        progressBar.style.transform = `scaleX(${progress / 100})`;
        progressBar.style.backgroundColor = '#303d47'; 
        console.log('Upload Complete!');
        uploadBtn.disabled = false;
        return; 
      }
      
      requestAnimationFrame(() => {
        progressBar.style.transform = `scaleX(${progress / 100})`;
      });
      
      step();
    }, 100); 
  }

  progressBar.style.backgroundColor = '#09730c';
  uploadBtn.disabled = true;
  step();
}

uploadBtn.addEventListener('click', simulateUpload);
