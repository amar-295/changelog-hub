# 🚀 ChangelogHub

> **Current Status:** 🚧 **Active Development** (Backend Infrastructure & Core Models Phase)

**Transform the way you communicate product updates.**

ChangelogHub is a developer-friendly platform designed to help teams publish and manage their product changelogs. Built with a focus on **clean architecture**, **security**, and **performance**.

---

## ✅ Key Features (Implementation Status)

### 🏗️ Core Infrastructure
- [x] **Project Setup:** Node.js, Express.js, MongoDB connection
- [x] **MVC Architecture:** Organized folder structure (Controllers, Models, Routes)
- [x] **Async Handling:** Standardized error handling wrapper (`asyncHandler`)
- [x] **Standardized API Responses:** Custom `ApiResponse` and `ApiError` classes

### 🔐 Security & Auth
- [x] **User Registration:** Secure signup with password hashing (bcrypt)
- [x] **Automatic Workspace Creation:** Every new user gets a default workspace on signup
- [x] **User Authentication:** JWT-based Login with Access & Refresh Tokens
- [x] **Refresh Token Rotation:** Secure session management with token rotation
- [x] **Protected Routes:** Middleware to verify JWTs
- [x] **Secure Cookies:** `httpOnly` cookies for token storage
- [x] **Logout:** Securely invalidates sessions by clearing refresh tokens (`$unset`)

### 📊 Data & Models
- [x] **User Model:** Schema with secure field selection (`select: false`)
- [x] **Workspace Model:** Multi-tenant support with unique subdomains
- [x] **Release Model:** Changelog versioning, draft/publish states, and professional slug generation using `slugify`

### 📝 Release Management
- [x] **Create Release:** POST endpoint with auto-slug generation via pre-save hook
- [x] **Get All Releases:** Paginated listing with filtering, search, and input validation
- [ ] **Get Single Release:** Fetch release by slug
- [ ] **Update Release:** Edit release details
- [ ] **Delete Release:** Remove a release

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | Node.js | JavaScript runtime built on Chrome's V8 engine |
| **Framework** | Express.js | Fast, unopinionated web framework for Node.js |
| **Database** | MongoDB + Mongoose | NoSQL database for flexible data modeling |
| **Authentication** | JWT + Bcrypt | JSON Web Tokens for stateless auth & secure password hashing |
| **Slug Generation** | Slugify | Professional URL-safe slug generation handling symbols/accents |
| **File Storage** | Cloudinary + Multer | Cloud storage for images and media |

---

## 🔌 API Reference

### **1. User Registration**
**Endpoint:** `POST /api/v1/users/register`

**Body (JSON):**
- `username` (String, Required)
- `email` (String, Required)
- `fullName` (String, Required)
- `password` (String, Required)

**Success Response:** (201 Created)
```json
{
  "statusCode": 201,
  "data": {
    "_id": "65b...",
    "username": "exampleUser123",
    "email": "user@example.com",
    "fullName": "Example User",
    "role": "owner",
    "workspaceId": "65c...",
    "createdAt": "2026-02-20T...",
    "updatedAt": "2026-02-20T..."
  },
  "message": "User registered successfully",
  "success": true
}
```

### **2. User Login**
**Endpoint:** `POST /api/v1/users/login`

**Body (JSON):**
- `email` (String, Optional*)
- `username` (String, Optional*)
- `password` (String, Required)
*At least one of email or username is required.

**Success Response:** (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "65b...",
      "username": "exampleUser123",
      "email": "user@example.com",
      "fullName": "Example User",
      "workspaceId": "65c...",
      "lastLoginAt": "2026-02-20T..."
    },
    "accessToken": "eyJh...",
    "refreshToken": "eyJh..."
  },
  "message": "User logged in successfully",
  "success": true
}
```
*Note: Tokens are also set in `httpOnly` cookies.*

### **3. Refresh Access Token**
**Endpoint:** `POST /api/v1/users/refresh-token`

**Body (JSON / Cookie):**
- `refreshToken` (String)

**Success Response:** (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "eyJh...",
    "refreshToken": "eyJh..."
  },
  "message": "Access token refreshed successfully",
  "success": true
}
```

### **4. User Logout**
**Endpoint:** `POST /api/v1/users/logout`

**Headers:**
- `Authorization`: `Bearer <accessToken>`

**Success Response:** (200 OK)
```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully",
  "success": true
}
```

### **5. Create Release** 🔒
**Endpoint:** `POST /api/v1/releases/`

**Headers:**
- `Authorization`: `Bearer <accessToken>`

**Body (JSON):**
- `title` (String, Required)
- `content` (String, Required)
- `version` (String, Optional)
- `category` (String, Optional — `feature`, `improvement`, `bugfix`, `security`, `other`)

**Success Response:** (201 Created)
```json
{
  "statusCode": 201,
  "data": {
    "_id": "699...",
    "title": "Dark Mode Support",
    "slug": "dark-mode-support",
    "content": "Added dark mode toggle to the dashboard",
    "version": "v1.0.0",
    "category": "feature",
    "status": "draft",
    "workspaceId": "65c...",
    "createdBy": "65b...",
    "createdAt": "2026-02-20T..."
  },
  "message": "Release created successfully",
  "success": true
}
```
*Note: `slug` is auto-generated from the title via a pre-save hook using `slugify`.*

### **6. Get All Releases** 🔒
**Endpoint:** `GET /api/v1/releases/`

**Headers:**
- `Authorization`: `Bearer <accessToken>`

**Query Parameters (all optional):**
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | Number | `1` | Page number (min: 1) |
| `limit` | Number | `10` | Results per page (min: 1, max: 50) |
| `status` | String | — | Filter by status (`draft`, `published`, `archived`) |
| `category` | String | — | Filter by category (`feature`, `improvement`, `bugfix`, `security`, `other`) |
| `search` | String | — | Search releases by title (case-insensitive) |

**Example:** `GET /api/v1/releases?page=1&limit=5&status=draft&search=dark`

**Success Response:** (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "releases": [
      {
        "_id": "699...",
        "title": "Dark Mode Support",
        "slug": "dark-mode-support",
        "content": "Added dark mode toggle",
        "version": "v1.0.0",
        "category": "feature",
        "status": "draft",
        "createdAt": "2026-02-21T..."
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalReleases": 1,
      "limit": 5
    }
  },
  "message": "Releases fetched successfully",
  "success": true
}
```
*Notes:*
- *Results are sorted by newest first (`createdAt: -1`).*
- *Search input is sanitized against regex injection.*
- *Invalid `status` or `category` values return `400 Bad Request`.*

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net
CORS_ORIGIN=*

# JWT Secrets
ACCESS_TOKEN_SECRET=your_32_or_64_char_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_another_secret
REFRESH_TOKEN_EXPIRY=1d
```

---

## 👨‍💻 Author

**Amarnath**
- [LinkedIn](https://www.linkedin.com/in/amarnath-webdev)
- [GitHub](https://github.com/amar-295)

---

**© 2026 Amarnath Sharma. All Rights Reserved.**
