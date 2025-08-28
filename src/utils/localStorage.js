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
export const saveProduct = (product, storeId = null) => {
  const products = getProducts();
  const currentStoreId = storeId || getCurrentStore()?.id;
  
  if (!currentStoreId) {
    throw new Error('No store context available');
  }
  
  const productWithStore = {
    ...product,
    storeId: parseInt(currentStoreId),
    updatedAt: new Date().toISOString()
  };
  
  const existingIndex = products.findIndex(p => p.id === product.id);
  const isNewProduct = existingIndex < 0;
  
  if (existingIndex >= 0) {
    products[existingIndex] = productWithStore;
  } else {
    productWithStore.id = Date.now();
    productWithStore.createdAt = new Date().toISOString();
    productWithStore.barcode = productWithStore.barcode || generateBarcode();
    products.push(productWithStore);
  }
  
  localStorage.setItem('products', JSON.stringify(products));
  
  // Trigger storage event to notify other components
  if (isNewProduct) {
    window.dispatchEvent(new CustomEvent('productAdded', { 
      detail: { product: productWithStore, storeId: currentStoreId } 
    }));
    console.log(`New product "${productWithStore.name}" added to store ${currentStoreId}`);
  } else {
    window.dispatchEvent(new CustomEvent('productUpdated', { 
      detail: { product: productWithStore, storeId: currentStoreId } 
    }));
    console.log(`Product "${productWithStore.name}" updated in store ${currentStoreId}`);
  }
  
  return productWithStore;
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
  const id = parseInt(productId);
  
  if (isNaN(id)) {
    console.error('Invalid product ID for deletion:', productId);
    return false;
  }
  
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(filtered));
  
  // Trigger storage event to notify other components
  window.dispatchEvent(new CustomEvent('productDeleted', { 
    detail: { productId: id } 
  }));
  
  console.log(`Product ${productId} deleted from store inventory`);
  return true;
};

// Store-specific product management
export const getStoreProducts = (storeId = null) => {
  const currentStoreId = storeId || getCurrentStore()?.id;
  if (!currentStoreId) return [];
  
  const storeIdNum = parseInt(currentStoreId);
  if (isNaN(storeIdNum)) {
    console.error('Invalid store ID for products:', currentStoreId);
    return [];
  }
  
  const products = getProducts();
  return products.filter(product => product.storeId === storeIdNum);
};

export const updateProduct = (productId, updates, storeId = null) => {
  const products = getProducts();
  const currentStoreId = storeId || getCurrentStore()?.id;
  
  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      return {
        ...product,
        ...updates,
        storeId: parseInt(currentStoreId),
        updatedAt: new Date().toISOString()
      };
    }
    return product;
  });
  
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  return updatedProducts.find(p => p.id === productId);
};

// Search products by barcode
export const findProductByBarcode = (barcode, storeId = null) => {
  const currentStoreId = storeId || getCurrentStore()?.id;
  const storeProducts = getStoreProducts(currentStoreId);
  
  return storeProducts.find(product => 
    product.barcode === barcode || 
    product.sku === barcode ||
    product.id.toString() === barcode
  );
};

// Generate barcode for new products
export const generateBarcode = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 5);
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

export const getCompanyById = (companyId) => {
  const companies = getCompanies();
  return companies.find(c => c.id === companyId);
};

export const updateCompany = (companyId, updates) => {
  const companies = getCompanies();
  const updatedCompanies = companies.map(c => 
    c.id === companyId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
  );
  localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  return updatedCompanies.find(c => c.id === companyId);
};

// Store Context Management
export const getCurrentStore = () => {
  const currentStoreId = localStorage.getItem('currentStoreId');
  if (!currentStoreId) return null;
  
  const user = getCurrentUser();
  if (!user) return null;
  
  const companies = getCompanies();
  const userCompany = companies.find(c => c.owner === user.id || c.id === user.companyId);
  
  if (!userCompany || !userCompany.stores) return null;
  
  return userCompany.stores.find(store => store.id === parseInt(currentStoreId));
};

