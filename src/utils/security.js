// Security utilities
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
};

export const validateCSRF = () => {
  // In a real app, implement CSRF protection
  return true;
};

export const encryptSensitiveData = (data) => {
  // In production, use proper encryption
  // This is just a placeholder
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return data;
  }
};

export const decryptSensitiveData = (encryptedData) => {
  try {
    return JSON.parse(atob(encryptedData));
  } catch {
    return encryptedData;
  }
};

export const validateUserSession = () => {
  const user = localStorage.getItem('currentUser');
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    // Check if session is expired (24 hours)
    const sessionTime = userData.loginTime || Date.now();
    const isExpired = Date.now() - sessionTime > 24 * 60 * 60 * 1000;
    
    if (isExpired) {
      localStorage.removeItem('currentUser');
      return false;
    }
    
    return true;
  } catch {
    localStorage.removeItem('currentUser');
    return false;
  }
};

export const secureLocalStorage = {
  setItem: (key, value) => {
    try {
      const encrypted = encryptSensitiveData(value);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Failed to save to secure storage:', error);
    }
  },
  
  getItem: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      return encrypted ? decryptSensitiveData(encrypted) : null;
    } catch (error) {
      console.error('Failed to read from secure storage:', error);
      return null;
    }
  },
  
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
};