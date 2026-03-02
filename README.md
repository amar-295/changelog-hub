# 🚀 ChangelogHub

> **Changelog management platform with JWT authentication, workspace isolation, auto-slug generation, and RESTful APIs. Built with Express & MongoDB.**

**Transform the way you communicate product updates.** ChangelogHub is a developer-friendly platform designed to help teams publish and manage their product changelogs seamlessly. Built with a focus on **security**, **scalability**, and **clean architecture**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

ChangelogHub is a full-stack changelog management platform that simplifies how teams communicate product updates to their users. Whether you're launching new features, fixing bugs, or improving your product, ChangelogHub provides a centralized, easy-to-use platform with:

- **Secure Authentication** using JWT tokens with refresh token rotation
- **Multi-Tenant Support** with workspace isolation
- **Professional Changelog Management** with versioning and status tracking
- **Auto-Generated SEO-Friendly URLs** using intelligent slug generation
- **RESTful API** for seamless integration
- **Modern Frontend** built with React and Vite

---

## ✨ Key Features

### 🔐 Authentication & Security

- **User Registration** with secure password hashing (bcryptjs)
- **JWT-Based Authentication** with access and refresh tokens
- **Refresh Token Rotation** for enhanced security
- **HttpOnly Cookies** for secure token storage
- **Automatic Workspace Creation** on user signup
- **Protected Routes** with middleware-based JWT verification
- **Secure Logout** with token invalidation

### 📊 Multi-Tenant Architecture

- **Workspace Isolation** - Each user gets an isolated workspace
- **Automatic Workspace Assignment** - Every new user creates a default workspace
- **Multi-User Support** - Multiple users can be part of the same workspace
- **Role-Based Access** - Owner and contributor roles for workspace members

### 📝 Release Management

- **Create Releases** with title, content, version, and category
- **Auto-Slug Generation** - SEO-friendly URLs generated from titles using Slugify
- **Draft & Publish Workflow** - Save as drafts before publishing
- **Full CRUD Operations** - Create, read, update, delete releases
- **Release Categories** - Feature, improvement, bugfix, security, other
- **Versioning Support** - Semantic versioning for releases
- **Rich Publishing** - Timestamps and publication tracking

### 🔍 Advanced Filtering & Search

- **Pagination Support** - Configurable page size (1-50 results per page)
- **Status Filtering** - Filter by draft, published, or archived
- **Category Filtering** - Filter by release type
- **Full-Text Search** - Search releases by title
- **Sorted Results** - Newest first by default
- **Input Validation** - Sanitized search to prevent injection attacks

### 🎨 Modern Frontend

- **React 19** with latest features and hooks
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** for beautiful, responsive UI
- **TipTap Editor** for rich text content editing
- **Lucide Icons** for consistent iconography
- **React Router** for seamless navigation
- **Axios** for API communication
- **React Hot Toast** for user notifications

---

## 🛠️ Tech Stack

### Backend

| Technology                    | Purpose                                   |
| ----------------------------- | ----------------------------------------- |
| **Node.js**                   | JavaScript runtime environment            |
| **Express.js** (v5.2.1)       | Fast, unopinionated web framework         |
| **MongoDB**                   | NoSQL database for flexible data modeling |
| **Mongoose** (v9.2.1)         | ODM for MongoDB with schema validation    |
| **JWT** (jsonwebtoken v9.0.3) | Secure stateless authentication           |
| **Bcryptjs** (v3.0.3)         | Password hashing and verification         |
| **Slugify** (v1.6.6)          | URL-safe slug generation                  |
| **Cloudinary** (v2.9.0)       | Cloud image/file storage                  |
| **Multer** (v2.0.2)           | File upload handling                      |
| **CORS** (v2.8.6)             | Cross-origin resource sharing             |
| **Cookie Parser** (v1.4.7)    | HTTP cookie parsing                       |
| **Dotenv** (v17.3.1)          | Environment configuration                 |

### Frontend

| Technology                     | Purpose                     |
| ------------------------------ | --------------------------- |
| **React** (v19.2.0)            | Modern UI library           |
| **Vite** (v7.3.1)              | Fast bundler and dev server |
| **React Router DOM** (v7.13.0) | Client-side routing         |
| **Tailwind CSS** (v4.2.0)      | Utility-first CSS framework |
| **TipTap** (v3.20.0)           | Advanced rich text editor   |
| **Lucide React** (v0.575.0)    | Icon library                |
| **Axios** (v1.13.5)            | HTTP client                 |
| **React Hot Toast** (v2.6.0)   | Toast notifications         |

