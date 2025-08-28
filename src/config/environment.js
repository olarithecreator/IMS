// Environment configuration
const environment = {
  development: {
    API_BASE_URL: 'http://localhost:3001/api',
    ENABLE_CONSOLE_LOGS: true,
    ENABLE_REDUX_DEVTOOLS: true,
    MOCK_DATA: true,
  },
  
  staging: {
    API_BASE_URL: 'https://staging-api.yourapp.com/api',
    ENABLE_CONSOLE_LOGS: false,
    ENABLE_REDUX_DEVTOOLS: true,
    MOCK_DATA: false,
  },
  
  production: {
    API_BASE_URL: 'https://api.yourapp.com/api',
    ENABLE_CONSOLE_LOGS: false,
    ENABLE_REDUX_DEVTOOLS: false,
    MOCK_DATA: false,
  }
};

const currentEnv = process.env.NODE_ENV || 'development';

export const config = {
  ...environment[currentEnv],
  ENV: currentEnv,
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  BUILD_DATE: process.env.REACT_APP_BUILD_DATE || new Date().toISOString(),
};

export const isDevelopment = currentEnv === 'development';
export const isProduction = currentEnv === 'production';
export const isStaging = currentEnv === 'staging';

// Enhanced console logging
export const logger = {
  log: (...args) => {
    if (config.ENABLE_CONSOLE_LOGS) {
      console.log('[APP]', ...args);
    }
  },
  
  error: (...args) => {
    console.error('[ERROR]', ...args);
  },
  
  warn: (...args) => {
    if (config.ENABLE_CONSOLE_LOGS) {
      console.warn('[WARN]', ...args);
    }
  },
  
  info: (...args) => {
    if (config.ENABLE_CONSOLE_LOGS) {
      console.info('[INFO]', ...args);
    }
  }
};