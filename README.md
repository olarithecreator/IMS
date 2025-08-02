# Inventory Management System

A modern, comprehensive inventory management application built with React and Material-UI.

## Features

### Core Functionality
- **Dashboard**: Overview with key metrics, charts, and recent activity
- **Inventory Management**: Add, edit, delete, and view products with detailed information
- **Category Management**: Organize products into categories with custom colors
- **Supplier Management**: Track supplier information and relationships
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Key Screens
1. **Login/Register**: User authentication
2. **Dashboard**: Main overview with statistics and charts
3. **Inventory List**: Product management with search and filtering
4. **Add Product**: Multi-step form for adding new products
5. **Edit Product**: Modify existing product information
6. **Product Details**: Comprehensive product view with specifications
7. **Categories**: Manage product categories
8. **Suppliers**: Manage supplier information
9. **Orders**: Order management (placeholder)
10. **Reports**: Analytics and reporting (placeholder)
11. **Settings**: Application configuration
12. **Profile**: User profile management
13. **Notifications**: System notifications
14. **Help**: Support and documentation
15. **About**: Application information

## Technology Stack

- **React 18**: Modern React with hooks
- **Material-UI 5**: Component library for consistent design
- **React Router 6**: Client-side routing
- **Recharts**: Data visualization library
- **Date-fns**: Date manipulation utilities

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

### Default Login Credentials
- **Email**: admin@example.com
- **Password**: password

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Layout.js       # Main layout with navigation
├── screens/            # Application screens
│   ├── Login.js        # Authentication screen
│   ├── Dashboard.js    # Main dashboard
│   ├── InventoryList.js # Product management
│   ├── AddProduct.js   # Add new products
│   ├── EditProduct.js  # Edit existing products
│   ├── ProductDetails.js # Product information
│   ├── Categories.js   # Category management
│   ├── Suppliers.js    # Supplier management
│   └── ...            # Other screens
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Features in Detail

### Dashboard
- Real-time statistics cards
- Interactive charts (sales overview, category distribution)
- Recent activity feed
- Quick action buttons

### Inventory Management
- Advanced data grid with sorting and filtering
- Search functionality
- Bulk operations
- Status indicators (In Stock, Low Stock, Out of Stock)

### Product Management
- Multi-step form for adding products
- Comprehensive product details
- Image upload capability
- SKU generation
- Stock level tracking

### Category Management
- Visual category cards
- Color customization
- Product count tracking
- CRUD operations

### Supplier Management
- Contact information tracking
- Product association
- Status management
- Detailed supplier profiles

## Customization

### Adding New Screens
1. Create a new component in `src/screens/`
2. Add the route in `src/App.js`
3. Update navigation in `src/components/Layout.js`

### Styling
The application uses Material-UI's theming system. You can customize:
- Colors in `src/index.js`
- Component styles using the `sx` prop
- Global theme in the ThemeProvider

### Data Management
Currently, the application uses mock data. To integrate with a backend:
1. Replace mock data with API calls
2. Add proper error handling
3. Implement loading states
4. Add data validation

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload the `build` folder to an S3 bucket
- **Heroku**: Deploy using the Heroku CLI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the Help section in the application
- Review the documentation
- Create an issue in the repository

## Roadmap

### Planned Features
- [ ] Order management system
- [ ] Advanced reporting and analytics
- [ ] Barcode scanning integration
- [ ] Multi-language support
- [ ] Advanced user roles and permissions
- [ ] Real-time notifications
- [ ] Data import/export functionality
- [ ] Mobile app version

### Technical Improvements
- [ ] Backend API integration
- [ ] Database implementation
- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] PWA capabilities

---

**Note**: This is a demonstration application. For production use, implement proper security measures, data validation, and backend integration. 