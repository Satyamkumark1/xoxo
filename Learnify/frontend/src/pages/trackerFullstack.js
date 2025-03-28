// DOM Elements
const coursesContainer = document.getElementById('courses-container');
const courseTemplate = document.getElementById('course-card-template');
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
  // Clone the template
  const courseCard = courseTemplate.content.cloneNode(true);
  
  // Set course title
  const courseTitle = courseCard.querySelector('.course-title');
  courseTitle.textContent = course.name;
  
  // Set progress value
  const progressValue = courseCard.querySelector('.progress-value');
  progressValue.textContent = `${course.progress}%`;
  
  // Add appropriate class based on completion
  const isComplete = course.progress === 100;
  if (isComplete) {
    progressValue.classList.add('complete');
  } else {
    progressValue.classList.add('incomplete');
  }
  
  // Set progress bar
  const progressBar = courseCard.querySelector('.progress-bar');
  progressBar.style.width = `${course.progress}%`;
  
  // Add appropriate class based on completion
  if (isComplete) {
    progressBar.classList.add('complete');
  } else {
    progressBar.classList.add('incomplete');
  }
  
  // Set input value to current progress
  const progressInput = courseCard.querySelector('.progress-input');
  progressInput.value = course.progress;
  
  // Add data attribute to identify the course
  const cardElement = courseCard.querySelector('.course-card');
  cardElement.dataset.courseId = course.id;
  
  // Add event listener to update button
  const updateButton = courseCard.querySelector('.update-button');
  updateButton.addEventListener('click', () => handleProgressUpdate(course.id));
  
  return courseCard;
}

// Handle progress update
function handleProgressUpdate(courseId) {
  // Find the course card
  const courseCard = document.querySelector(`.course-card[data-course-id="${courseId}"]`);
  const progressInput = courseCard.querySelector('.progress-input');
  
  // Get and validate the input value
  let percentage = parseInt(progressInput.value);
  
  if (isNaN(percentage)) {
    percentage = 0;
  } else if (percentage < 0) {
    percentage = 0;
  } else if (percentage > 100) {
    percentage = 100;
  }
  
  // Update the input value with the validated percentage
  progressInput.value = percentage;
  
  // Update local courses immediately for better UX
  courses = courses.map(course => 
    course.id === courseId ? { ...course, progress: percentage } : course
  );
  
  // Update local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  
  // Update UI
  const progressValue = courseCard.querySelector('.progress-value');
  progressValue.textContent = `${percentage}%`;
  
  const progressBar = courseCard.querySelector('.progress-bar');
  progressBar.style.width = `${percentage}%`;
  
  // Update classes based on completion status
  const isComplete = percentage === 100;
  
  if (isComplete) {
    progressValue.classList.add('complete');
    progressValue.classList.remove('incomplete');
    progressBar.classList.add('complete');
    progressBar.classList.remove('incomplete');
  } else {
    progressValue.classList.add('incomplete');
    progressValue.classList.remove('complete');
    progressBar.classList.add('incomplete');
    progressBar.classList.remove('complete');
  }
  
  // Send update to server
  updateProgressOnServer(courseId, percentage)
    .then(() => {
      showToast('Progress Updated', `Your progress has been successfully updated to ${percentage}%`, 'success');
    })
    .catch(error => {
      console.error('Error updating progress:', error);
      showToast('Update Failed', 'Failed to update your progress on the server, but changes are saved locally.', 'error');
    });
}

// Update progress on the server
async function updateProgressOnServer(courseId, percentage) {
  const response = await fetch('/api/progress/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ courseId, percentage })
  });
  
  if (!response.ok) {
    throw new Error('Failed to update progress');
  }
  
  return await response.json();
}

// Show toast notification
function showToast(title, message, type = 'success') {
  // Set toast content
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  // Set toast type
  toast.className = 'toast';
  toast.classList.add(type);
  
  // Show toast
  toast.classList.remove('hidden');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);