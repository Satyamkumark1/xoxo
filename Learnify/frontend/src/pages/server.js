// Simple Express server to serve the API endpoints
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory storage
class Storage {
  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.progress = new Map();
    
    // Initialize with default courses
    this.initDefaultCourses();
  }
  
  initDefaultCourses() {
    const defaultCourses = [
      { id: 1, name: 'Web Development Fundamentals', defaultProgress: 0 },
      { id: 2, name: 'JavaScript Advanced Concepts', defaultProgress: 0 },
      { id: 3, name: 'React Framework Mastery', defaultProgress: 0 },
      { id: 4, name: 'Backend Development with Node.js', defaultProgress: 0 }
    ];
    
    defaultCourses.forEach(course => {
      const id = course.id;
      const newCourse = { id, name: course.name };
      this.courses.set(id, newCourse);
      
      // Initialize progress
      const newProgress = {
        id,
        courseId: id,
        percentage: course.defaultProgress || 0
      };
      this.progress.set(id, newProgress);
    });
  }
  
  getAllCourses() {
    return Array.from(this.courses.values());
  }
  
  getProgress(courseId) {
    return this.progress.get(courseId);
  }
  
  updateProgress(courseId, percentage) {
    const existingProgress = this.progress.get(courseId);
    
    if (!existingProgress) {
      const newProgress = {
        id: courseId,
        courseId,
        percentage
      };
      this.progress.set(courseId, newProgress);
      return newProgress;
    }
    
    const updatedProgress = {
      ...existingProgress,
      percentage
    };
    
    this.progress.set(courseId, updatedProgress);
    return updatedProgress;
  }
  
  getAllProgress() {
    return Array.from(this.progress.values());
  }
}

// Create storage instance
const storage = new Storage();

// API Endpoints

// Get all courses with progress
app.get('/api/courses', (req, res) => {
  try {
    const courses = storage.getAllCourses();
    const progress = storage.getAllProgress();
    
    // Combine courses with their progress
    const coursesWithProgress = courses.map(course => {
      const courseProgress = progress.find(p => p.courseId === course.id);
      return {
        id: course.id,
        name: course.name,
        progress: courseProgress ? courseProgress.percentage : 0
      };
    });
    
    res.json(coursesWithProgress);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Failed to get courses' });
  }
});

// Update progress
app.post('/api/progress/update', (req, res) => {
  try {
    const { courseId, percentage } = req.body;
    
    // Validate inputs
    if (typeof courseId !== 'number' || courseId < 1) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }
    
    if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
      return res.status(400).json({ error: 'Percentage must be between 0 and 100' });
    }
    
    // Update progress
    const updatedProgress = storage.updateProgress(courseId, percentage);
    
    res.json(updatedProgress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Serve homePage.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/homePage.html'));
});

// Handle all other routes by serving the appropriate HTML file
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const validPages = ['homePage', 'tracker', 'fullstack', 'devOps', 'dataScience', 'dataAnalysis'];
    
    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, `../frontend/${page}.html`));
    } else {
        // If the page doesn't exist, redirect to homePage
        res.redirect('/');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});