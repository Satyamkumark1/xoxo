// API endpoints
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const coursesContainer = document.getElementById('courses-container');
const courseCardTemplate = document.getElementById('course-card-template');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastMessage = document.getElementById('toast-message');

// Local Storage Key
const STORAGE_KEY = 'learnify-courses';

// Course Data
let courses = [];

// Initialize the application
async function initApp() {
  try {
    // Try to fetch courses from the server
    const serverCourses = await fetchCourses();
    courses = serverCourses;
    
    // Save courses to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error('Error fetching courses from server:', error);
    
    // Fall back to local storage if available
    const storedCourses = localStorage.getItem(STORAGE_KEY);
    if (storedCourses) {
      courses = JSON.parse(storedCourses);
    } else {
      // Default courses if nothing is available
      courses = getDefaultCourses();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    }
  }
  
  // Render course cards
  renderCourses();
}

// Fetch courses from the server
async function fetchCourses() {
  const response = await fetch('/api/courses');
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return await response.json();
}

// Default courses as a fallback
function getDefaultCourses() {
  return [
    { id: 1, name: 'Web Development Fundamentals', progress: 0 },
    { id: 2, name: 'JavaScript Advanced Concepts', progress: 0 },
    { id: 3, name: 'React Framework Mastery', progress: 0 },
    { id: 4, name: 'Backend Development with Node.js', progress: 0 }
  ];
}

// Render course cards in the UI
function renderCourses() {
  // Clear existing content
  coursesContainer.innerHTML = '';
  
  // Create and append course cards
  courses.forEach(course => {
    const courseCard = createCourseCard(course);
    coursesContainer.appendChild(courseCard);
  });
}

// Create a single course card
function createCourseCard(course) {
  const card = courseCardTemplate.content.cloneNode(true);
  
  // Set course title
  card.querySelector('.course-title').textContent = course.name;
  
  // Set progress value and bar
  const progressValue = card.querySelector('.progress-value');
  const progressBar = card.querySelector('.progress-bar');
  progressValue.textContent = `${course.progress}%`;
  progressBar.style.width = `${course.progress}%`;
  
  // Handle progress update
  const progressInput = card.querySelector('.progress-input');
  const updateButton = card.querySelector('.update-button');
  
  updateButton.addEventListener('click', async () => {
    const newProgress = parseInt(progressInput.value);
    
    if (isNaN(newProgress) || newProgress < 0 || newProgress > 100) {
      showToast('Error', 'Please enter a valid percentage between 0 and 100', true);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/progress/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId: course.id,
          percentage: newProgress
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
      
      const updatedProgress = await response.json();
      progressValue.textContent = `${updatedProgress.percentage}%`;
      progressBar.style.width = `${updatedProgress.percentage}%`;
      showToast('Success', 'Progress updated successfully');
    } catch (error) {
      showToast('Error', 'Failed to update progress', true);
    }
  });
  
  return card;
}

// Show toast notification
function showToast(title, message, isError = false) {
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.className = `toast ${isError ? 'error' : 'success'}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);