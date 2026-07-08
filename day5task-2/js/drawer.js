const openBtn = document.getElementById('open-btn');
const drawer = document.getElementById('mobile-drawer');
const closeBtn = document.getElementById('close-btn');
const backdrop = document.getElementById('drawer-backdrop');


const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
let focusableElements = [];
let firstElement;
let lastElement;

function openDrawer() {
  drawer.classList.add('is-open');
  backdrop.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');

 
  focusableElements = Array.from(drawer.querySelectorAll(focusableElementsString));
  firstElement = focusableElements[0];
  lastElement = focusableElements[focusableElements.length - 1];

 
  setTimeout(() => {
    firstElement.focus();
  }, 100);

 
  document.addEventListener('keydown', handleKeydown);
  backdrop.addEventListener('click', closeDrawer);
}

function closeDrawer() {
  drawer.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');

 
  document.removeEventListener('keydown', handleKeydown);
  backdrop.removeEventListener('click', closeDrawer);

  openBtn.focus();
}

function handleKeydown(e) {
  const isTabPressed = e.key === 'Tab';
  const isEscapePressed = e.key === 'Escape';

  if (isEscapePressed) {
    closeDrawer();
  }

  if (isTabPressed) {
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else { 
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
}

openBtn.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);