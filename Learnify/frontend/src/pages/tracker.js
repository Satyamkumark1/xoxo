import config from '../config.js';

// API endpoints
const API_BASE_URL = config.API_URL;

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
    if (serverCourses && serverCourses.length > 0) {
      courses = serverCourses;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } else {
      throw new Error('No courses received from server');
    }
  } catch (error) {
    console.warn('Falling back to local storage:', error);
    
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
  try {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched courses:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
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
  
  card.querySelector('.course-title').textContent = course.name;
  
  const progressValue = card.querySelector('.progress-value');
  const progressBar = card.querySelector('.progress-bar');
  const progressInput = card.querySelector('.progress-input');
  const updateButton = card.querySelector('.update-button');
  
  // Set initial values
  progressValue.textContent = `${course.progress}%`;
  progressBar.style.width = `${course.progress}%`;
  progressInput.value = course.progress;
  
  updateButton.addEventListener('click', async () => {
    const newProgress = parseInt(progressInput.value);
    
    if (isNaN(newProgress) || newProgress < 0 || newProgress > 100) {
      showToast('Error', 'Please enter a valid percentage between 0 and 100', true);
      return;
    }
    
    try {
      const updatedProgress = await updateCourseProgress(course.id, newProgress);
      
      // Update the UI
      progressValue.textContent = `${updatedProgress.percentage}%`;
      progressBar.style.width = `${updatedProgress.percentage}%`;
      
      // Update local storage
      const updatedCourses = courses.map(c => 
        c.id === course.id ? {...c, progress: updatedProgress.percentage} : c
      );
      courses = updatedCourses;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
      
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

// Update the progress update function
async function updateCourseProgress(courseId, newProgress) {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseId: courseId,
        percentage: newProgress
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Progress updated:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);