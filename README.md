# Excel-Analytics-Platform
A powerful platform to upload Excel files (.xls/.xlsx), analyze data, and generate interactive 2D/3D charts. Users can choose X and Y axes from column headers, select chart types, and download graphs. Each user's upload and analysis history is saved in their dashboard. Admins can manage users and monitor data usage.

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

   Auth Controller

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

    Example Usage

    POST \http://localhost:3000/api/v1/auth/register \

    -H 'Content-Type: application/json' \
    -d '{"username": "johnDoe", "email": "john@example.com", "password": "password123"}'


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






