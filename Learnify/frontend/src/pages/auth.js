const API_BASE_URL = 'http://localhost:3000/api';

// Handle signup
async function handleSignup(event) {
  event.preventDefault();
  
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // Store token
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Update UI
    updateAuthUI(true);
    showToast('Success', 'Account created successfully');
  } catch (error) {
    showToast('Error', error.message, true);
  }
}

// Handle login
async function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store token
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Update UI
    updateAuthUI(true);
    showToast('Success', 'Login successful');
  } catch (error) {
    showToast('Error', error.message, true);
  }
}

// Update UI based on auth state
function updateAuthUI(isLoggedIn) {
  const authButtons = document.querySelectorAll('.auth-buttons');
  const userMenu = document.querySelector('.user-menu');
  
  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem('user'));
    authButtons.forEach(btn => btn.style.display = 'none');
    userMenu.style.display = 'flex';
    userMenu.querySelector('.username').textContent = user.username;
  } else {
    authButtons.forEach(btn => btn.style.display = 'flex');
    userMenu.style.display = 'none';
  }
}

// Check auth state on page load
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  updateAuthUI(!!token);
}); 