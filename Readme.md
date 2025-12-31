# EventNest 🎉

A comprehensive full-stack event management platform built with the MERN stack, designed to help societies and organizations create, manage, and promote events while enabling users to discover and RSVP to events seamlessly.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Key Features by Role](#key-features-by-role)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Users
- 🔐 **User Authentication**: Secure signup/login with JWT-based authentication
- 🎪 **Event Discovery**: Browse and explore public events from various societies
- 📝 **RSVP Management**: Register for events and manage your RSVPs
- 👥 **Society Membership**: Join societies and stay updated with their events
- 👤 **Profile Management**: Update profile settings and preferences
- 📊 **Personal Dashboard**: View registered events and joined societies

### For Society Organizers
- 🏢 **Society Registration**: Create and register new societies
- 📅 **Event Creation**: Create and manage events with detailed information
- 🖼️ **Media Management**: Upload logos, cover images, and event posters (Cloudinary integration)
- 👥 **Member Management**: Approve/reject membership requests
- 📋 **Task Management**: Assign and track tasks for events
- 📊 **Society Analytics**: View member count, event statistics, and engagement
- ⚙️ **Society Settings**: Update society information, contact details, and social links

### For Administrators
- 🛡️ **Admin Dashboard**: Comprehensive admin panel for platform management
- ✅ **Society Approval**: Review and approve society registration requests
- 👨‍💼 **User Management**: Manage users and their roles
- 🏢 **Society Management**: Oversee all societies and their activities
- 📊 **Platform Analytics**: Monitor platform-wide statistics

### Additional Features
- 🎫 **QR Code Generation**: Automatic QR code generation for event tickets
- 🔔 **Toast Notifications**: Real-time feedback for user actions
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Modern UI/UX**: Clean and intuitive user interface
- 🔒 **Secure Authentication**: Cookie-based authentication with HTTP-only cookies

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM 7.6.2** - Client-side routing
- **Redux Toolkit 2.8.2** - State management
- **Axios 1.10.0** - HTTP client
- **React Icons 4.12.0** - Icon library
- **React Toastify 11.0.5** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.15.2** - ODM for MongoDB

### Authentication & Security
- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication
- **bcryptjs 3.0.2** - Password hashing
- **Cookie Parser 1.4.7** - Cookie handling
- **Validator 13.15.15** - Input validation

### File Upload & Media
- **Multer 2.0.1** - File upload middleware
- **Cloudinary 1.41.3** - Cloud storage for images
- **multer-storage-cloudinary 4.0.0** - Cloudinary storage engine

### Additional Tools
- **QRCode 1.5.4** - QR code generation
- **Nodemailer 7.0.3** - Email notifications
- **OpenAI 5.8.2** - AI integration
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.6.1** - Environment variable management

### Development Tools
- **Nodemon 3.1.10** - Auto-restart during development
- **React Scripts 5.0.1** - Build tools

## 📁 Project Structure

```
EventNest/
├── client/                    # React frontend
│   ├── public/               # Static files
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── assets/
│   └── src/
│       ├── admin/            # Admin panel components
│       │   ├── AdminDashboard.jsx
│       │   ├── AdminLogin.jsx
│       │   ├── components/
│       │   └── pages/
│       ├── api/              # API service layer
│       │   ├── authApi.js
│       │   └── userApi.js
│       ├── app/              # Redux store configuration
│       │   └── appStore.js
│       ├── assets/           # Images and media
│       ├── components/       # Reusable components
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── EventCard.jsx
│       │   ├── SocietyCard.jsx
│       │   └── ...
│       ├── context/          # React context providers
│       │   ├── SidebarContext.jsx
│       │   └── SocietyContext.jsx
│       ├── features/         # Redux slices
│       │   └── authSlice.js
│       ├── hooks/            # Custom React hooks
│       │   ├── useCurrentUser.jsx
│       │   ├── useLogout.jsx
│       │   └── useRSVP.jsx
│       ├── pages/            # Page components
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── SignupPage.jsx
│       │   ├── UserDashboard.jsx
│       │   ├── ExploreEvents.jsx
│       │   ├── JoinSociety.jsx
│       │   ├── ProfileSettings.jsx
│       │   └── ManageSociety/
│       └── utils/
│
└── server/                   # Express backend
    ├── config/               # Configuration files
    │   ├── cloudinary.js     # Cloudinary setup
    │   └── connectDB.js      # MongoDB connection
    ├── controllers/          # Route controllers
    │   ├── adminController.js
    │   ├── authController.js
    │   ├── eventController.js
    │   ├── societyController.js
    │   └── userController.js
    ├── data/                 # Seed data
    │   ├── events.json
    │   ├── societies.json
    │   └── users.json
    ├── middleware/           # Custom middleware
    │   ├── authMiddleware.js
    │   └── multer.js
    ├── models/               # Mongoose models
    │   ├── eventModel.js
    │   ├── societyModel.js
    │   ├── userModel.js
    │   ├── joinRequest.js
    │   └── taskModel.js
    ├── routes/               # API routes
    │   ├── adminRoutes.js
    │   ├── authRoutes.js
    │   ├── eventRoutes.js
    │   ├── publicEventRoutes.js
    │   ├── societyRoutes.js
    │   └── userRoutes.js
    ├── utils/                # Utility functions
    │   ├── extractPublicId.js
    │   ├── generateQRCode.js
    │   ├── jwtUtils.js
    │   └── parseTime.js
    └── server.js             # Entry point
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image uploads)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd EventNest
```

### 2. Install Dependencies

#### Install root dependencies
```bash
npm install
```

#### Install client dependencies
```bash
cd client
npm install
cd ..
```

#### Install server dependencies
```bash
cd server
npm install
cd ..
```

## ⚙️ Configuration

### 1. Create Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (for Nodemailer)
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587

# OpenAI (if using AI features)
OPENAI_API_KEY=your_openai_api_key

# Admin Credentials (optional)
ADMIN_EMAIL=admin@eventnest.com
ADMIN_PASSWORD=admin_password
```

### 2. MongoDB Setup

You can use either:

- **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/eventnest`
- **MongoDB Atlas**: Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and use the connection string

### 3. Cloudinary Setup

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to your `.env` file

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
The client will run on `http://localhost:3000`

#### Option 2: Run Concurrently (if configured)

From the root directory:
```bash
npm run dev
```

### Production Mode

#### Build the client
```bash
cd client
npm run build
```

#### Start the server
```bash
cd server
npm start
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/auth/verify` | Verify JWT token | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get current user profile | Yes |
| PUT | `/user/profile` | Update user profile | Yes |
| GET | `/user/societies` | Get user's societies | Yes |
| GET | `/user/events` | Get user's registered events | Yes |

### Society Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/society/register` | Register a new society | Yes |
| GET | `/society/all` | Get all approved societies | No |
| GET | `/society/:id` | Get society details | No |
| PUT | `/society/:id` | Update society | Yes (Creator) |
| DELETE | `/society/:id` | Delete society | Yes (Creator) |
| POST | `/society/:id/join` | Request to join society | Yes |
| POST | `/society/:id/approve` | Approve member request | Yes (Creator) |
| POST | `/society/:id/reject` | Reject member request | Yes (Creator) |

### Event Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/event/create` | Create a new event | Yes |
| GET | `/explore-events` | Get all public events | No |
| GET | `/event/:id` | Get event details | No |
| PUT | `/event/:id` | Update event | Yes (Society Creator) |
| DELETE | `/event/:id` | Delete event | Yes (Society Creator) |
| POST | `/event/:id/rsvp` | RSVP to an event | Yes |
| GET | `/event/:id/participants` | Get event participants | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/login` | Admin login | No |
| GET | `/admin/society-requests` | Get pending society requests | Yes (Admin) |
| POST | `/admin/approve-society/:id` | Approve society | Yes (Admin) |
| POST | `/admin/reject-society/:id` | Reject society | Yes (Admin) |
| GET | `/admin/users` | Get all users | Yes (Admin) |
| GET | `/admin/societies` | Get all societies | Yes (Admin) |
| DELETE | `/admin/user/:id` | Delete user | Yes (Admin) |

## 👥 User Roles

The application supports three main user roles:

### 1. Guest (Default)
- Browse public events
- View society information
- Limited access until registration

### 2. User
- Full access to event discovery
- RSVP to events
- Join societies
- Manage profile
- Register new societies (becomes creator)

### 3. Society Creator
- All user permissions
- Create and manage events
- Manage society members
- Update society information
- View society analytics

### 4. Admin
- Platform-wide access
- Approve/reject societies
- Manage users and societies
- View platform analytics

## 🎯 Key Features by Role

### User Dashboard Features
- **My Events**: View all registered events
- **My Societies**: View joined societies
- **Profile Settings**: Update profile picture, username, email
- **Event Exploration**: Browse and filter events by date, society, type

### Society Management Features
- **Overview**: Society statistics and recent activity
- **Members**: View members, manage join requests
- **Events**: Create, edit, and delete events
- **Settings**: Update society details, contact info, social links

### Admin Dashboard Features
- **Society Requests**: Approve or reject new society registrations
- **Manage Societies**: View and manage all societies
- **Manage Users**: View users, update roles, delete accounts
- **Analytics**: Platform statistics and insights

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  pfp: String (profile picture URL),
  role: String (default: 'guest'),
  societies: [ObjectId ref Society],
  registeredEvents: [ObjectId ref Event],
  timestamps: true
}
```

### Society Model
```javascript
{
  name: String (required, unique),
  description: String,
  logo: String (required),
  coverImage: String,
  website: String,
  contactEmail: String (required),
  phone: String (required),
  type: String (default: 'other'),
  socialLinks: {
    instagram: String,
    linkedin: String
  },
  createdBy: ObjectId ref User,
  members: [ObjectId ref User],
  events: [ObjectId ref Event],
  pendingRequests: [{ userId, requestedAt }],
  timestamps: true
}
```

### Event Model
```javascript
{
  title: String (required),
  description: String,
  poster: String (image URL),
  date: Date (required),
  startTime: String (required),
  endTime: String (required),
  location: String (required),
  societyId: ObjectId ref Society,
  isPublic: Boolean (default: true),
  rsvpOpen: Boolean (default: true),
  participants: [{
    name: String,
    email: String,
    phone: String,
    isGuest: Boolean
  }],
  tasks: [ObjectId ref Task],
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  eventId: ObjectId ref Event,
  assignedTo: [ObjectId ref User],
  status: String (pending/completed),
  dueDate: Date,
  timestamps: true
}
```

## 🔐 Authentication Flow

1. **Signup**: User creates account → Password hashed with bcrypt → JWT token generated
2. **Login**: User credentials verified → JWT token sent as HTTP-only cookie
3. **Protected Routes**: Middleware verifies JWT token from cookies
4. **Logout**: Cookie cleared on client and server

## 🎨 Frontend Features

### State Management (Redux)
- **Auth Slice**: Manages user authentication state
- Persistent user data across components
- Automatic token refresh

### Custom Hooks
- **useCurrentUser**: Get current logged-in user
- **useLogout**: Handle logout functionality
- **useRSVP**: Manage event RSVP operations

### Contexts
- **SidebarContext**: Manage sidebar state for responsive design
- **SocietyContext**: Share society data across components

## 📝 Development Workflow

### Adding a New Feature

1. **Backend**:
   - Create/update model in `server/models/`
   - Add controller logic in `server/controllers/`
   - Define routes in `server/routes/`
   - Add middleware if needed

2. **Frontend**:
   - Create component in `client/src/components/` or `client/src/pages/`
   - Add API calls in `client/src/api/`
   - Update Redux slices if needed in `client/src/features/`
   - Add routes in `App.js`

### Code Style
- Use ES6+ syntax
- Follow React best practices (hooks, functional components)
- Use async/await for asynchronous operations
- Implement proper error handling
- Add meaningful comments

## 🧪 Testing

```bash
# Run client tests
cd client
npm test

# Run server tests (when implemented)
cd server
npm test
```

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure the frontend URL is added to CORS configuration in `server.js`
- Check that `withCredentials: true` is set in Axios requests

**MongoDB Connection Fails:**
- Verify MongoDB is running (local) or credentials are correct (Atlas)
- Check `MONGO_URI` in `.env` file

**Images Not Uploading:**
- Verify Cloudinary credentials in `.env`
- Check file size limits (current: 10mb)

**JWT Token Issues:**
- Clear browser cookies
- Check `JWT_SECRET` is set in `.env`
- Verify token expiration settings

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder
3. Update API base URL in axios configuration

### Backend Deployment (Heroku/Railway/Render)
1. Ensure all environment variables are set
2. Update CORS origin to production frontend URL
3. Deploy from `server` directory

### Database
- Use MongoDB Atlas for production database
- Update `MONGO_URI` with production connection string

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Maryam

## 🙏 Acknowledgments

- React documentation and community
- Express.js team
- MongoDB documentation
- All contributors and supporters

## 📧 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Event Managing! 🎉**