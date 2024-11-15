export const loginUser  = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    return data; // Assuming the API returns user data
  };
  
  export const registerUser  = async (username, email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Signup failed');
    }
  
    const data = await response.json();
    return data; // Assuming the API returns user data
  };