### Development Tools

| Tool         | Purpose                         |
| ------------ | ------------------------------- |
| **Nodemon**  | Auto-restart during development |
| **Prettier** | Code formatting                 |
| **ESLint**   | Code linting and quality        |

---

## 📁 Project Structure

```
changelog-hub/
├── backend/                          # Express.js backend
│   ├── src/
│   │   ├── app.js                   # Express app configuration
│   │   ├── server.js                # Server entry point
│   │   ├── constant.js              # Application constants
│   │   ├── controllers/             # Request handlers (auth, releases, etc.)
│   │   ├── models/                  # MongoDB schemas (User, Workspace, Release)
│   │   ├── routes/                  # API route definitions
│   │   │   ├── user.routes.js      # Authentication endpoints
│   │   │   ├── release.routes.js   # Release management endpoints
│   │   │   ├── public.routes.js    # Public endpoints
│   │   │   └── subscriber.routes.js # Subscriber management
│   │   ├── middlewares/             # Custom middleware (auth, validation)
│   │   ├── db/                      # Database connection
│   │   └── utils/                   # Utility functions & helpers
│   ├── package.json
│   ├── .env.example
│   └── .prettierrc
│
├── frontend/                         # React + Vite frontend
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   ├── pages/                   # Page components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API service layer
│   │   ├── stores/                  # State management
│   │   ├── styles/                  # Global styles
│   │   ├── utils/                   # Utility functions
│   │   └── App.jsx                  # Main app component
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── tailwind.config.js
│
├── docs/                            # Documentation
├── .gitignore
├── LICENSE
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/amar-295/changelog-hub.git
cd changelog-hub
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Configure environment variables (see Configuration section below)
nano .env

# Start development server
npm run dev

# Or start production server
npm start
```

#### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server with Vite
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

#### 4. Access the Application

- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/`

---

## 🔌 API Reference

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### 1. **Register User**

```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**

```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "owner",
    "workspaceId": "507f1f77bcf86cd799439012",
    "createdAt": "2026-03-01T10:30:00Z",
    "updatedAt": "2026-03-01T10:30:00Z"
  },
  "message": "User registered successfully",
  "success": true
}
```

---

#### 2. **User Login**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "workspaceId": "507f1f77bcf86cd799439012",
      "lastLoginAt": "2026-03-01T10:35:00Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

**Note:** Tokens are automatically set in httpOnly cookies for security.

---

#### 3. **Refresh Access Token**

```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Access token refreshed successfully",
  "success": true
}
```

---

#### 4. **Logout**

```http
POST /auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully",
  "success": true
}
```

---

### Release Management Endpoints

#### 5. **Create Release** 🔒

```http
POST /releases
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Dark Mode Support",
  "content": "Added dark mode toggle to the dashboard for better accessibility",
  "version": "v2.1.0",
  "category": "feature"
}
```

**Response (201 Created):**

```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "title": "Dark Mode Support",
    "slug": "dark-mode-support",
    "content": "Added dark mode toggle to the dashboard for better accessibility",
    "version": "v2.1.0",
    "category": "feature",
    "status": "draft",
    "workspaceId": "507f1f77bcf86cd799439012",
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2026-03-01T10:40:00Z",
    "updatedAt": "2026-03-01T10:40:00Z"
  },
  "message": "Release created successfully",
  "success": true
}
```

**Note:** Slug is auto-generated from the title using Slugify pre-save hook.

---

#### 6. **Get All Releases** 🔒

```http
GET /releases?page=1&limit=10&status=draft&category=feature&search=dark
Authorization: Bearer {accessToken}
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number (min: 1) |
| `limit` | number | 10 | Results per page (max: 50) |
| `status` | string | — | Filter: `draft`, `published`, `archived` |
| `category` | string | — | Filter: `feature`, `improvement`, `bugfix`, `security`, `other` |
| `search` | string | — | Search by title (case-insensitive) |

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {
    "releases": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "title": "Dark Mode Support",
        "slug": "dark-mode-support",
        "content": "Added dark mode toggle...",
        "version": "v2.1.0",
        "category": "feature",
        "status": "draft",
        "createdAt": "2026-03-01T10:40:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalReleases": 1,
      "limit": 10
    }
  },
  "message": "Releases fetched successfully",
  "success": true
}
```

