# ChangelogHub - Step-by-Step Working Guide (No Code)
## Build Everything From Scratch - Learn By Doing

**Philosophy:** You will figure out the code yourself. This guide tells you WHAT to build and HOW to approach it, but YOU write every line of code.

**Why this approach?**
- ✅ You'll actually understand what you're building
- ✅ You'll learn to read documentation
- ✅ You'll develop problem-solving skills
- ✅ You'll remember everything better
- ✅ You'll be able to explain it in interviews

---

## 🎯 WEEK 1: Node.js & Express Fundamentals

### Day 1: Environment Setup & First Server

#### Task 1.1: Install Required Software
**What to do:**
1. Download and install Node.js (version 18 or higher)
2. Verify installation by opening terminal and checking version
3. Install VS Code (or your preferred editor)
4. Install Git

**How to check it worked:**
- Open terminal/command prompt
- Type commands to check Node.js version
- Type commands to check npm version
- Both should show version numbers

**If stuck:** Google "how to install Node.js on [your operating system]"

---

#### Task 1.2: Create Project Folder
**What to do:**
1. Decide where you want your project (Desktop, Documents, etc.)
2. Create a new folder called "changelog-hub"
3. Open this folder in VS Code
4. Open the integrated terminal in VS Code

**How to check it worked:**
- You should see the folder name in VS Code's explorer
- Terminal should show you're inside that folder
- Try creating a test file to make sure you can write files

**Questions to answer yourself:**
- What is the current working directory?
- How do I navigate folders in terminal?

---

#### Task 1.3: Initialize Node.js Project
**What to do:**
1. In terminal, initialize a new npm project
2. Answer the questions (or use defaults)
3. Check that a package.json file was created

**What to research:**
- "How to initialize npm project"
- "What is package.json"
- Look at the official npm documentation

**How to check it worked:**
- You have a package.json file
- The file contains project information
- You understand what package.json does

**Don't move forward until:** You can explain what package.json is for

---

#### Task 1.4: Install Express
**What to do:**
1. Research: What is Express.js?
2. Install Express as a dependency
3. Install dotenv as a dependency
4. Check package.json to see they were added

**What to research:**
- "What is Express.js used for"
- "npm install command"
- "What is dotenv npm package"

