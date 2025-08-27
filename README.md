# 📱 Modern Inventory Management System

A complete mobile-first inventory management system built with React and Material-UI, featuring a beautiful interface and comprehensive functionality for managing products, sales, staff, and more.

![Inventory Management System](./src/assets/preview.png)

## ✨ Features

### 🔐 Authentication & Onboarding
- **Multi-step Onboarding**: Guided introduction with three key value propositions
- **Email Registration**: Secure account creation with email verification
- **Social Login**: Google and Apple authentication options
- **Password Recovery**: Complete forgot password flow with email verification
- **Staff PIN Login**: Separate login flow for staff members

### 📊 Dashboard & Analytics
- **Real-time Metrics**: Total stock, inventory value, and sales data
- **Low Stock Alerts**: Automatic notifications for items running low
- **Today's Sales**: Track daily sales performance
- **Role-based UI**: Different interfaces for Owner, Manager, and Sales Clerk

### 📦 Product Management
- **Product Catalog**: Grid and list view with search and filters
- **Barcode Scanning**: Camera-based product scanning with live matching
- **Bulk Operations**: Select multiple products for batch updates
- **Stock Management**: Add/remove inventory with cost tracking
- **Product Details**: Comprehensive product information and history

### 💰 Sales Management
- **Point of Sale**: Multi-tab sales interface for handling multiple customers
- **Cart Management**: Add, remove, and adjust quantities
- **Payment Processing**: Multiple payment methods (Cash, Card, Transfer)
- **Discount System**: Percentage and fixed amount discounts
- **Receipt Generation**: Digital receipts with sharing capabilities

### 👥 Staff & Store Management
- **Role Management**: Owner, Manager, and Clerk roles with permissions
- **Staff Invitations**: Invite team members via email
- **Multi-store Support**: Manage multiple store locations
- **Store Profiles**: Complete store information and settings

### 🔔 Notifications & Alerts
- **Real-time Notifications**: Low stock, sales, and system alerts
- **Alert Categories**: Grouped by importance and date
- **Visual Indicators**: Clear icons and status indicators

### ⚙️ Settings & Configuration
- **User Preferences**: Language, currency, and theme settings
- **Notification Settings**: Control app, WhatsApp, and email alerts
- **Low Stock Thresholds**: Customizable inventory alerts
- **Data Sync**: Cloud synchronization status

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for mobile devices
- **Bottom Navigation**: Easy thumb-friendly navigation
- **Touch-Friendly**: Large tap targets and gestures
- **Offline Support**: Local storage for offline functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 14.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 User Flow

### For New Users
1. **Onboarding**: Welcome screens explaining key features
2. **Registration**: Create account with email
3. **Verification**: Enter verification code sent to email
4. **Store Setup**: Configure your first store
5. **Dashboard**: Start managing your inventory

### For Existing Users
1. **Login**: Email and password authentication
2. **Dashboard**: Overview of your business metrics
3. **Navigation**: Use bottom nav to access all features
4. **Quick Actions**: Fast access to common tasks

## 🏗️ Architecture

### Frontend
- **React 18**: Modern React with hooks
- **Material-UI 5**: Comprehensive component library
- **React Router 6**: Client-side routing
- **Local Storage**: Data persistence
- **Responsive Design**: Mobile-first approach

### State Management
- **React Context**: Global state management
- **Local Storage Utils**: Centralized data operations
- **Real-time Updates**: Automatic UI synchronization

### Data Structure
- **Users**: Authentication and profile data
- **Products**: Inventory items with categories
- **Sales**: Transaction records and receipts
- **Stores**: Multi-location support
- **Settings**: User preferences and configuration

## 🔧 Key Components

### Authentication Flow
```
Onboarding → Register → Verification → Store Setup → Dashboard
                ↓
           Login (Existing Users)
```

### Main Navigation
```
Dashboard ← → Scan ← → Products ← → Sales
    ↓           ↓         ↓         ↓
Settings   Add Stock   Manage    New Sale
Profile    Inventory   Catalog   Reports
```

### Data Flow
```
UI Actions → Local Storage → State Updates → UI Refresh
```

## 🎨 Design System

### Colors
- **Primary**: #1976d2 (Blue)
- **Secondary**: #dc004e (Pink)
- **Success**: #2e7d32 (Green)
- **Warning**: #ed6c02 (Orange)
- **Error**: #d32f2f (Red)

### Typography
- **Headers**: Roboto Bold
- **Body**: Roboto Regular
- **Captions**: Roboto Light

### Components
- **Cards**: Rounded corners (borderRadius: 3)
- **Buttons**: Material Design 3 style
- **Inputs**: Outlined with focus states
- **Navigation**: Bottom tab bar for mobile

## 📊 Sample Data

The app comes pre-loaded with sample data for demonstration:

- **5 Sample Products**: Electronics, furniture, and more
- **Sample Sales**: Recent transaction history
- **Staff Members**: Different roles and permissions
- **Notifications**: Various alert types
- **Settings**: Default configuration

## 🔒 Security Features

- **Input Validation**: All forms validated
- **XSS Protection**: Sanitized user inputs
- **Authentication**: Secure login/logout
- **Data Isolation**: User-specific data storage
- **Role-based Access**: Permission-based features

## 🚧 Future Enhancements

- [ ] **Cloud Sync**: Real-time data synchronization
- [ ] **Barcode Generation**: Create product barcodes
- [ ] **Advanced Analytics**: Detailed reports and insights
- [ ] **Multi-currency**: Support for different currencies
- [ ] **API Integration**: Connect to external services
- [ ] **Push Notifications**: Real-time mobile alerts
- [ ] **Offline Mode**: Full offline functionality
- [ ] **Export Features**: PDF reports and data export

## 🛠️ Development

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── Layout.js        # Desktop layout
│   └── MobileLayout.js  # Mobile layout
├── screens/             # Page components
│   ├── auth/           # Authentication screens
│   ├── dashboard/      # Dashboard and main screens
│   └── settings/       # Settings and configuration
├── utils/              # Utility functions
│   └── localStorage.js # Data management
├── theme.js            # Material-UI theme
└── App.js             # Main application component
```

### Available Scripts
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI Team**: For the excellent component library
- **React Team**: For the amazing framework
- **Design Inspiration**: Modern mobile app interfaces
- **Icons**: Material Design Icons

## 📞 Support

For support, email support@inventoryapp.com or join our Slack channel.

---

**Built with ❤️ using React and Material-UI**