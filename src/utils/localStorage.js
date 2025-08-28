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

// Company Management
export const saveCompany = (company) => {
  const companies = getCompanies();
  const existingIndex = companies.findIndex(c => c.id === company.id);
  
  if (existingIndex >= 0) {
    companies[existingIndex] = company;
  } else {
    companies.push(company);
  }
  
  localStorage.setItem('companies', JSON.stringify(companies));
  return company;
};

export const getCompanies = () => {
  return JSON.parse(localStorage.getItem('companies') || '[]');
};

// Request Management
export const getManagerRequests = () => {
  return JSON.parse(localStorage.getItem('managerRequests') || '[]');
};

export const getStaffRequests = () => {
  return JSON.parse(localStorage.getItem('staffRequests') || '[]');
};

export const approveManagerRequest = (requestId) => {
  const requests = getManagerRequests();
  const request = requests.find(r => r.id === requestId);
  
  if (request) {
    // Convert request to user
    const newUser = {
      ...request,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      permissions: ['inventory', 'sales', 'reports'], // Manager permissions
    };
    
    // Add to users
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Remove from requests
    const updatedRequests = requests.filter(r => r.id !== requestId);
    localStorage.setItem('managerRequests', JSON.stringify(updatedRequests));
    
    return newUser;
  }
  return null;
};

export const approveStaffRequest = (requestId, pin) => {
  const requests = getStaffRequests();
  const request = requests.find(r => r.id === requestId);
  
  if (request) {
    // Convert request to user
    const newUser = {
      ...request,
      status: 'approved',
      pin: pin, // 4-digit PIN for staff login
      approvedAt: new Date().toISOString(),
      permissions: ['sales'], // Limited permissions for staff
    };
    
    // Add to users
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Remove from requests
    const updatedRequests = requests.filter(r => r.id !== requestId);
    localStorage.setItem('staffRequests', JSON.stringify(updatedRequests));
    
    return newUser;
  }
  return null;
};

// Initialize default data
export const initializeDefaultData = () => {
  getProducts();
  getStaff();
  getNotifications();
  getSettings();
  
  // Initialize sample company if none exists
  const companies = getCompanies();
  if (companies.length === 0) {
    const sampleCompany = {
      id: Date.now(),
      name: 'Sample Business',
      owner: 1,
      stores: [{
        id: Date.now(),
        name: 'Main Store',
        address: '123 Business Street, Lagos',
        phone: '+234 123 456 7890',
        managerId: 1,
      }],
      createdAt: new Date().toISOString(),
    };
    saveCompany(sampleCompany);
  }
};

// Initialize sample data for new users
export const initializeUserData = (userId) => {
  console.log('Initializing user data for user:', userId);
  
  // Check if user already has data
  const products = getProducts();
  const sales = getSales();
  
  console.log('Current products count:', products.length);
  console.log('Current sales count:', sales.length);
  
  // If no data exists, create sample data
  if (products.length === 0) {
    console.log('Creating sample products...');
    const sampleProducts = [
      {
        id: 1,
        name: 'iPhone 13 Pro',
        category: 'Electronics',
        price: 350000,
        stock: 25,
        sku: 'IPH13P001',
        image: '/api/placeholder/200/200',
        description: 'Latest iPhone with advanced camera system',
        supplier: 'Apple Inc',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Samsung Galaxy S21',
        category: 'Electronics',
        price: 280000,
        stock: 18,
        sku: 'SGS21001',
        image: '/api/placeholder/200/200',
        description: 'Premium Android smartphone',
        supplier: 'Samsung',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: 'MacBook Air M1',
        category: 'Computers',
        price: 450000,
        stock: 12,
        sku: 'MBA21001',
        image: '/api/placeholder/200/200',
        description: 'Ultra-thin laptop with M1 chip',
        supplier: 'Apple Inc',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 4,
        name: 'AirPods Pro',
        category: 'Audio',
        price: 85000,
        stock: 30,
        sku: 'APP001',
        image: '/api/placeholder/200/200',
        description: 'Wireless earbuds with noise cancellation',
        supplier: 'Apple Inc',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 5,
        name: 'Dell XPS 13',
        category: 'Computers',
        price: 420000,
        stock: 8,
        sku: 'DXP13001',
        image: '/api/placeholder/200/200',
        description: 'Premium ultrabook for professionals',
        supplier: 'Dell',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 6,
        name: 'Sony WH-1000XM4',
        category: 'Audio',
        price: 95000,
        stock: 15,
        sku: 'SWH1000001',
        image: '/api/placeholder/200/200',
        description: 'Premium noise-canceling headphones',
        supplier: 'Sony',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 7,
        name: 'iPad Pro 11"',
        category: 'Tablets',
        price: 320000,
        stock: 20,
        sku: 'IPP11001',
        image: '/api/placeholder/200/200',
        description: 'Professional tablet with M1 chip',
        supplier: 'Apple Inc',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 8,
        name: 'Nike Air Max 270',
        category: 'Footwear',
        price: 35000,
        stock: 5, // Low stock item
        sku: 'NAM270001',
        image: '/api/placeholder/200/200',
        description: 'Comfortable running shoes',
        supplier: 'Nike',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 9,
        name: 'Adidas Ultraboost 22',
        category: 'Footwear',
        price: 42000,
        stock: 22,
        sku: 'AUB22001',
        image: '/api/placeholder/200/200',
        description: 'High-performance running shoes',
        supplier: 'Adidas',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 10,
        name: 'Canon EOS R5',
        category: 'Cameras',
        price: 1200000,
        stock: 6,
        sku: 'CEOSR5001',
        image: '/api/placeholder/200/200',
        description: 'Professional mirrorless camera',
        supplier: 'Canon',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    console.log('Saving', sampleProducts.length, 'sample products to localStorage');
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
  
  if (sales.length === 0) {
    console.log('Creating sample sales...');
    const sampleSales = [
      {
        id: 1,
        items: [
          { id: 1, name: 'iPhone 13 Pro', price: 350000, quantity: 1 },
          { id: 4, name: 'AirPods Pro', price: 85000, quantity: 1 }
        ],
        total: 435000,
        date: new Date().toISOString(),
        customer: 'John Doe',
        paymentMethod: 'Cash',
        staff: userId,
      },
      {
        id: 2,
        items: [
          { id: 2, name: 'Samsung Galaxy S21', price: 280000, quantity: 1 }
        ],
        total: 280000,
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        customer: 'Jane Smith',
        paymentMethod: 'Card',
        staff: userId,
      },
      {
        id: 3,
        items: [
          { id: 8, name: 'Nike Air Max 270', price: 35000, quantity: 2 }
        ],
        total: 70000,
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        customer: 'Mike Johnson',
        paymentMethod: 'Transfer',
        staff: userId,
      },
    ];
    
    console.log('Saving', sampleSales.length, 'sample sales to localStorage');
    localStorage.setItem('sales', JSON.stringify(sampleSales));
  }
  
  console.log('User data initialization complete');
};