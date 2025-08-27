// Local Storage utility functions for the inventory management system

// User Management
export const saveUser = (user) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('isAuthenticated', 'true');
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const logout = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isAuthenticated');
};

// Product Management
export const saveProduct = (product) => {
  const products = getProducts();
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    product.id = Date.now();
    products.push(product);
  }
  
  localStorage.setItem('products', JSON.stringify(products));
  return product;
};

export const getProducts = () => {
  const defaultProducts = [
    {
      id: 1,
      name: 'Wireless Mouse',
      sku: 'WM-1001',
      price: 15000,
      stock: 16,
      category: 'Electronics',
      supplier: 'Tech Supplier',
      description: 'High-quality wireless mouse',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      sku: 'MK-2023',
      price: 20000,
      stock: 12,
      category: 'Electronics',
      supplier: 'Tech Supplier',
      description: 'Mechanical keyboard with RGB lighting',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Ergonomic Chair',
      sku: 'EC-450',
      price: 150000,
      stock: 0,
      category: 'Furniture',
      supplier: 'Office Supplier',
      description: 'Comfortable ergonomic office chair',
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Gaming Headset',
      sku: 'GH-789',
      price: 25000,
      stock: 15,
      category: 'Electronics',
      supplier: 'Gaming Supplier',
      description: 'High-quality gaming headset',
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Webcam',
      sku: 'WC-321',
      price: 18000,
      stock: 10,
      category: 'Electronics',
      supplier: 'Tech Supplier',
      description: 'HD webcam for video calls',
      createdAt: new Date().toISOString(),
    },
  ];
  
  const stored = localStorage.getItem('products');
  if (!stored) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  return JSON.parse(stored);
};

export const deleteProduct = (productId) => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== productId);
  localStorage.setItem('products', JSON.stringify(filtered));
};

// Sales Management
export const saveSale = (sale) => {
  const sales = getSales();
  sale.id = Date.now();
  sale.date = new Date().toISOString();
  sales.push(sale);
  localStorage.setItem('sales', JSON.stringify(sales));
  return sale;
};

export const getSales = () => {
  return JSON.parse(localStorage.getItem('sales') || '[]');
};

// Store Management
export const saveStore = (store) => {
  const stores = getStores();
  const existingIndex = stores.findIndex(s => s.id === store.id);
  
  if (existingIndex >= 0) {
    stores[existingIndex] = store;
  } else {
    store.id = Date.now();
    stores.push(store);
  }
  
  localStorage.setItem('stores', JSON.stringify(stores));
  return store;
};

export const getStores = () => {
  return JSON.parse(localStorage.getItem('stores') || '[]');
};

// Settings Management
export const saveSettings = (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};

export const getSettings = () => {
  const defaultSettings = {
    language: 'English',
    currency: 'NGN',
    darkMode: false,
    lowStockThreshold: 50,
    notifications: {
      app: true,
      whatsapp: false,
      email: false,
    },
  };
  
  const stored = localStorage.getItem('settings');
  return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
};

// Staff Management
export const saveStaff = (staff) => {
  const staffList = getStaff();
  const existingIndex = staffList.findIndex(s => s.id === staff.id);
  
  if (existingIndex >= 0) {
    staffList[existingIndex] = staff;
  } else {
    staff.id = Date.now();
    staffList.push(staff);
  }
  
  localStorage.setItem('staff', JSON.stringify(staffList));
  return staff;
};

export const getStaff = () => {
  const defaultStaff = [
    {
      id: 1,
      name: 'Chukwudi Eze',
      role: 'Owner',
      avatar: '👨‍💼',
    },
    {
      id: 2,
      name: 'Emeka Okoro',
      role: 'Manager',
      avatar: '👨‍💼',
    },
    {
      id: 3,
      name: 'Ibrahim Musa',
      role: 'Manager',
      avatar: '👨‍💼',
    },
    {
      id: 4,
      name: 'Aisha Bello',
      role: 'Clerk',
      avatar: '👩‍💼',
    },
    {
      id: 5,
      name: 'Fatima Hassan',
      role: 'Clerk',
      avatar: '👩‍💼',
    },
    {
      id: 6,
      name: 'Ngozi Adebayo',
      role: 'Clerk',
      avatar: '👩‍💼',
    },
    {
      id: 7,
      name: 'Yemi Oladele',
      role: 'Clerk',
      avatar: '👨‍💼',
    },
  ];
  
  const stored = localStorage.getItem('staff');
  if (!stored) {
    localStorage.setItem('staff', JSON.stringify(defaultStaff));
    return defaultStaff;
  }
  return JSON.parse(stored);
};

// Notification Management
export const saveNotifications = (notifications) => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const getNotifications = () => {
  const defaultNotifications = [
    {
      id: 1,
      type: 'Low Stock Alert',
      message: 'Organic Apples fell below your threshold (10)',
      time: '10:30 AM',
      date: 'Today',
      icon: '📦',
      color: 'warning',
    },
    {
      id: 2,
      type: 'Refund Processed',
      message: '₦1,200 refunded for Order #1234',
      time: '01:15 PM',
      date: 'Today',
      icon: '💰',
      color: 'info',
    },
    {
      id: 3,
      type: 'Expiry Warning',
      message: 'Fresh Milk expires in 2 days',
      time: 'Jul 22',
      date: 'Yesterday',
      icon: '⚠️',
      color: 'warning',
    },
    {
      id: 4,
      type: 'Sync Status',
      message: 'Last sync at 2:00 PM',
      time: 'Jul 22',
      date: 'Yesterday',
      icon: '🔄',
      color: 'success',
    },
    {
      id: 5,
      type: 'Damaged Item',
      message: '3 Bottles reported damaged',
      time: 'Jul 9',
      date: 'Earlier',
      icon: '❌',
      color: 'error',
    },
    {
      id: 6,
      type: 'System Update',
      message: 'Version 2.5 available to download',
      time: 'Jul 3',
      date: 'Earlier',
      icon: '⬆️',
      color: 'info',
    },
  ];
  
  const stored = localStorage.getItem('notifications');
  if (!stored) {
    localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
    return defaultNotifications;
  }
  return JSON.parse(stored);
};

// Initialize default data
export const initializeDefaultData = () => {
  getProducts();
  getStaff();
  getNotifications();
  getSettings();
};