export const setCurrentStore = (storeId) => {
  localStorage.setItem('currentStoreId', storeId.toString());
};

export const getUserStores = () => {
  const user = getCurrentUser();
  if (!user) return [];
  
  const companies = getCompanies();
  const userCompany = companies.find(c => c.owner === user.id || c.id === user.companyId);
  
  return userCompany?.stores || [];
};

export const getStoreById = (storeId) => {
  const stores = getUserStores();
  return stores.find(store => store.id === parseInt(storeId));
};

export const createStore = (storeData) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not found');
  
  const companies = getCompanies();
  const userCompany = companies.find(c => c.owner === user.id || c.id === user.companyId);
  
  if (!userCompany) throw new Error('Company not found');
  
  const newStore = {
    id: Date.now(),
    ...storeData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    staff: [],
    managers: [],
  };
  
  const updatedStores = [...(userCompany.stores || []), newStore];
  
  const updatedCompany = {
    ...userCompany,
    stores: updatedStores,
    updatedAt: new Date().toISOString(),
  };
  
  const updatedCompanies = companies.map(c => 
    c.id === userCompany.id ? updatedCompany : c
  );
  
  localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  
  return newStore;
};

export const updateStore = (storeId, updates) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not found');
  
  const companies = getCompanies();
  const userCompany = companies.find(c => c.owner === user.id || c.id === user.companyId);
  
  if (!userCompany) throw new Error('Company not found');
  
  const updatedStores = userCompany.stores.map(store => 
    store.id === parseInt(storeId) 
      ? { ...store, ...updates, updatedAt: new Date().toISOString() }
      : store
  );
  
  const updatedCompany = {
    ...userCompany,
    stores: updatedStores,
    updatedAt: new Date().toISOString(),
  };
  
  const updatedCompanies = companies.map(c => 
    c.id === userCompany.id ? updatedCompany : c
  );
  
  localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  
  return updatedStores.find(store => store.id === parseInt(storeId));
};

export const deleteStore = (storeId) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not found');
  
  const companies = getCompanies();
  const userCompany = companies.find(c => c.owner === user.id || c.id === user.companyId);
  
  if (!userCompany) throw new Error('Company not found');
  
  const updatedStores = userCompany.stores.filter(store => store.id !== parseInt(storeId));
  
  const updatedCompany = {
    ...userCompany,
    stores: updatedStores,
    updatedAt: new Date().toISOString(),
  };
  
  const updatedCompanies = companies.map(c => 
    c.id === userCompany.id ? updatedCompany : c
  );
  
  localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  
  // If this was the current store, switch to another store or clear
  const currentStoreId = localStorage.getItem('currentStoreId');
  if (currentStoreId === storeId.toString()) {
    if (updatedStores.length > 0) {
      setCurrentStore(updatedStores[0].id);
    } else {
      localStorage.removeItem('currentStoreId');
    }
  }
  
  return true;
};

// Store Staff Management
export const addStaffToStore = (storeId, staffData) => {
  const store = getStoreById(storeId);
  if (!store) throw new Error('Store not found');
  
  const newStaffMember = {
    id: Date.now(),
    ...staffData,
    storeId: parseInt(storeId),
    createdAt: new Date().toISOString(),
  };
  
  const updatedStaff = [...(store.staff || []), newStaffMember];
  
  updateStore(storeId, { staff: updatedStaff });
  
  return newStaffMember;
};

export const getStoreStaff = (storeId) => {
  const store = getStoreById(storeId);
  return store?.staff || [];
};

export const getStoreManagers = (storeId) => {
  const store = getStoreById(storeId);
  return store?.managers || [];
};

export const addManagerToStore = (storeId, managerData) => {
  const store = getStoreById(storeId);
  if (!store) throw new Error('Store not found');
  
  const newManager = {
    id: Date.now(),
    ...managerData,
    storeId: parseInt(storeId),
    createdAt: new Date().toISOString(),
  };
  
  const updatedManagers = [...(store.managers || []), newManager];
  
  updateStore(storeId, { managers: updatedManagers });
  
  return newManager;
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