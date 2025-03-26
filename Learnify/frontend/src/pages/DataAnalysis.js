// Resources data
const resources = [
    {
      id: 1,
      category: "Excel & Spreadsheets",
      level: "Beginner",
      title: "Excel Skills for Business",
      provider: "Coursera",
      description: "Learn the fundamentals of Microsoft Excel and gain the skills necessary to use spreadsheets for business tasks.",
      duration: "20 hours",
      url: "https://www.coursera.org/specializations/excel"
    },
    {
      id: 2,
      category: "SQL & Databases",
      level: "Beginner",
      title: "SQL for Data Analysis",
      provider: "Udacity",
      description: "Learn to use SQL to extract and analyze data stored in databases. Practice your skills with real-world datasets.",
      duration: "15 hours",
      url: "https://www.udacity.com/course/sql-for-data-analysis--ud198"
    },
    {
      id: 3,
      category: "Python Programming",
      level: "Beginner",
      title: "Introduction to Python",
      provider: "Kaggle",
      description: "A free course that teaches Python specifically for data analysis. Includes hands-on exercises and real datasets.",
      duration: "10 hours",
      url: "https://www.kaggle.com/learn/python"
    },
    {
      id: 4,
      category: "Data Visualization",
      level: "Intermediate",
      title: "Data Visualization with Tableau",
      provider: "Tableau Public",
      description: "Learn how to create powerful visualizations and dashboards with Tableau's free platform.",
      duration: "8 hours",
      url: "https://public.tableau.com/en-us/s/resources"
    },
    {
      id: 5,
      category: "Statistics",
      level: "Beginner",
      title: "Statistics with R",
      provider: "edX",
      description: "Master statistics fundamentals with applications in R programming. Perfect for aspiring data analysts.",
      duration: "25 hours",
      url: "https://www.edx.org/course/statistics-with-r"
    },
    {
      id: 6,
      category: "Python Programming",
      level: "Intermediate",
      title: "Pandas for Data Analysis",
      provider: "Real Python",
      description: "Comprehensive tutorial on using the Pandas library for data manipulation and analysis in Python.",
      duration: "12 hours",
      url: "https://realpython.com/pandas-python-explore-dataset/"
    },
    {
      id: 7,
      category: "SQL & Databases",
      level: "Intermediate",
      title: "Advanced SQL for Data Analysis",
      provider: "Mode Analytics",
      description: "Free SQL tutorial covering advanced topics like window functions, CTEs, and optimization techniques.",
      duration: "18 hours",
      url: "https://mode.com/sql-tutorial/"
    },
    {
      id: 8,
      category: "Data Visualization",
      level: "Beginner",
      title: "Data Visualization with Python",
      provider: "FreeCodeCamp",
      description: "Learn to create insightful visualizations using popular Python libraries like Matplotlib and Seaborn.",
      duration: "15 hours",
      url: "https://www.freecodecamp.org/news/python-data-visualization-tutorial/"
    },
    {
      id: 9,
      category: "Career Development",
      level: "Beginner",
      title: "Data Analytics Portfolio Guide",
      provider: "Towards Data Science",
      description: "Step-by-step guide to building an impressive data analytics portfolio that will help you land your first job.",
      duration: "5 hours",
      url: "https://towardsdatascience.com/data-analytics-portfolio-c0b9b00b8614"
    },
    {
      id: 10,
      category: "Excel & Spreadsheets",
      level: "Intermediate",
      title: "Excel Power Query & Power Pivot",
      provider: "Microsoft Learn",
      description: "Master advanced Excel tools for data cleaning, transformation, and modeling with these free tutorials.",
      duration: "22 hours",
      url: "https://learn.microsoft.com/en-us/training/modules/get-transform-data-power-query/"
    },
    {
      id: 11,
      category: "Statistics",
      level: "Advanced",
      title: "Statistical Inference",
      provider: "Khan Academy",
      description: "In-depth course on statistical inference, hypothesis testing, and confidence intervals with practical examples.",
      duration: "30 hours",
      url: "https://www.khanacademy.org/math/statistics-probability"
    },
    {
      id: 12,
      category: "Career Development",
      level: "Intermediate",
      title: "Data Analytics Interview Preparation",
      provider: "DataLemur",
      description: "Free resource with real interview questions from top companies to help you prepare for data analyst interviews.",
      duration: "10 hours",
      url: "https://datalemur.com/blog/data-analyst-interview-questions"
    }
  ];
  
  // DOM elements
  const resourcesGrid = document.getElementById('resources-grid');
  const categoryFilter = document.getElementById('category-filter');
  const levelFilter = document.getElementById('level-filter');
  const newsletterForm = document.getElementById('newsletter-form');
  const successMessage = document.getElementById('success-message');
  
  // Load resources and set up event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Display all resources initially
    renderResources(resources);
    
    // Set up filter event listeners
    categoryFilter.addEventListener('change', filterResources);
    levelFilter.addEventListener('change', filterResources);
    
    // Set up newsletter form submission
    newsletterForm.addEventListener('submit', handleFormSubmit);
  });
  
  // Render resources to the grid
  function renderResources(resourcesList) {
    // Clear the current resources
    resourcesGrid.innerHTML = '';
    
    if (resourcesList.length === 0) {
      resourcesGrid.innerHTML = `
        <div class="no-resources">
          <p>No resources match your filters. Try different criteria.</p>
        </div>
      `;
      return;
    }
    
    // Loop through resources and create cards
    resourcesList.forEach(resource => {
      const card = document.createElement('div');
      card.className = 'resource-card';
      
      // Determine level class for styling
      let levelClass = '';
      switch(resource.level) {
        case 'Beginner':
          levelClass = 'beginner';
          break;
        case 'Intermediate':
          levelClass = 'intermediate';
          break;
        case 'Advanced':
          levelClass = 'advanced';
          break;
      }
      
      card.innerHTML = `
        <div class="resource-header">
          <span class="resource-category">${resource.category}</span>
          <span class="resource-level ${levelClass}">${resource.level}</span>
          <h3 class="resource-title">${resource.title}</h3>
          <p class="resource-provider">${resource.provider}</p>
        </div>
        <div class="resource-body">
          <p class="resource-description">${resource.description}</p>
          <div class="resource-meta">
            <span class="resource-duration">
              <i class='bx bx-time'></i> ${resource.duration}
            </span>
          </div>
        </div>
        <div class="resource-link">
          <a href="${resource.url}" target="_blank">
            View Resource <i class='bx bx-right-arrow-alt'></i>
          </a>
        </div>
      `;
      
      resourcesGrid.appendChild(card);
    });
  }
  
  // Filter resources based on selected category and level
  function filterResources() {
    const selectedCategory = categoryFilter.value;
    const selectedLevel = levelFilter.value;
    
    let filteredResources = [...resources];
    
    // Apply category filter if not "all"
    if (selectedCategory !== 'all') {
      filteredResources = filteredResources.filter(resource => 
        resource.category === selectedCategory
      );
    }
    
    // Apply level filter if not "all"
    if (selectedLevel !== 'all') {
      filteredResources = filteredResources.filter(resource => 
        resource.level === selectedLevel
      );
    }
    
    // Render the filtered resources
    renderResources(filteredResources);
  }
  
  // Handle newsletter form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get email input
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    
    // Simple validation
    if (!email || !validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // In a real application, you would send this to a server
    // For this simple version, we'll just show the success message
    newsletterForm.style.display = 'none';
    successMessage.style.display = 'flex';
    
    // Clear the form
    emailInput.value = '';
  }
  
  // Email validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });