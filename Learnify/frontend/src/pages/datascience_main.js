document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Render roadmap content
    renderRoadmapContent();
    
    // Initialize resource filtering
    initResourceFiltering();
    
    // Initialize progress tracking
    initProgressTracking();
    
    // Set copyright year
    document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} Data Science Complete Roadmap. All resources linked belong to their respective owners.`;
  });
  
  // Mobile menu toggle
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }
  
  // Render roadmap content
  function renderRoadmapContent() {
    // Render beginner steps
    const beginnerContent = document.getElementById('beginner-content');
    renderSteps(beginnerContent, beginnerSteps);
    
    // Render intermediate steps
    const intermediateContent = document.getElementById('intermediate-content');
    renderSteps(intermediateContent, intermediateSteps);
    
    // Render advanced steps
    const advancedContent = document.getElementById('advanced-content');
    renderSteps(advancedContent, advancedSteps);
  }
  
  // Render steps for a roadmap section
  function renderSteps(container, steps) {
    steps.forEach((step, index) => {
      const isLastStep = index === steps.length - 1;
      const stepElement = document.createElement('div');
      stepElement.className = `relative pl-8 ${isLastStep ? '' : 'pb-10'}`;
      
      // Create timeline dot and connector
      const timelineHTML = `
        <div class="absolute left-0 top-0">
          <div class="bg-primary rounded-full w-5 h-5 border-4 border-white shadow"></div>
          ${isLastStep ? '' : '<div class="timeline-connector"></div>'}
        </div>
      `;
      
      // Create skills list HTML
      const skillsListHTML = step.skills.map(skill => `<li>${skill}</li>`).join('');
      
      // Create resources HTML
      const resourcesHTML = step.resources.map(resource => {
        let badgeColorClass = '';
        
        switch (resource.type.toLowerCase()) {
          case 'course':
            badgeColorClass = 'bg-blue-100 text-blue-700';
            break;
          case 'book':
            badgeColorClass = 'bg-green-100 text-green-700';
            break;
          case 'video':
            badgeColorClass = 'bg-red-100 text-red-700';
            break;
          case 'tutorial':
            badgeColorClass = 'bg-purple-100 text-purple-700';
            break;
          case 'dataset':
            badgeColorClass = 'bg-indigo-100 text-indigo-700';
            break;
          case 'notebook':
            badgeColorClass = 'bg-yellow-100 text-yellow-700';
            break;
          case 'practice':
            badgeColorClass = 'bg-red-100 text-red-700';
            break;
          case 'github':
            badgeColorClass = 'bg-indigo-100 text-indigo-700';
            break;
          case 'tool':
            badgeColorClass = 'bg-yellow-100 text-yellow-700';
            break;
          case 'platform':
            badgeColorClass = 'bg-indigo-100 text-indigo-700';
            break;
          default:
            badgeColorClass = 'bg-gray-100 text-gray-700';
        }
        
        return `
          <a 
            href="${resource.url}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-start p-3 bg-white rounded border border-gray-200 hover:border-secondary transition group"
          >
            <span class="inline-block rounded text-xs font-medium px-2 py-1 mr-2 ${badgeColorClass}">
              ${resource.type}
            </span>
            <div>
              <h5 class="font-medium group-hover:text-secondary transition">${resource.title}</h5>
              <p class="text-sm text-gray-500">${resource.description}</p>
            </div>
          </a>
        `;
      }).join('');
      
      // Create step HTML
      stepElement.innerHTML = `
        ${timelineHTML}
        <div class="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 class="text-xl font-semibold text-primary mb-3">
            <i class="${step.icon} mr-2"></i>
            ${step.title}
          </h3>
          <p class="text-gray-600 mb-4">${step.description}</p>
          
          <h4 class="font-medium mb-2">${step.skillsTitle || "Key Skills to Learn"}:</h4>
          <ul class="list-disc pl-5 text-gray-600 mb-5">
            ${skillsListHTML}
          </ul>
          
          <h4 class="font-medium mb-2">Free Resources:</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${resourcesHTML}
          </div>
        </div>
      `;
      
      container.appendChild(stepElement);
    });
  }
  
  // Initialize resource filtering
  function initResourceFiltering() {
    // Get DOM elements
    const resourcesContainer = document.getElementById('resources-container');
    const filterButtons = document.querySelectorAll('.resource-filter');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadedMessage = document.getElementById('resources-loaded-message');
    
    // Display variables
    let currentFilter = 'all';
    let visibleCount = 6;
    
    // Filter resources and update display
    function filterAndDisplayResources() {
      // Filter resources based on current filter
      const filteredResources = currentFilter === 'all' 
        ? resources 
        : resources.filter(resource => resource.category.toLowerCase() === currentFilter.toLowerCase());
      
      // Get resources to display
      const visibleResources = filteredResources.slice(0, visibleCount);
      
      // Clear container
      resourcesContainer.innerHTML = '';
      
      // Create and append resource cards
      visibleResources.forEach(resource => {
        const categoryColorClass = getCategoryColorClass(resource.category);
        const categoryIconClass = getCategoryIconClass(resource.category);
        const categoryGradientClass = getCategoryGradientClass(resource.category);
        
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100';
        resourceCard.setAttribute('data-category', resource.category.toLowerCase());
        
        resourceCard.innerHTML = `
          <div class="${categoryGradientClass} h-36 relative">
            <div class="absolute inset-0 flex items-center justify-center text-white">
              <i class="${categoryIconClass} text-5xl opacity-80"></i>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span class="inline-block text-xs font-medium px-2 py-1 ${categoryColorClass} text-white rounded">
                ${resource.category}
              </span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-lg mb-2">${resource.title}</h3>
            <p class="text-gray-600 text-sm mb-3">${resource.description}</p>
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <span class="mr-3"><i class="fas fa-graduation-cap mr-1"></i> ${resource.level}</span>
              <span><i class="${resource.category === 'Book' ? 'fas fa-book-open mr-1' : 'fas fa-clock mr-1'}"></i> ${resource.duration}</span>
            </div>
            <a 
              href="${resource.url}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-block bg-primary hover:bg-indigo-800 text-white text-sm font-medium py-2 px-4 rounded transition"
            >
              Access Resource
            </a>
          </div>
        `;
        
        resourcesContainer.appendChild(resourceCard);
      });
      
      // Update load more button visibility
      if (visibleCount >= filteredResources.length) {
        loadMoreBtn.parentElement.classList.add('hidden');
        if (filteredResources.length > 6) {
          loadedMessage.classList.remove('hidden');
        } else {
          loadedMessage.classList.add('hidden');
        }
      } else {
        loadMoreBtn.parentElement.classList.remove('hidden');
        loadedMessage.classList.add('hidden');
      }
    }
    
    // Load more resources
    loadMoreBtn.addEventListener('click', function() {
      visibleCount += 6;
      filterAndDisplayResources();
    });
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Update UI - remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove('bg-primary', 'text-white');
          btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-50');
        });
        
        // Add active class to clicked button
        this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-50');
        this.classList.add('bg-primary', 'text-white');
        
        // Update filter and reset visible count
        currentFilter = filterValue;
        visibleCount = 6;
        
        // Update displayed resources
        filterAndDisplayResources();
      });
    });
    
    // Initial display
    filterAndDisplayResources();
  }
  
  // Get category color class based on category
  function getCategoryColorClass(category) {
    switch (category.toLowerCase()) {
      case 'course': return 'bg-blue-500';
      case 'book': return 'bg-green-500';
      case 'tutorial': return 'bg-purple-500';
      case 'tool': return 'bg-yellow-500';
      default: return 'bg-indigo-500';
    }
  }
  
  // Get category icon class based on category
  function getCategoryIconClass(category) {
    switch (category.toLowerCase()) {
      case 'course': return 'fas fa-play-circle';
      case 'book': return 'fas fa-book';
      case 'tutorial': return 'fas fa-code';
      case 'tool': return 'fas fa-tools';
      default: return 'fas fa-file';
    }
  }
  
  // Get category gradient class based on category
  function getCategoryGradientClass(category) {
    switch (category.toLowerCase()) {
      case 'course': return 'bg-gradient-to-r from-indigo-500 to-indigo-600';
      case 'book': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'tutorial': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'tool': return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      default: return 'bg-gradient-to-r from-indigo-500 to-indigo-600';
    }
  }
  
  // Initialize progress tracking
  function initProgressTracking() {
    // Get DOM elements
    const beginnerProgress = document.getElementById('beginner-progress');
    const intermediateProgress = document.getElementById('intermediate-progress');
    const advancedProgress = document.getElementById('advanced-progress');
    
    // Load saved progress from localStorage
    let checkedItems = {};
    const savedProgress = localStorage.getItem('dsRoadmapProgress');
    if (savedProgress) {
      checkedItems = JSON.parse(savedProgress);
    }
    
    // Render progress checkboxes
    function renderProgressItems(container, level, items) {
      items.forEach(item => {
        const itemId = `${level}-${item}`;
        const isChecked = checkedItems[itemId] === true;
        
        const label = document.createElement('label');
        label.className = 'flex items-center';
        label.innerHTML = `
          <input 
            type="checkbox" 
            class="form-checkbox rounded text-indigo-500 h-5 w-5"
            data-item-id="${itemId}"
            ${isChecked ? 'checked' : ''}
          />
          <span class="ml-2">${item}</span>
        `;
        
        container.appendChild(label);
      });
    }
    
    // Render all progress sections
    renderProgressItems(beginnerProgress, 'beginner', progressItems.beginner);
    renderProgressItems(intermediateProgress, 'intermediate', progressItems.intermediate);
    renderProgressItems(advancedProgress, 'advanced', progressItems.advanced);
    
    // Add event listeners to checkboxes
    const allCheckboxes = document.querySelectorAll('.form-checkbox');
    allCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const itemId = this.getAttribute('data-item-id');
        checkedItems[itemId] = this.checked;
        
        // Save to localStorage
        localStorage.setItem('dsRoadmapProgress', JSON.stringify(checkedItems));
      });
    });
  }