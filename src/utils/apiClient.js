// API client utility for making secure requests to Netlify functions
const API_BASE_URL = import.meta.env.PROD ? 'https://vtube1.netlify.app' : '';

// Optional: If you want to use API key authentication, set this environment variable
const FRONTEND_API_KEY = import.meta.env.VITE_FRONTEND_API_KEY;

/**
 * Makes a secure API request to Netlify functions with proper headers
 * @param {string} endpoint - The API endpoint (e.g., '/.netlify/functions/youtube-videos')
 * @param {object} options - Additional fetch options
 * @returns {Promise<Response>} - The fetch response
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Include API key if available (optional security layer)
    ...(FRONTEND_API_KEY && { 'X-API-Key': FRONTEND_API_KEY })
  };

  const requestOptions = {
    method: 'GET',
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, requestOptions);
    
    // Handle rate limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 60;
      throw new Error(`Rate limit exceeded. Please try again in ${retryAfter} seconds.`);
    }
    
    // Handle access denied
    if (response.status === 403) {
      throw new Error('Access denied. Invalid origin.');
    }
    
    // Handle unauthorized
    if (response.status === 401) {
      throw new Error('Unauthorized request.');
    }
    
    // Handle other errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Makes a GET request to a Netlify function endpoint
 * @param {string} endpoint - The API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise<object>} - The JSON response
 */
export const apiGet = async (endpoint, params = {}) => {
  const searchParams = new URLSearchParams(params);
  const url = searchParams.toString() ? `${endpoint}?${searchParams}` : endpoint;
  
  const response = await apiRequest(url);
  return await response.json();
};

export default { apiRequest, apiGet };