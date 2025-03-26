require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Update MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_atlas_uri';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: ['https://your-netlify-app.netlify.app', 'http://localhost:3000']
}));
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Username or email already exists' 
      });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({ 
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route example
app.get('/api/user/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API routes
app.get('/api/courses', (req, res) => {
    // Your existing courses API logic
    const courses = [
        { id: 1, name: 'Web Development Fundamentals', progress: 0 },
        { id: 2, name: 'JavaScript Advanced Concepts', progress: 0 },
        { id: 3, name: 'React Framework Mastery', progress: 0 },
        { id: 4, name: 'Backend Development with Node.js', progress: 0 }
    ];
    res.json(courses);
});

app.post('/api/progress/update', (req, res) => {
    // Your existing progress update logic
    const { courseId, percentage } = req.body;
    res.json({ courseId, percentage });
});

// Serve index.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Handle other routes
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const validPages = ['homePage', 'tracker', 'fullstack', 'devOps', 'dataScience', 'dataAnalysis'];
    
    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, `../frontend/${page}.html`));
    } else {
        // Redirect to index page if page doesn't exist
        res.redirect('/');
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
}); 