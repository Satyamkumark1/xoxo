// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = mobileMenuToggle.querySelector('i');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  if (mobileMenu.classList.contains('active')) {
    mobileMenuIcon.classList.remove('fa-bars');
    mobileMenuIcon.classList.add('fa-times');
  } else {
    mobileMenuIcon.classList.remove('fa-times');
    mobileMenuIcon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on links
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuIcon.classList.remove('fa-times');
    mobileMenuIcon.classList.add('fa-bars');
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