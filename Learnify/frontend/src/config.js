const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-render-url.onrender.com/api'
    : 'http://localhost:3000/api'
};

export default config; 