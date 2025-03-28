// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
  
  if (mobileMenu.classList.contains('active')) {
    menuIcon.style.background = 'transparent';
    menuIcon.style.transform = 'rotate(180deg)';
    menuIcon.previousElementSibling?.style.transform = 'rotate(45deg) translate(6px, 6px)';
    menuIcon.nextElementSibling?.style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    menuIcon.style.background = '';
    menuIcon.style.transform = '';
    menuIcon.previousElementSibling?.style.transform = '';
    menuIcon.nextElementSibling?.style.transform = '';
  }
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function setActiveLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
      
      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Close mobile menu when clicking links
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    toggleMobileMenu();
  });
});

// Set current year in footer
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// Add animation to roadmap items on scroll
const roadmapItems = document.querySelectorAll('.roadmap-item');
const animateOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.8;
  
  roadmapItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    
    if (itemTop < triggerBottom) {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }
  });
};

// Initialize roadmap item styles
roadmapItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Feature cards hover effect
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  });
});