**How to check it worked:**
- Express and dotenv appear in package.json under "dependencies"
- A node_modules folder was created (big folder, don't open it)
- package-lock.json file was created

**Understanding check:**
- What does Express do?
- Why do we need dotenv?
- What is node_modules folder?

---

#### Task 1.5: Create Your First Server File
**What to do:**
1. Create a new file called "server.js" in your project root
2. At the top, import Express (research the syntax)
3. Import dotenv and configure it
4. Create an Express application instance
5. Define the port number (use 5000 or get from environment variable)
6. Create a simple route that responds to GET requests at the root path
7. Make the server listen on your port
8. Add a console log to show server is running

**What to research:**
- "How to import modules in Node.js"
- "Express basic setup"
- "How to create Express route"
- "Express listen method"

**Don't copy code!** Read examples and understand, then write your own.

**How to check it worked:**
- File has no red underlines (syntax errors)
- You can explain what each line does

---

#### Task 1.6: Test Your Server
**What to do:**
1. In terminal, run your server file
2. Check the console - do you see your "server running" message?
3. Open a web browser
4. Go to localhost:5000 (or whatever port you used)
5. You should see a response from your server

**What to research:**
- "How to run Node.js file"
- "What is localhost"

**How to check it worked:**
- Server starts without errors
- Console shows your message
- Browser shows your response
- Server keeps running (doesn't exit immediately)

**If it doesn't work:**
- Read the error message carefully
- Google the exact error
- Check spelling of all your code
- Make sure you imported Express correctly

**Celebration checkpoint:** You just created a web server! 🎉

---

### Day 2: Understanding Middleware & Routes

#### Task 2.1: Install Nodemon (Development Tool)
**What to do:**
1. Research: What is nodemon and why use it?
2. Install nodemon as a dev dependency (not regular dependency)
3. Add a script to package.json that runs server.js with nodemon

**What to research:**
- "What is nodemon"
- "npm install dev dependency"
- "package.json scripts"

**How to check it worked:**
- Nodemon appears in package.json under "devDependencies"
- You have a "dev" script in package.json
- Running the script starts your server
- When you edit server.js and save, server restarts automatically

**Understanding check:**
- What's the difference between dependency and devDependency?
- Why use nodemon instead of running node directly?

---

#### Task 2.2: Add Middleware to Parse JSON
**What to do:**
1. Research: What is middleware in Express?
2. Research: Why do we need to parse JSON in Express?
3. Add built-in Express middleware to parse JSON from request bodies
4. Test it by creating a POST route that receives JSON data

**What to research:**
- "Express middleware concept"
- "Express JSON middleware"
- "How to create POST route in Express"
- "What is req.body in Express"

**How to check it worked:**
- Server still runs without errors
- You can explain what middleware does
- You understand the order of middleware matters

**Don't move forward until:** You understand what middleware is

---

#### Task 2.3: Create Multiple Routes
**What to do:**
1. Create 5 different routes:
   - GET route at root path "/"
   - GET route at "/api/hello"
   - GET route with URL parameter "/api/user/:name"
   - POST route at "/api/data"
   - GET route that doesn't exist (will be 404)

**What to research:**
- "Express route parameters"
- "Express GET vs POST"
- "How to access route parameters"
- "How to access request body"

**For the parameter route:** Make it respond with the name from the URL

**For the POST route:** Make it respond with the data sent in the request body

**How to check it worked:**
- Test each route in your browser (GET routes)
- Use a tool to test POST route (we'll set this up next)

---

#### Task 2.4: Install and Use Postman
**What to do:**
1. Download and install Postman (free tool)
2. Learn how to make GET requests in Postman
3. Learn how to make POST requests with JSON body
4. Test all your routes with Postman
5. Save your requests in a collection

**What to research:**
- "What is Postman"
- "How to use Postman for API testing"
- "How to send JSON in Postman"

**Test each route:**
- GET / → should work
- GET /api/hello → should work
- GET /api/user/John → should respond with John
- POST /api/data with JSON body → should respond with the data
- GET /randompath → should give 404

**Understanding check:**
- Why can't we test POST routes in the browser?
- What does status code 200 mean?
- What does status code 404 mean?

---

### Day 3: Environment Variables & Project Structure

#### Task 3.1: Create .env File
**What to do:**
1. Copy the .env.example file you downloaded earlier
2. Rename the copy to ".env" (just .env, no .example)
3. Add your actual values:
   - NODE_ENV=development
   - PORT=5000
   - Add a test variable like API_KEY=test123

**What to research:**
- "What are environment variables"
- "Why use .env files"
- "dotenv npm package documentation"

**How to check it worked:**
- You have a .env file (might be hidden in file explorer)
- File contains your variables
- You understand why these are NOT committed to Git

**Critical understanding:**
- Why should .env NEVER be committed to Git?
- What could happen if you commit API keys?

---

#### Task 3.2: Use Environment Variables
**What to do:**
1. Modify your server.js to use PORT from environment variables
2. Add a route that uses your test API_KEY variable
3. Research: How to access environment variables in Node.js

**What to research:**
- "process.env in Node.js"
- "How to use dotenv variables"

**How to check it worked:**
- Change PORT in .env to 3000, server should now run on 3000
- Your route can access the API_KEY value
- Server crashes if .env file is missing (good! means it's being used)

---

#### Task 3.3: Create Project Folder Structure
**What to do:**
1. Inside your project, create these folders:
   - config/
   - models/
   - routes/
   - controllers/
   - middleware/

2. Don't put anything in them yet, just create the folders

**What to research:**
- "Node.js project structure best practices"
- "MVC pattern"

**Understanding check:**
- What will go in each folder?
- Why organize code into folders?
- What is separation of concerns?

---

### Day 4: MongoDB Setup & Connection

#### Task 4.1: Install MongoDB
**What to do:**
Choose ONE option:
- **Option A:** Install MongoDB locally on your computer
- **Option B:** Create free MongoDB Atlas cloud account

I recommend Option B (Atlas) for beginners - it's easier.

**If choosing Option A (Local):**
1. Download MongoDB Community Edition
2. Install following official instructions
3. Start MongoDB service
4. Verify it's running

**If choosing Option B (Atlas):**
1. Go to MongoDB Atlas website
2. Create free account
3. Create a free cluster (M0)
4. Create a database user
5. Whitelist your IP address
6. Get your connection string

**What to research:**
- "MongoDB Atlas free tier setup"
- "MongoDB connection string"

**How to check it worked:**
- You can connect to your database (we'll test this next)
- You have a connection string saved

---

#### Task 4.2: Install Mongoose
**What to do:**
1. Research: What is Mongoose?
2. Research: What is an ODM?
3. Install mongoose package
4. Check it was added to package.json

**What to research:**
- "What is Mongoose ODM"
- "Mongoose vs native MongoDB driver"

**Understanding check:**
- What problem does Mongoose solve?
- What is a schema?
- What is a model?

---

#### Task 4.3: Create Database Connection File
**What to do:**
1. In the config/ folder, create a file called "database.js"
2. Import mongoose
3. Create a function that connects to MongoDB
4. Use your connection string from .env
5. Handle connection success with a console log
6. Handle connection errors with a console log
7. Export this function

**What to research:**
- "Mongoose connect method"
- "MongoDB connection string"
- "JavaScript async functions"
- "How to export functions in Node.js"

**Don't copy code!** Read the Mongoose documentation and write it yourself.

**How to check it worked:**
- File has no syntax errors
- You understand what the function does
- You can explain async/await

---

#### Task 4.4: Connect to Database from Server
**What to do:**
1. In server.js, import your database connection function
2. Call the function to connect to MongoDB
3. Run your server
4. Check console - does it say connected?

**What to research:**
- "How to import custom modules in Node.js"
- "Calling async functions"

**How to check it worked:**
- Server starts
- Console shows "MongoDB connected" (or similar message)
- No error messages
- Server stays running

**If it doesn't work:**
- Check your connection string in .env
- Make sure you replaced password placeholder
- Check MongoDB Atlas network access (whitelist IP)
- Read the error message carefully

**Celebration checkpoint:** You're connected to a database! 🎉

---

## 🗓️ WEEK 2: Mongoose Models & Schemas

### Day 1: Understanding Schemas and Creating First Model

#### Task 1.1: Learn About Mongoose Schemas
**What to do:**
1. Read Mongoose documentation about schemas
2. Understand what schema validation is
3. Learn about schema types (String, Number, Boolean, Date, ObjectId)
4. Learn about schema options (required, unique, default)

**What to research:**
- "Mongoose schema guide"
- "Mongoose schema types"
- "Mongoose schema validation"

**Questions to answer:**
- What is a schema?
- Why do we need schemas in MongoDB?
- What happens if data doesn't match schema?

**Don't code yet!** Just read and understand.

---

#### Task 1.2: Plan Your User Schema
**What to do:**
1. Get a piece of paper or open a text file
2. Write down what fields a User should have:
   - What do we need for authentication?
   - What information about the user?
   - What links to other data?

3. For each field, decide:
   - Data type (String, Number, etc.)
   - Is it required?
   - Should it be unique?
   - Default value?

**Expected fields to think about:**
- email
- password (we'll hash this later)
- name
- workspaceId (link to their company)
- role (owner, admin, editor)
- timestamps (when created/updated)

**Don't code yet!** Planning first is important.

---

#### Task 1.3: Create User Model File
**What to do:**
1. In models/ folder, create "User.js"
2. Import mongoose at the top
3. Create a schema using mongoose.Schema
4. Define each field with its type and constraints
5. Add schema options for timestamps
6. Create the model from the schema
7. Export the model

**What to research:**
- "Mongoose create schema"
- "Mongoose schema timestamps"
- "Mongoose create model"

**Important validations to add:**
- email should be required, unique, and lowercase
- passwordHash should be required
- name should be required

**How to check it worked:**
- File has no syntax errors
- You can explain what each field does
- You understand the difference between schema and model

---

#### Task 1.4: Test Your Model
**What to do:**
1. In server.js, import your User model
2. After database connection, try to create a test user
3. Use the model's create method
4. Log the result
5. Check MongoDB (Atlas UI or Compass) to see if user was created

**What to research:**
- "Mongoose create document"
- "MongoDB Compass" (GUI tool to view database)

**Data to create:**
- email: test@example.com
- passwordHash: just use "test123" for now (we'll hash properly later)
- name: Test User
- workspaceId: You can skip this for now

**How to check it worked:**
- Server runs without errors
- Console logs the created user
- User appears in your MongoDB database
- User has an _id field (auto-generated)

**If it doesn't work:**
- Read the error message
- Check validation errors
- Make sure database is connected
- Check spelling of field names

---

### Day 2: More Models and Relationships

#### Task 2.1: Create Workspace Model
**What to do:**
1. In models/ folder, create "Workspace.js"
2. Think: What fields does a workspace need?
   - Company/product name
   - Subdomain (for the changelog URL)
   - Subscription plan
   - Created date

3. Create the schema with:
   - name (String, required)
   - subdomain (String, required, unique, lowercase)
   - plan (String, enum with options: free, starter, pro, enterprise)
   - timestamps

4. Create and export the model

**What to research:**
- "Mongoose enum validation"
- "Mongoose unique constraint"

**How to check it worked:**
- Create a test workspace
- Check it appears in database
- Try creating duplicate subdomain (should fail)

---

#### Task 2.2: Update User Model with Workspace Reference
**What to do:**
1. Go back to User.js
2. Add a workspaceId field
3. Make it type ObjectId
4. Reference the Workspace model
5. Make it required

**What to research:**
- "Mongoose ObjectId type"
- "Mongoose ref and populate"
- "Mongoose relationships"

**Understanding check:**
- What is an ObjectId?
- What does ref do?
- What is populate? (research but don't use yet)

---

#### Task 2.3: Create Release Model
**What to do:**
1. Create models/Release.js
2. Think about what a changelog release needs:
   - Link to workspace
   - Title
   - Slug (URL-friendly version of title)
   - Content
   - Status (draft or published)
   - Publish date
   - Creator (user who made it)

3. Create the schema with appropriate types
4. Create and export the model

**Important fields:**
- workspaceId: ObjectId, ref Workspace, required
- title: String, required
- slug: String, required, lowercase
- content: String, required
- status: enum ['draft', 'published'], default 'draft'
- publishedAt: Date (not required, null for drafts)
- createdBy: ObjectId, ref User, required

**What to research:**
- "Mongoose default values"
- "Mongoose enum"

**How to check it worked:**
- Create a test release
- Check all fields saved correctly
- Verify default status is 'draft'

---

### Day 3: Understanding Indexes and Queries

#### Task 3.1: Add Indexes to Models
**What to do:**
1. Research: What are database indexes?
2. Research: Why use indexes?
3. In User.js, add index on email (already unique)
4. In Workspace.js, add index on subdomain (already unique)
5. In Release.js, add compound index on workspaceId + slug

**What to research:**
- "MongoDB indexes explained"
- "Mongoose schema indexes"
- "Compound index"

**For Release compound index:**
- Make slug unique PER workspace (not globally unique)
- Same slug can exist in different workspaces

**Understanding check:**
- What do indexes do?
- When should you add an index?
- What is the downside of too many indexes?

---

#### Task 3.2: Practice Basic Queries
**What to do:**
1. In server.js or a separate test file, practice these queries:
   - Find all users
   - Find user by email
   - Find all workspaces
   - Find workspace by subdomain
   - Find all releases for a specific workspace
   - Count documents

**What to research:**
- "Mongoose find method"
- "Mongoose findOne method"
- "Mongoose query filters"
- "Mongoose countDocuments"

**Write each query and test it:**
- Does it return what you expect?
- What if nothing matches?
- Can you find by _id?

**Don't move forward until:** You're comfortable with basic queries

---

### Day 4: Subscriber Model and Validation

#### Task 4.1: Create Subscriber Model
**What to do:**
1. Create models/Subscriber.js
2. Fields needed:
   - workspaceId (link to which changelog)
   - email (who subscribed)
   - verified (Boolean, did they verify email?)
   - unsubscribeToken (unique string for unsubscribe link)
   - timestamps

3. Add compound unique index: workspace + email
   - Same email can subscribe to different workspaces
   - But can't subscribe twice to same workspace

**What to research:**
- "MongoDB compound unique index"

**How to check it worked:**
- Create test subscriber
- Try creating duplicate for same workspace (should fail)
- Create same email for different workspace (should work)

---

#### Task 4.2: Generate Unsubscribe Tokens
**What to do:**
1. Research: How to generate random strings in Node.js
2. Use crypto module (built into Node.js)
3. Create a helper function to generate tokens
4. Test generating several tokens - all should be different

**What to research:**
- "Node.js crypto module"
- "Generate random string Node.js"
- "Crypto randomBytes"

**Where to put this:**
- Create utils/ folder if you haven't
- Create utils/helpers.js
- Write the token generator function
- Export it

**Test it works:**
- Import the function
- Generate 10 tokens
- All should be different
- Each should be long enough (32+ characters)

---

## 🗓️ WEEK 3: Authentication System

### Day 1: Password Hashing with Bcrypt

#### Task 1.1: Install and Understand Bcrypt
**What to do:**
1. Research: What is bcrypt?
2. Research: What is password hashing?
3. Research: Why not store passwords in plain text?
4. Install bcrypt package
5. Read bcrypt documentation

**What to research:**
- "What is password hashing"
- "bcrypt explained"
- "Salt rounds bcrypt"

**Questions to answer:**
- What is a hash?
- What is a salt?
- Can you reverse a hash?
- What are rounds/cost factor?

**Don't code yet!** Understand the concepts first.

---

#### Task 1.2: Create Password Hashing Function
**What to do:**
1. In utils/helpers.js, create a function to hash passwords
2. It should take a plain text password
3. Use bcrypt to hash it with 10 salt rounds
4. Return the hash
5. Make it async (bcrypt is async)

**What to research:**
- "Bcrypt hash password"
- "Async/await JavaScript"

**Test your function:**
- Hash the same password twice
- The hashes should be DIFFERENT (because of salt)
- Each hash should be long (60 characters)

---

#### Task 1.3: Create Password Comparison Function
**What to do:**
1. Create another function to compare passwords
2. It should take plain text password and a hash
3. Use bcrypt.compare
4. Return true if they match, false otherwise

**What to research:**
- "Bcrypt compare password"

**Test your function:**
- Hash a password
- Compare the original password with the hash (should be true)
- Compare wrong password with the hash (should be false)

**Understanding check:**
- Why do we need a special compare function?
- Why can't we just hash again and compare strings?

---

### Day 2: Registration Endpoint

#### Task 2.1: Create Auth Routes File
**What to do:**
1. In routes/ folder, create "authRoutes.js"
2. Import Express
3. Create a router using Express.Router()
4. Export the router
5. In server.js, import and use this router at "/api/auth"

**What to research:**
- "Express Router"
- "Express router middleware"
- "app.use for routes"

**How to check it worked:**
- Server still runs
- You understand how Router works
- Routes will be prefixed with /api/auth

---

#### Task 2.2: Create Auth Controller File
**What to do:**
1. In controllers/ folder, create "authController.js"
2. This will hold your registration and login logic
3. For now, just create an empty exported object
4. We'll add functions to it next

**Understanding check:**
- What is a controller?
- Why separate routes from controllers?
- What is separation of concerns?

---

#### Task 2.3: Build Registration Function
**What to do:**
1. In authController.js, create a register function
2. It should be async
3. It takes req and res parameters
4. Logic to implement:
   - Get email, name, password from req.body
   - Validate: all fields present?
   - Check if user already exists with that email
   - If exists, return error
   - Hash the password
   - Create new user with hashed password
   - Return success response with user data (don't send password!)
   - Handle any errors with try/catch

**What to research:**
- "Express request body"
- "Express response methods"
- "Try catch async await"
- "HTTP status codes"

**Status codes to use:**
- 201 for successful creation
- 400 for bad request (validation failed)
- 500 for server errors

**Don't copy code!** Think through the logic step by step.

---

#### Task 2.4: Create Registration Route
**What to do:**
1. In authRoutes.js, import your controller
2. Create POST route at "/register"
3. Connect it to your register function
4. Export the router

**What to research:**
- "Express POST route"
- "Express route handlers"

---

#### Task 2.5: Test Registration
**What to do:**
1. Start your server
2. Open Postman
3. Create POST request to http://localhost:5000/api/auth/register
4. Set Content-Type header to application/json
5. In body, send JSON with email, name, password
6. Send the request

**Tests to do:**
- Register a new user (should work)
- Try to register same email again (should fail)
- Try without email (should fail)
- Try without password (should fail)
- Check database - password should be hashed

**How to check it worked:**
- You get 201 status code
- User appears in database
- Password in database is hashed (not plain text)
- Response doesn't include password
- Error messages are clear

**Celebration checkpoint:** Users can register! 🎉

---

### Day 3: Login with JWT

#### Task 3.1: Install and Learn JWT
**What to do:**
1. Install jsonwebtoken package
2. Research: What is JWT?
3. Research: How does JWT authentication work?
4. Research: What are tokens used for?
5. Look at JWT.io website to see token structure

**What to research:**
- "JWT explained"
- "JWT vs sessions"
- "JWT structure"

**Questions to answer:**
- What are the 3 parts of a JWT?
- How is JWT different from sessions?
- Where do we store JWT on client?
- Can JWT be modified?

**Don't code yet!** Understand tokens first.

---

#### Task 3.2: Add JWT Secret to .env
**What to do:**
1. Generate a random secret string
2. You can use Node.js crypto module for this
3. Or use an online generator (for learning purposes)
4. Add JWT_SECRET to your .env file
5. Should be long and random (64+ characters)

**What to research:**
- "Generate secure random string"
- "JWT secret best practices"

**Understanding check:**
- Why does JWT need a secret?
- What happens if secret is leaked?
- Should secret be committed to Git? (NO!)

---

#### Task 3.3: Create Token Generation Function
**What to do:**
1. In utils/helpers.js, create function to generate JWT
2. It should take user data (userId)
3. Use jsonwebtoken.sign()
4. Include userId in payload
5. Use secret from environment variable
6. Set expiration (7 days)
7. Return the token

**What to research:**
- "jsonwebtoken sign"
- "JWT payload"
- "JWT expiration"

**Test your function:**
- Generate a token
- Copy the token
- Go to jwt.io
- Paste token to decode it
- Check the payload contains userId

---

#### Task 3.4: Build Login Function
**What to do:**
1. In authController.js, create login function
2. Logic to implement:
   - Get email and password from req.body
   - Validate both are present
   - Find user by email
   - If user doesn't exist, return error "Invalid credentials"
   - Compare password with hash using bcrypt
   - If passwords don't match, return "Invalid credentials"
   - If match, generate JWT token
   - Return token and user data (no password!)
   - Handle errors with try/catch

**What to research:**
- "API security best practices"
- "Why not say 'user not found' vs 'wrong password'"

**Security note:**
- Don't tell if email exists or password wrong
- Just say "Invalid credentials" for both
- Why? Prevents email enumeration attacks

**Status codes to use:**
- 200 for success
- 401 for unauthorized (wrong credentials)
- 500 for server errors

---

#### Task 3.5: Create Login Route and Test
**What to do:**
1. In authRoutes.js, add POST route at "/login"
2. Connect to login function
3. Test in Postman:
   - Login with correct credentials
   - Login with wrong password
   - Login with non-existent email
   - Login without password

**How to check it worked:**
- Correct credentials → get token
- Wrong password → 401 error
- Non-existent email → 401 error
- Error messages don't reveal what's wrong specifically
- Token can be decoded at jwt.io

**Celebration checkpoint:** Users can login! 🎉

---

### Day 4: Protected Routes with Middleware

#### Task 4.1: Create Auth Middleware
**What to do:**
1. In middleware/ folder, create "auth.js"
2. Create middleware function
3. Logic to implement:
   - Get Authorization header from request
   - Check if it exists
   - Extract token (remove "Bearer " prefix)
   - Verify token using jsonwebtoken.verify()
   - If valid, find user by decoded userId
   - Add user to req.user
   - Call next() to continue
   - If anything fails, return 401 error
   - Handle errors (expired token, invalid token, etc.)

**What to research:**
- "Express middleware"
- "JWT verify"
- "Express authorization header"
- "Bearer token"

**Understanding check:**
- What does middleware do?
- Why do we call next()?
- What happens if we don't call next()?
- Where does req.user come from?

---

#### Task 4.2: Create Protected Test Route
**What to do:**
1. In server.js or create new routes file
2. Create a simple GET route at "/api/test/protected"
3. Add auth middleware BEFORE the route handler
4. In handler, return req.user data
5. Test without token (should fail with 401)
6. Test with token (should work)

**What to research:**
- "Express middleware order"
- "Using middleware on specific routes"

**How to test in Postman:**
- First, login to get a token
- Create new GET request to /api/test/protected
- In Headers tab, add:
  - Key: Authorization
  - Value: Bearer [your-token-here]
- Send request

**How to check it worked:**
- Without token → 401 Unauthorized
- With valid token → 200 OK, see user data
- With fake/invalid token → 401 error
- With expired token → 401 error

**Celebration checkpoint:** You can protect routes! 🎉

---

## 🗓️ WEEK 4: Release Management (Core Feature)

### Day 1: Workspace Management

#### Task 1.1: Auto-Create Workspace on Registration
**What to do:**
1. Modify your register function
2. After creating user, also create a workspace
3. Workspace name: use user's name + "'s Workspace"
4. Subdomain: generate from user's name (remove spaces, lowercase)
5. Set user's workspaceId to the new workspace's _id
6. Handle if subdomain already exists (add random number)

**What to research:**
- "String manipulation JavaScript"
- "MongoDB transactions" (optional, advanced)

**Logic flow:**
1. Create user (but don't save yet)
2. Generate subdomain from user's name
3. Check if subdomain exists
4. If exists, append random number
5. Create workspace
6. Update user with workspaceId
7. Save user
8. Return both user and workspace

**How to check it worked:**
- Register new user
- Check database for workspace
- User's workspaceId should match workspace _id
- Subdomain should be unique and valid

---

### Day 2: Release CRUD - Create and Read

#### Task 2.1: Create Release Routes and Controller
**What to do:**
1. Create routes/releaseRoutes.js
2. Create controllers/releaseController.js
3. Set up router with auth middleware (all routes protected)
4. We'll add specific routes next

**What to research:**
- "REST API CRUD operations"
- "RESTful routing conventions"

**Understanding check:**
- What does CRUD stand for?
- What HTTP method for each operation?
- Why protect all release routes?

---

#### Task 2.2: Create Release Endpoint
**What to do:**
1. In releaseController.js, create createRelease function
2. Logic to implement:
   - Get title, content from req.body
   - Get workspaceId from req.user (logged in user)
   - Generate slug from title (remove special chars, lowercase, hyphens)
   - Check if slug already exists for this workspace
   - If exists, append number to make unique
   - Create release with status 'draft'
   - Set createdBy to req.user._id
   - Return created release

**What to research:**
- "Generate URL slug JavaScript"
- "Check unique value MongoDB"

**Slug generation:**
- "Hello World!" → "hello-world"
- "Version 2.0 Released!" → "version-2-0-released"
- Remove special characters
- Replace spaces with hyphens
- Lowercase everything

**Route to create:**
- POST /api/releases
- Protected with auth middleware

**Test in Postman:**
- Send title and content
- Check release created with draft status
- Check slug generated correctly
- Try creating duplicate title in same workspace

---

#### Task 2.3: Get All Releases Endpoint
**What to do:**
1. Create getReleases function
2. Logic to implement:
   - Get workspaceId from req.user
   - Find all releases for that workspace
   - Sort by createdAt (newest first)
   - Return releases

**Route to create:**
- GET /api/releases
- Protected with auth middleware

**What to research:**
- "Mongoose sort"
- "Mongoose find query"

**Test in Postman:**
- Get all releases
- Should only see releases from your workspace
- Newest should be first

---

#### Task 2.4: Get Single Release Endpoint
**What to do:**
1. Create getRelease function
2. Get release ID from URL parameter
3. Find release by _id
4. Verify release belongs to user's workspace (security!)
5. If not found or wrong workspace, return 404
6. Return release

**Route to create:**
- GET /api/releases/:id
- Protected with auth middleware

**What to research:**
- "Express route parameters"
- "Mongoose findById"

**Security check:**
- User can only see releases from their workspace
- Can't access other workspace's releases by guessing ID

---

### Day 3: Release CRUD - Update and Delete

#### Task 3.1: Update Release Endpoint
**What to do:**
1. Create updateRelease function
2. Logic to implement:
   - Get release ID from URL
   - Get updated data from req.body
   - Find release
   - Verify it belongs to user's workspace
   - If changing title, regenerate slug
   - Update the release
   - Return updated release

**Route to create:**
- PUT /api/releases/:id
- Protected with auth middleware

**What to research:**
- "Mongoose findByIdAndUpdate"
- "Mongoose update options"

**Fields that can be updated:**
- title (regenerate slug if changed)
- content
- Note: Don't allow changing workspaceId or createdBy!

**Test in Postman:**
- Update title
- Update content
- Try updating release from different workspace (should fail)

---

#### Task 3.2: Delete Release Endpoint
**What to do:**
1. Create deleteRelease function
2. Logic to implement:
   - Get release ID from URL
   - Find release
   - Verify belongs to user's workspace
   - Delete the release
   - Return success message

**Route to create:**
- DELETE /api/releases/:id
- Protected with auth middleware

**What to research:**
- "Mongoose findByIdAndDelete"
- "HTTP status codes for delete"

**Test in Postman:**
- Delete a release
- Verify it's gone from database
- Try to delete again (should get 404)
- Try to delete other workspace's release (should fail)

---

#### Task 3.3: Publish Release Endpoint
**What to do:**
1. Create publishRelease function
2. Logic to implement:
   - Get release ID from URL
   - Find release
   - Verify belongs to user's workspace
   - Update status to 'published'
   - Set publishedAt to current date/time
   - Return updated release

**Route to create:**
- PATCH /api/releases/:id/publish
- Protected with auth middleware

**What to research:**
- "PATCH vs PUT HTTP methods"
- "JavaScript Date object"

**Test in Postman:**
- Publish a draft release
- Check status changed to 'published'
- Check publishedAt has a date
- Can you publish already published release?

**Celebration checkpoint:** Full CRUD for releases! 🎉

---

### Day 4: Query Features - Pagination and Filtering

#### Task 4.1: Add Pagination to Get All Releases
**What to do:**
1. Modify getReleases function
2. Get page and limit from query parameters
3. Default: page=1, limit=10
4. Calculate skip value
5. Use skip() and limit() on query
6. Also count total documents
7. Return: releases, current page, total pages, total count

**What to research:**
- "Express query parameters"
- "Mongoose pagination"
- "Mongoose skip and limit"
- "Calculate total pages"

**Pagination formula:**
- skip = (page - 1) * limit
- Total pages = Math.ceil(total / limit)

**Test in Postman:**
- /api/releases?page=1&limit=5
- /api/releases?page=2&limit=5
- Check you get different results
- Check pagination info in response

---

#### Task 4.2: Add Status Filter
**What to do:**
1. Further modify getReleases
2. Get status from query parameters
3. If status provided, add to query filter
4. If no status, show all

**Test in Postman:**
- /api/releases?status=draft (only drafts)
- /api/releases?status=published (only published)
- /api/releases (all)

**Combine with pagination:**
- /api/releases?status=draft&page=1&limit=5

---

#### Task 4.3: Add Search by Title
**What to do:**
1. Add search parameter
2. If search provided, use regex to match title
3. Should be case-insensitive
4. Combine with other filters

**What to research:**
- "MongoDB regex search"
- "Case insensitive search MongoDB"

**Test in Postman:**
- /api/releases?search=version
- Should find "Version 1.0" and "New Version" etc.

**Celebration checkpoint:** Advanced queries working! 🎉

---

## 🗓️ WEEK 5: Public API & Subscribers

### Day 1: Public Changelog Endpoint

#### Task 1.1: Create Public Routes File
**What to do:**
1. Create routes/publicRoutes.js
2. These routes do NOT use auth middleware
3. Anyone can access them
4. Will be at /api/public/*

**Understanding check:**
- Why have public routes?
- Who will use these routes?
- What security concerns?

---

#### Task 1.2: Get Public Changelog Endpoint
**What to do:**
1. Create route: GET /api/public/:subdomain/releases
2. Logic to implement:
   - Get subdomain from URL parameter
   - Find workspace by subdomain
   - If workspace not found, return 404
   - Find all PUBLISHED releases for that workspace
   - Only show published, not drafts
   - Sort by publishedAt (newest first)
   - Limit to 20 releases
   - Return workspace info and releases

**What to research:**
- "URL parameters Express"
- "MongoDB filter multiple conditions"

**Security:**
- Only show published releases
- Don't show draft releases
- Don't expose sensitive workspace data

**Test in Postman:**
- GET /api/public/testcompany/releases
- Should see published releases only
- Test with invalid subdomain (should 404)
- No authentication needed

**How to check it worked:**
- Can access without token
- Only see published releases
- Drafts are hidden
- Get 404 for invalid subdomain

---

### Day 2: Subscriber Model and Subscribe Endpoint

#### Task 2.1: Review Subscriber Model
**What to do:**
1. Open models/Subscriber.js (you created earlier)
2. Make sure it has these fields:
   - workspaceId
   - email
   - verified (Boolean)
   - unsubscribeToken (unique string)
   - timestamps

3. Compound unique index on workspaceId + email

**If you didn't create it yet:**
- Go back and create it now
- Follow the model creation pattern from Week 2

---

#### Task 2.2: Create Subscribe Endpoint
**What to do:**
1. In publicRoutes.js, create POST /api/public/:subdomain/subscribe
2. Logic to implement:
   - Get subdomain from URL
   - Get email from req.body
   - Find workspace by subdomain
   - If not found, return 404
   - Check if email already subscribed to this workspace
   - If already subscribed, return error (or success, depending on UX choice)
   - Generate unique unsubscribe token
   - Create subscriber with verified=true (skip email verification for now)
   - Return success message

**What to research:**
- "Check if document exists MongoDB"
- "MongoDB unique constraint error handling"

**Use your token generator function from utils/helpers.js**

**Test in Postman:**
- POST /api/public/testcompany/subscribe
- Body: { "email": "user@example.com" }
- Should succeed
- Try same email again (should handle gracefully)
- Check database for subscriber

---

#### Task 2.3: Create Unsubscribe Endpoint
**What to do:**
1. Create GET /api/public/unsubscribe/:token
2. Logic to implement:
   - Get token from URL parameter
   - Find subscriber by unsubscribeToken
   - If not found, return 404 or friendly message
   - Delete the subscriber
   - Return success message

**What to research:**
- "Delete document MongoDB"
- "User-friendly error messages"

**Test in Postman:**
- First subscribe
- Copy the unsubscribeToken from database
- GET /api/public/unsubscribe/[that-token]
- Should delete subscriber
- Try again with same token (should 404)

**User experience consideration:**
- Even if token not found, show friendly message
- "You've been unsubscribed" (even if already was)
- Don't leak information about valid/invalid tokens

---

### Day 3: Admin View Subscribers

#### Task 3.1: Create Subscriber Routes (Admin)
**What to do:**
1. Create routes/subscriberRoutes.js
2. These ARE protected (need authentication)
3. Only show subscribers for user's workspace

**Understanding check:**
- Why separate public and admin subscriber routes?
- Who can see the subscriber list?

---

#### Task 3.2: List Subscribers Endpoint
**What to do:**
1. Create getSubscribers function
2. Logic to implement:
   - Get workspaceId from req.user
   - Find all subscribers for that workspace
   - Sort by createdAt (newest first)
   - Add pagination (same as releases)
   - Return subscribers and count

**Route to create:**
- GET /api/subscribers
- Protected with auth middleware

**Test in Postman:**
- Must be logged in
- Should see subscribers for your workspace only
- Can't see other workspace's subscribers

---

#### Task 3.3: Delete Subscriber (Admin)
**What to do:**
1. Create deleteSubscriber function
2. Logic to implement:
   - Get subscriber ID from URL
   - Find subscriber
   - Verify belongs to user's workspace
   - Delete subscriber
   - Return success

**Route to create:**
- DELETE /api/subscribers/:id
- Protected with auth middleware

**Test in Postman:**
- Delete a subscriber
- Try to delete subscriber from different workspace (should fail)

**Celebration checkpoint:** Subscriber system working! 🎉

---

### Day 4: CORS Configuration

#### Task 4.1: Install and Configure CORS
**What to do:**
1. Install cors package
2. Research: What is CORS?
3. Research: Why do we need CORS?
4. In server.js, import cors
5. Configure CORS to allow your frontend URL
6. Use as middleware before routes

**What to research:**
- "What is CORS"
- "CORS Express"
- "CORS origin configuration"

**Configuration:**
- Allow origin: your frontend URL (http://localhost:3000)
- Allow credentials: true
- Allowed methods: GET, POST, PUT, DELETE, PATCH

**Understanding check:**
- What is same-origin policy?
- Why does browser block cross-origin requests?
- What preflight request?

**Test:**
- Later when you build frontend, CORS will allow it to call your API

---

## 🗓️ WEEK 6-7: Testing Everything

### Test Every Endpoint

**For each endpoint, test:**

1. **Happy path** (everything works)
2. **Missing data** (required fields missing)
3. **Invalid data** (wrong types, format)
4. **Unauthorized** (no token when needed)
5. **Wrong workspace** (accessing other workspace data)
6. **Not found** (invalid IDs)

**Create a Postman Collection:**
1. Organize all your requests
2. Save example responses
3. Document what each endpoint does
4. Add tests for status codes

**Test scenarios to cover:**

**Authentication:**
- Register new user
- Register duplicate email
- Login correct credentials
- Login wrong password
- Access protected route without token
- Access protected route with invalid token

**Releases:**
- Create release
- Get all releases
- Get single release
- Update release
- Delete release
- Publish release
- Filter by status
- Search by title
- Pagination

**Public API:**
- Get public changelog
- Invalid subdomain
- Only shows published releases

**Subscribers:**
- Subscribe
- Duplicate subscription
- Unsubscribe
- List subscribers (admin)
- Delete subscriber (admin)

**Make a checklist and test everything!**

---

## 🗓️ WEEK 8: React Frontend Setup

### Day 1: Create React App

#### Task 1.1: Initialize React Project
**What to do:**
1. In terminal, go to your project root folder
2. Create React app in a folder called "frontend"
3. Choose one method:
   - Option A: Create React App
   - Option B: Vite (faster, recommended)

**For Create React App:**
- Use npx create-react-app frontend
- Wait for installation

**For Vite:**
- Use npm create vite@latest frontend -- --template react
- cd frontend
- npm install

**What to research:**
- "Create React App vs Vite"
- "Which one should I use"

**How to check it worked:**
- You have a frontend/ folder
- Inside is a React project
- Run the dev server (npm start or npm run dev)
- Browser opens with React logo

---

#### Task 1.2: Clean Up Default Files
**What to do:**
1. Delete files you don't need:
   - src/logo.svg
   - src/App.test.js
   - src/setupTests.js
   - src/reportWebVitals.js

2. Clean up App.js (remove logo, links, etc.)
3. Make it show simple "Hello World"
4. Clean up App.css (remove default styles)

**How to check it worked:**
- App runs without errors
- Shows your simple content
- No React logo

---

#### Task 1.3: Install Required Packages
**What to do:**
1. Stop the dev server (Ctrl+C)
2. Install react-router-dom
3. Install axios
4. Restart dev server

**What to research:**
- "React Router v6"
- "Axios vs Fetch"

**How to check it worked:**
- Packages appear in package.json
- Server still runs

---

### Day 2: Project Structure and Routing

#### Task 2.1: Create Folder Structure
**What to do:**
1. In src/ folder, create these folders:
   - components/
   - pages/
   - services/
   - context/
   - hooks/
   - utils/

2. Don't create files yet, just folders

**Understanding check:**
- What will go in each folder?
- Why organize into folders?

---

#### Task 2.2: Set Up React Router
**What to do:**
1. In src/App.js, import BrowserRouter, Routes, Route
2. Set up routes structure
3. Create these routes (no content yet):
   - / → Home page
   - /login → Login page
   - /register → Register page
   - /dashboard → Dashboard (later we'll protect this)

**What to research:**
- "React Router v6 tutorial"
- "BrowserRouter vs HashRouter"
- "React Router Routes and Route"

**For now:**
- Each route can just show text like "Login Page"
- We'll build the actual components next

**How to check it worked:**
- Navigate to each URL manually
- Each shows different content
- URL changes when you navigate

---

#### Task 2.3: Create Navigation Links
**What to do:**
1. Add Link components from react-router-dom
2. Create simple navigation
3. Links to login, register, home

**What to research:**
- "React Router Link"
- "Link vs anchor tag in React"

**How to check it worked:**
- Clicking links navigates without page refresh
- URL updates
- Content changes

---

### Day 3: API Service Setup

#### Task 3.1: Create Axios Instance
**What to do:**
1. In services/ folder, create api.js
2. Import axios
3. Create axios instance with baseURL pointing to your backend
4. Add to .env: REACT_APP_API_URL=http://localhost:5000/api
5. Use environment variable for baseURL
6. Set default headers (Content-Type: application/json)
7. Export the instance

**What to research:**
- "Axios create instance"
- "React environment variables"
- "REACT_APP prefix"

**Base URL should be:**
- http://localhost:5000/api

**How to check it worked:**
- File imports without errors
- You understand what this instance does

---

#### Task 3.2: Add Request Interceptor
**What to do:**
1. In the same api.js file
2. Add request interceptor to axios instance
3. It should:
   - Get token from localStorage
   - If token exists, add to Authorization header
   - Format: "Bearer [token]"
   - Return modified config

**What to research:**
- "Axios interceptors"
- "localStorage JavaScript"

**Understanding check:**
- What is an interceptor?
- When does it run?
- Why add token to every request?

---

#### Task 3.3: Add Response Interceptor
**What to do:**
1. Add response interceptor
2. For successful responses, just return response
3. For errors, handle specific cases:
   - 401 error → token might be invalid/expired
   - Log error
   - Return rejected promise

**What to research:**
- "Axios response interceptor"
- "Handling errors in interceptor"

**This is for later:**
- Eventually will handle token refresh
- For now, just log errors

---

### Day 4: Authentication Context

#### Task 4.1: Create Auth Context
**What to do:**
1. In context/ folder, create AuthContext.jsx
2. Import createContext, useState, useContext
3. Create AuthContext
4. Create AuthProvider component
5. State to manage:
   - user (current user or null)
   - token (JWT token or null)
   - loading (Boolean)

6. Functions to create:
   - login(token, user) → save to state and localStorage
   - logout() → clear state and localStorage
   - initialize() → check localStorage on mount

7. Provide value with state and functions
8. Create useAuth custom hook
9. Export both provider and hook

**What to research:**
- "React Context API"
- "useContext hook"
- "Custom hooks React"

**Understanding check:**
- What is Context used for?
- Why not use props?
- What is a custom hook?

---

#### Task 4.2: Wrap App with Auth Provider
**What to do:**
1. In src/index.js (or main.jsx), import AuthProvider
2. Wrap your App component with AuthProvider
3. Now all components can access auth context

**Understanding check:**
- Why wrap at top level?
- What does Provider do?

---

#### Task 4.3: Use Auth Context in Components
**What to do:**
1. In any component, import useAuth hook
2. Call useAuth() to get auth state and functions
3. Practice accessing user, token, login, logout

**Test in console:**
- Log the auth state
- Try calling logout
- Check localStorage changes

---

## 🗓️ Continue with Remaining Weeks...

**The pattern continues:**
- Week 9-10: Build all frontend components
- Week 11: Style everything
- Week 12: Test and debug
- Week 13-16: Advanced features

**For each feature, follow this process:**

1. **Plan** - What do I need to build?
2. **Research** - What don't I know yet?
3. **Design** - How will it work?
4. **Build** - Write the code (yourself!)
5. **Test** - Does it work?
6. **Debug** - Fix issues
7. **Refactor** - Make it better

---

## 🎯 General Guidelines for Learning

### When Starting Any New Feature:

**1. Understand the Goal**
- What is this feature supposed to do?
- Who will use it?
- What's the input and output?

**2. Break It Down**
- What are the smallest steps?
- What do I need to learn first?
- What dependencies exist?

**3. Research First**
- Read documentation
- Watch tutorials (watch, don't copy)
- Understand concepts
- Then close the tutorial and try yourself

**4. Plan Before Coding**
- Write pseudocode or comments first
- Think through the logic
- Consider edge cases
- Then write actual code

**5. Test Frequently**
- Don't write 100 lines then test
- Test every 5-10 lines
- Use console.log liberally
- Verify each step works

**6. Debug Systematically**
- Read error messages carefully
- Google the exact error
- Check syntax first
- Verify data types
- Console.log everything

**7. Refactor After Working**
- Get it working first
- Then make it better
- Remove console.logs
- Add error handling
- Add comments

---

## 🆘 When You Get Stuck

**Follow This Process:**

**1. Stop and Think**
- What exactly isn't working?
- What did I expect vs what happened?
- When did it last work?

**2. Read the Error**
- What is the error message?
- Which file and line number?
- What is it actually saying?

**3. Check the Basics**
- Is the server running?
- Did I save the file?
- Is the database connected?
- Are imports correct?

**4. Debug Systematically**
- Add console.logs
- Check variables at each step
- Verify function is being called
- Check data is what you expect

**5. Research**
- Google the exact error message
- Read the documentation
- Check Stack Overflow
- Try similar examples

**6. Take a Break**
- Step away for 15 minutes
- Fresh eyes see bugs easier
- Come back and try again

**7. Ask for Help**
- If stuck for 2+ hours
- Post on Stack Overflow
- Ask in Discord/Reddit
- Explain what you tried

---

## 📝 How to Use This Guide

**This guide doesn't give you code because:**
- Typing yourself = better learning
- Fighting through errors = skill building
- Finding solutions = confidence building
- Understanding > copying

**For each task:**
1. Read what to do
2. Research what you don't know
3. Try to implement yourself
4. Test it works
5. Move to next task

**Don't skip the research!**
- Every task has "What to research"
- Actually go read those things
- Understanding concepts > copying code

**Don't skip the checkpoints!**
- Verify you understand before moving on
- Answer the questions yourself
- If you can't explain it, review it

---

## 🎓 Learning Resources

**When you need to research something:**

**Official Documentation (Always best):**
- Node.js: nodejs.org/docs
- Express: expressjs.com
- MongoDB: mongodb.com/docs
- Mongoose: mongoosejs.com/docs
- React: react.dev

**Video Tutorials:**
- Traversy Media (YouTube)
- Web Dev Simplified (YouTube)
- Net Ninja (YouTube)
- freeCodeCamp (YouTube)

**Written Tutorials:**
- MDN Web Docs
- freeCodeCamp articles
- Dev.to
- Medium

**When Stuck:**
- Stack Overflow
- Reddit r/learnprogramming
- Reddit r/node
- Reddit r/reactjs

---

## ✅ Success Checklist

**You're learning correctly if:**
- ✅ You understand what your code does
- ✅ You can explain it to someone
- ✅ You're debugging errors yourself
- ✅ You're reading documentation
- ✅ You're getting stuck and unstuck
- ✅ You're making progress (even if slow)

**Red flags that you're not learning:**
- ❌ Just copying code without understanding
- ❌ Skipping errors and moving on
- ❌ Not testing as you go
- ❌ Not reading what you research
- ❌ Giving up at first error

---

## 🚀 Remember

**Building from scratch is HARD but:**
- You'll understand everything deeply
- You'll remember it longer
- You'll be able to explain it
- You'll build real confidence
- You'll be interview-ready

**Take your time. Be patient with yourself. Every expert started exactly where you are.**

**You've got this! 💪**

---

*Now go back to Week 1, Day 1, Task 1.1 and start building!*