**Security Notes:**

- Search input is sanitized to prevent regex injection
- Invalid status/category values return `400 Bad Request`
- Limit is capped at 50 to prevent database overload

---

#### 7. **Get Single Release** 🔒

```http
GET /releases/{releaseId}
Authorization: Bearer {accessToken}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "title": "Dark Mode Support",
    "slug": "dark-mode-support",
    "content": "Added dark mode toggle to the dashboard...",
    "version": "v2.1.0",
    "category": "feature",
    "status": "draft",
    "workspaceId": "507f1f77bcf86cd799439012",
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2026-03-01T10:40:00Z",
    "updatedAt": "2026-03-01T10:40:00Z"
  },
  "message": "Release fetched successfully",
  "success": true
}
```

---

#### 8. **Update Release** 🔒

```http
PATCH /releases/{releaseId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Dark Mode & Light Mode Support",
  "content": "Updated content",
  "version": "v2.1.1",
  "category": "improvement"
}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "title": "Dark Mode & Light Mode Support",
    "slug": "dark-mode-light-mode-support",
    "version": "v2.1.1",
    "category": "improvement"
  },
  "message": "Release updated successfully",
  "success": true
}
```

**Note:** If title changes, slug is automatically regenerated.

---

#### 9. **Delete Release** 🔒

```http
DELETE /releases/{releaseId}
Authorization: Bearer {accessToken}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Release deleted successfully",
  "success": true
}
```

---

#### 10. **Publish Release** 🔒

```http
PATCH /releases/{releaseId}/publish
Authorization: Bearer {accessToken}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {
    "status": "published",
    "publishedAt": "2026-03-01T10:45:00Z"
  },
  "message": "Release published successfully",
  "success": true
}
```

---

### Subscriber Management Endpoints

#### 11. **Get All Subscribers** 🔒

```http
GET /subscribers?page=1&limit=50&status=active
Authorization: Bearer {accessToken}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {
    "subscribers": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "total": 5,
      "limit": 50
    }
  },
  "message": "Subscribers fetched successfully",
  "success": true
}
```

---

#### 12. **Delete Subscriber** 🔒

```http
DELETE /subscribers/{subscriberId}
Authorization: Bearer {accessToken}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Subscriber deleted successfully",
  "success": true
}
```

---

## 🔐 Authentication

### How Authentication Works

1. **User Registration**
   - Password is hashed using bcryptjs with salt rounds
   - User document is created in MongoDB
   - Automatic workspace creation for the user

2. **Login**
   - User credentials are validated against stored hash
   - JWT tokens are generated (access + refresh)
   - Tokens are set in httpOnly cookies for XSS protection

3. **Access Control**
   - Protected routes check Authorization header for Bearer token
   - JWT middleware verifies token signature and expiry
   - Invalid/expired tokens return 401 Unauthorized

4. **Token Refresh**
   - Access token expires in 15 minutes (default)
   - Refresh token allows obtaining new access tokens
   - Refresh token rotation improves security

5. **Logout**
   - Refresh token is invalidated in database
   - Cookies are cleared on client
   - Subsequent requests with old tokens will fail

### JWT Token Structure

**Access Token Payload:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "iat": 1704110400,
  "exp": 1704111300
}
```

**Refresh Token Payload:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "iat": 1704110400,
  "exp": 1704196800
}
```

---

## 💾 Database Models

### User Model

```javascript
{
  username: String,           // Unique username
  email: String,              // Unique email
  fullName: String,           // User's full name
  password: String,           // Hashed password (select: false)
  role: String,               // 'owner' or 'contributor'
  workspaceId: ObjectId,      // Reference to workspace
  avatar: String,             // Optional profile picture URL
  lastLoginAt: Date,          // Last login timestamp
  isActive: Boolean,          // Account status
  createdAt: Date,            // Creation timestamp
  updatedAt: Date             // Last update timestamp
}
```

### Workspace Model

