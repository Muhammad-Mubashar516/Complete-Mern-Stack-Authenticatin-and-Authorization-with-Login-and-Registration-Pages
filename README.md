MERN Stack Authentication and Authorization
This repository contains a complete MERN (MongoDB, Express, React, Node.js) stack application featuring user authentication and authorization with login and registration pages. The application demonstrates best practices for implementing secure user authentication and role-based authorization.
Features
•	User Registration: Allows new users to create an account by providing a name, email, and password.
•	User Login: Authenticates existing users and provides them with a JWT token.
•	Role-Based Authorization: Grants access to certain parts of the application based on user roles (e.g., admin).
•	Protected Routes: Ensures that only authenticated users can access certain routes.
•	Token-Based Authentication: Uses JSON Web Tokens (JWT) for secure user authentication.
•	Form Validation: Validates user inputs on both client-side and server-side.
•	Password Hashing: Secures user passwords using bcrypt hashing.
Technologies Used
•	Frontend:
•	React
•	Axios
•	React Router
•	Backend:
•	Node.js
•	Express
•	MongoDB (Mongoose for ODM)
•	bcrypt for password hashing
•	jsonwebtoken for token generation and verification
•	cookie-parser for handling cookies
Getting Started
Prerequisites
•	Node.js installed on your machine
•	MongoDB installed and running
Installation
1.	Clone the repository:
sh
Copy code
git clone https://github.com/your-username/mern-auth-app.git cd mern-auth-app 
2.	Install server dependencies:
sh
Copy code
cd server npm install 
3.	Install client dependencies:
sh
Copy code
cd ../client npm install 
Configuration
1.	Set up environment variables:
Create a .env file in the server directory with the following content:
sh
Copy code
PORT=3001 MONGO_URI=mongodb://localhost:27017/your-database-name JWT_SECRET=your-jwt-secret-key 
2.	Ensure MongoDB is running:
sh
Copy code
mongod 
Running the Application
1.	Start the server:
sh
Copy code
cd server npm start 
2.	Start the client:
sh
Copy code
cd ../client npm start 
3.	Open your browser and navigate to:
sh
Copy code
http://localhost:3000 
Registration
1.	Navigate to the registration page.
2.	Fill in the name, email, and password fields.
3.	Click the "Register" button.
4.	If any field is empty, an alert will appear asking the user to fill in all fields.
5.	If the registration is successful, the user is redirected to the login page.
Login
1.	Navigate to the login page.
2.	Fill in the email and password fields.
3.	Click the "Login" button.
4.	If the login is successful, the user is redirected to the dashboard.
5.	If the user is an admin, they can access admin-specific routes.
Protected Routes
•	Only authenticated users can access protected routes.
•	Admin routes are accessible only to users with the admin role.
Contributing
1.	Fork the repository.
2.	Create a new branch (git checkout -b feature-branch).
3.	Make your changes.
4.	Commit your changes (git commit -m 'Add some feature').
5.	Push to the branch (git push origin feature-branch).
6.	Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

