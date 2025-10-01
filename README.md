<img width="1915" height="1044" alt="image" src="https://github.com/user-attachments/assets/e493f05f-7b65-41be-971f-ee2823b71d1c" /># Excel-Analytics-Platform
A powerful platform to upload Excel files (.xls/.xlsx), analyze data, and generate interactive 2D/3D charts. Users can choose X and Y axes from column headers, select chart types, and download graphs. Each user's upload and analysis history is saved in their dashboard. Admins can manage users and monitor data usage.

Overview
The auth routes are responsible for handling user authentication, including registration and login.

------------------------------------------------------------------------------------------------------------->

📂 Project Structure

excel-to-charts/
│── backend/        # Express.js + MongoDB backend
│── frontend/       # React frontend (with TailwindCSS)
│── README.md       # Documentation


⚙️ Features

📁 Upload Excel files
📊 Convert Excel data into interactive charts
🖼️ Export charts as PNG
📑 Export charts as PDF
🔒 User authentication (login/register)
🌐 Easy-to-use dashboard


🛠️ Tech Stack

:: Frontend: React, TailwindCSS, Chart.js (or Recharts)
:: Backend: Node.js, Express.js
:: Database: MongoDB (Mongoose)
:: Other Tools: Multer (file upload), XLSX (Excel parsing), jsPDF (PDF export)

2. Install dependencies
Backend:
   cd backend
   npm install
  npm run start
 

Frontend:
   cd frontend
   npm install
   npm run dev
   
   Now open 👉 http://localhost:3000

📸 Screenshots

Login
<img width="1915" height="1044" alt="image" src="https://github.com/user-attachments/assets/8c355ec7-1d47-41bc-aa4d-d19b2df04ddf" />






Register
Home








📖 Usage

1.Register/Login as a user

2.Upload an Excel file (.xlsx / .xls)

3.View automatically generated charts

4.Export them as PDF or PNG

🚀 Roadmap / Future Enhancements

 :: Support Google Sheets import

 :: Add more chart types (Pie, Line, Scatter, etc.)

 :: Deploy on Vercel (Frontend) & Render/Heroku (Backend)

 :: Dark mode UI

👤 Author

Dinesh Dakhare

GitHub: https://github.com/Dinesh-Dakhare

LinkedIn: https://www.linkedin.com/in/dinesh-dakhare/

------------------------------------------------------------------------------------------------------------->
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



