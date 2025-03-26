const categories = [
    {
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1031&q=80",
      title: "Full Stack Development",
      description: "Learn to build web applications with both front-end and back-end technologies.",
      quote: "Master the MERN & MEAN stack!",
      tag: "Web Development",
      tagClass: "web-tag",
      link: "./fullstack.html",
      linkClass: "web-link"
    },
    {
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "DevOps",
      description: "Automate, deploy, and manage infrastructure efficiently.",
      quote: "CI/CD, Cloud, and Kubernetes!",
      tag: "Operations",
      tagClass: "devops-tag",
      link: "./devOps.html",
      linkClass: "devops-link"
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "Data Science",
      description: "Analyze data and build AI-driven solutions.",
      quote: "Machine Learning & AI!",
      tag: "Data",
      tagClass: "data-tag",
      link: "./dataScience.html",
      linkClass: "data-link"
    },
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "Data Analysis",
      description: "Interpret data to drive business decisions.",
      quote: "Turn data into insights!",
      tag: "Analytics",
      tagClass: "analytics-tag",
      link: "./dataAnalysis.html",
      linkClass: "analytics-link"
    }
  ];
  
  // DOM Elements
  const categoryCardsContainer = document.getElementById('categoryCards');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileSignupBtn = document.getElementById('mobileSignupBtn');
  const authModal = document.getElementById('authModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const authSwitchText = document.getElementById('authSwitchText');
  const authSwitchLink = document.getElementById('authSwitchLink');
  const currentYear = document.getElementById('currentYear');
  
  // Initialize current year in footer
  currentYear.textContent = new Date().getFullYear();
  
  // Render category cards
  function renderCategoryCards() {
    categoryCardsContainer.innerHTML = '';
    categories.forEach(category => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `
        <div class="category-image">
          <img src="${category.image}" alt="${category.title}">
        </div> 
        <div class="category-content">
          <span class="category-tag ${category.tagClass}">${category.tag}</span>
          <h3 class="category-title">${category.title}</h3>
          <p class="category-description">${category.description}</p>
          <p class="category-quote">${category.quote}</p>
          <a href="${category.link}" class="category-link ${category.linkClass}">
            Explore resources
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      `;
      categoryCardsContainer.appendChild(card);
    });
  }
  
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    // Update menu icon to X when menu is open
    const menuIconElement = mobileMenuToggle.querySelector('.menu-icon');
    if (mobileMenu.classList.contains('active')) {
      menuIconElement.style.background = 'transparent';
      menuIconElement.style.transition = 'background 0.3s';
      const before = menuIconElement.querySelector('::before');
      const after = menuIconElement.querySelector('::after');
      if (before) before.style.transform = 'rotate(45deg)';
      if (after) after.style.transform = 'rotate(-45deg)';
    } else {
      menuIconElement.style.background = '';
      const before = menuIconElement.querySelector('::before');
      const after = menuIconElement.querySelector('::after');
      if (before) before.style.transform = '';
      if (after) after.style.transform = '';
    }
  }
  
  // Open auth modal with specified type
  function openAuthModal(type) {
    authModal.classList.add('active');
    if (type === 'login') {
      setActiveTab('login');
    } else {
      setActiveTab('signup');
    }
  }
  
  // Close auth modal
  function closeAuthModal() {
    authModal.classList.remove('active');
  }
  
  // Set active tab in auth modal
  function setActiveTab(tabName) {
    if (tabName === 'login') {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      modalTitle.textContent = 'Log in to Learnify';
      modalDescription.textContent = 'Enter your credentials to access your account';
      authSwitchText.textContent = 'Don\'t have an account? ';
      authSwitchLink.textContent = 'Sign up';
    } else {
      loginTab.classList.remove('active');
      signupTab.classList.add('active');
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
      modalTitle.textContent = 'Create your account';
      modalDescription.textContent = 'Sign up for free to start learning';
      authSwitchText.textContent = 'Already have an account? ';
      authSwitchLink.textContent = 'Log in';
    }
  }
  
  // Handle login form submission
  function handleLoginSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Reset error messages
    document.getElementById('loginUsernameError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';
    
    // Validate fields
    let isValid = true;
    
    if (username.length < 3) {
      document.getElementById('loginUsernameError').textContent = 'Username must be at least 3 characters.';
      isValid = false;
    }
    
    if (password.length < 6) {
      document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters.';
      isValid = false;
    }
    
    if (isValid) {
      // In a real app, this would make an API call to /api/login
      console.log('Login attempt:', { username, password });
      alert(`Login successful! Welcome back, ${username}!`);
      closeAuthModal();
    }
  }
  
  // Handle signup form submission
  function handleSignupSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Reset error messages
    document.getElementById('signupUsernameError').textContent = '';
    document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters long';
    document.getElementById('termsError').textContent = '';
    
    // Validate fields
    let isValid = true;
    
    if (username.length < 3) {
      document.getElementById('signupUsernameError').textContent = 'Username must be at least 3 characters.';
      isValid = false;
    }
    
    if (password.length < 6) {
      document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters.';
      isValid = false;
    }
    
    if (!terms) {
      document.getElementById('termsError').textContent = 'You must accept the terms and conditions.';
      isValid = false;
    }
    
    if (isValid) {
      // In a real app, this would make an API call to /api/register
      console.log('Signup attempt:', { username, password });
      alert(`Account created! Welcome to Learnify, ${username}!`);
      closeAuthModal();
    }
  }
  
  // Switch between login and signup tabs
  function switchAuthTab() {
    if (loginTab.classList.contains('active')) {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    renderCategoryCards();
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Auth modal open buttons
    loginBtn.addEventListener('click', () => openAuthModal('login'));
    signupBtn.addEventListener('click', () => openAuthModal('signup'));
    mobileLoginBtn.addEventListener('click', () => openAuthModal('login'));
    mobileSignupBtn.addEventListener('click', () => openAuthModal('signup'));
    
    // Auth modal close
    modalClose.addEventListener('click', closeAuthModal);
    modalOverlay.addEventListener('click', closeAuthModal);
    
    // Auth modal tab switching
    loginTab.addEventListener('click', () => setActiveTab('login'));
    signupTab.addEventListener('click', () => setActiveTab('signup'));
    authSwitchLink.addEventListener('click', switchAuthTab);
    
    // Form submissions
    loginForm.addEventListener('submit', handleLoginSubmit);
    signupForm.addEventListener('submit', handleSignupSubmit);
    
    // Close modal when Escape key is pressed
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && authModal.classList.contains('active')) {
        closeAuthModal();
      }
    });
  });