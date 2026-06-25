const toggles = document.querySelectorAll('.tab-panel');

toggles.forEach(button => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    toggles.forEach(otherButton => {
      otherButton.setAttribute('aria-expanded', 'false');
    });
  });
});