
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


const nav = document.querySelector('nav ul');
const navToggle = document.createElement('div');
navToggle.innerHTML = '&#9776;';
navToggle.style.fontSize = '2em';
navToggle.style.cursor = 'pointer';
navToggle.style.color = '#fff';
navToggle.style.display = 'none';
document.querySelector('nav').appendChild(navToggle);

navToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav.classList.remove('show');
    navToggle.style.display = 'none';
  } else {
    navToggle.style.display = 'block';
  }
});
 function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
  }

