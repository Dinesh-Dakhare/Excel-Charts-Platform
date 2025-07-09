# Excel-Analytics-Platform
A powerful platform to upload Excel files (.xls/.xlsx), analyze data, and generate interactive 2D/3D charts. Users can choose X and Y axes from column headers, select chart types, and download graphs. Each user's upload and analysis history is saved in their dashboard. Admins can manage users and monitor data usage.

Overview
The auth routes are responsible for handling user authentication, including registration and login.

Auth Routes

   POST /register

  • Description: Register a new user
  • Request Body:
     • username: string (required)
     • email: string (required)
     •  password: string (required)
     •  role: string (optional, default: 'user')

  • Response:
     • 201 Created: User registered successfully
     • 400 Bad Request: All fields are required
     • 400 Bad Request: User already exists

   POST /login

    • Description: Login an existing user
    • Request Body:
       • email: string (required)
       • password: string (required)
    • Response:
       • 200 OK: User logged in successfully
       • 400 Bad Request: All fields are required
       • 400 Bad Request: User not found
       •400 Bad Request: Invalid credentials

   Auth Controller Documentation
   ================================

   registerUser

   • Description: Register a new user
   • Parameters:
      • req: express request object
      • res: express response object

   • Returns:
    • 201 Created: User registered successfully
    • 400 Bad Request: All fields are required
    • 400 Bad Request: User already exists
    • 500 Internal Server Error: Server error
    
   loginUser
    • Description: Login an existing user
    • Parameters:
       • req: express request object
       • res: express response object

    • Returns:
       • 200 OK: User logged in successfully
       • 400 Bad Request: All fields are required
       • 400 Bad Request: User not found
       • 400 Bad Request: Invalid credentials

    Example Usage
   • Register a new user

    POST /api/v1/auth/register 
    Content-Type: application/json

     {
      "username": "johnDoe",
      "email": "john@example.com",
      "password": "password123"

     }


    Response:-
    json
    {

    "message": "User registered successfully",
    "token": "jwt token",
    "user": {
     "id": "user id",
     "username": "johnDoe",
     "email": "john@example.com",
     "role": "user"
    }
   }

  • Login an existing user

    POST /api/v1/auth/login 
   Content-Type: application/json

  {
    "email": "john@example.com",
    "password": "password123"
  }

  Response:-
    json
    {

    "message": "User login successfully",
    "token": "jwt token",
    "user": {
     "id": "user id",
     "username": "johnDoe",
     "email": "john@example.com",
     "role": "user"
    }
   }