```javascript
{
  name: String,               // Workspace name
  slug: String,               // Unique subdomain slug
  description: String,        // Workspace description
  logo: String,               // Workspace logo URL
  owner: ObjectId,            // Owner user reference
  members: [ObjectId],        // Array of member user references
  isActive: Boolean,          // Workspace status
  settings: {
    theme: String,            // 'light' or 'dark'
    language: String,         // Default language
    timezone: String          // Workspace timezone
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Release Model

```javascript
{
  title: String,              // Release title (required)
  slug: String,               // Auto-generated SEO slug
  content: String,            // Rich text content (required)
  version: String,            // Semantic version (optional)
  category: String,           // 'feature', 'improvement', 'bugfix', 'security', 'other'
  status: String,             // 'draft', 'published', 'archived'
  workspaceId: ObjectId,      // Reference to workspace
  createdBy: ObjectId,        // User who created the release
  publishedAt: Date,          // Publication timestamp
  createdAt: Date,            // Creation timestamp
  updatedAt: Date             // Last update timestamp
}
```

### Subscriber Model

```javascript
{
  email: String,              // Subscriber email (unique per workspace)
  workspaceId: ObjectId,      // Reference to workspace
  status: String,             // 'active' or 'unsubscribed'
  unsubscribeToken: String,    // Unique token for one-click unsubscribe
  subscribedAt: Date,         // Timestamp of subscription
  unsubscribedAt: Date,       // Timestamp of unsubscription
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/changelog-hub

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT Secrets (use strong, random values in production)
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_32_chars_min
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_32_chars_min
REFRESH_TOKEN_EXPIRY=7d

# File Upload
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
```

### Development vs Production

**Development:**

- Hot reload enabled
- Debug logging enabled
- CORS allows all origins (configure for security)

**Production:**

- Minified code
- Optimized database queries
- Strict CORS configuration
- Security headers enabled

---

## 👨‍💻 Development

### Running the Project

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Code Style

The project uses **Prettier** for code formatting and **ESLint** for linting.

**Format code:**

```bash
# Backend
cd backend && npx prettier --write .

# Frontend
cd frontend && npm run lint
```

### File Upload Handling

Files are uploaded using **Multer** and stored in **Cloudinary**:

1. User uploads file via POST request
2. Multer validates and stores temporarily
3. Cloudinary integration processes the file
4. URL is returned and stored in database

---

## 🌟 Key Features Deep Dive

### Auto-Slug Generation

Slugs are automatically generated from titles using the **Slugify** library:

```javascript
// Title: "Dark Mode Support!"
// Generated Slug: "dark-mode-support"
// Handles:
// - Special characters
// - Accented characters (é, ñ, etc.)
// - Multiple spaces
// - Case conversion
```

### Workspace Isolation

Each workspace is completely isolated:

- Users can only access releases in their workspace
- Each workspace has independent members and settings
- Subdomains can be configured per workspace

### Pagination & Performance

Database queries are optimized:

- Limit clamping prevents overload (max 50)
- Results are indexed by creation date
- Efficient filtering with MongoDB queries

---

## 📚 Additional Resources

- **API Documentation**: [API Reference](#api-reference)
- **Authentication Guide**: [Authentication](#authentication)
- **Database Schema**: [Database Models](#database-models)
- **Environment Setup**: [Configuration](#configuration)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Follow the existing code style
- Write meaningful commit messages
- Test your changes before submitting PR
- Update documentation as needed

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Amarnath Sharma**

- 🔗 [LinkedIn](https://www.linkedin.com/in/amarnath-webdev)
- 🐙 [GitHub](https://github.com/amar-295)
- 📧 [Email](mailto:amarnath@example.com)

---

## 🙏 Support

If you find this project helpful, please consider:

- Starring the repository ⭐
- Sharing it with others
- Reporting issues and bugs
- Contributing improvements

---

## 📈 Roadmap

### Upcoming Features

- [ ] Email notifications for subscribers
- [ ] Changelog RSS feed
- [ ] Public changelog pages
- [ ] Release scheduling
- [ ] Changelog analytics & metrics
- [ ] Webhook integrations (Slack, Discord, Teams)
- [ ] Changelog templates
- [ ] Multi-language support
- [ ] Dark mode for frontend
- [ ] Mobile app

---

**Last Updated:** March 1, 2026

**© 2026 Amarnath Sharma. All Rights Reserved.**
