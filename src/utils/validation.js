// Data validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 6,
    errors: [
      password.length < 6 && 'Password must be at least 6 characters',
      !/[A-Z]/.test(password) && 'Password should contain an uppercase letter',
      !/[0-9]/.test(password) && 'Password should contain a number',
    ].filter(Boolean),
  };
};

export const validatePhone = (phone) => {
  const re = /^(\+234|0)[789][01]\d{8}$/; // Nigerian phone format
  return re.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateStoreForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Store name is required';
  }
  
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid Nigerian phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStaffForm = (formData) => {
  const errors = {};
  
  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (formData.salary && isNaN(Number(formData.salary))) {
    errors.salary = 'Salary must be a valid number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};