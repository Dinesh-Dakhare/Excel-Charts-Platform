# Excel-Analytics-Platform
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
<img width="1919" height="1044" alt="image" src="https://github.com/user-attachments/assets/2ca50614-ae43-4a18-bdf1-459d08cda091" />
Home
<img width="1884" height="1048" alt="image" src="https://github.com/user-attachments/assets/5c89f85c-d2f2-4698-953f-86e187e9286c" />
Upload-page
<img width="1897" height="1040" alt="image" src="https://github.com/user-attachments/assets/a5aac06b-cd7d-49ba-a109-67395d5ae414" />
chart-select
<img width="1898" height="1047" alt="image" src="https://github.com/user-attachments/assets/fa8f9c7e-eb7c-463e-8ae6-f8a91f60f919" />

<img width="1898" height="1041" alt="image" src="https://github.com/user-attachments/assets/f2575238-3393-48d0-94b2-ce58397b72eb" />
Generate-Ai-summary
<img width="1894" height="1044" alt="image" src="https://github.com/user-attachments/assets/bf43e0a9-800e-489b-8870-93ea829490d0" />
history page
<img width="1894" height="1048" alt="image" src="https://github.com/user-attachments/assets/349933c7-88f9-40d3-9564-30c7d86a74c5" />
Setting-page
<img width="1893" height="1037" alt="image" src="https://github.com/user-attachments/assets/11fa3a72-90af-476c-b89a-f76090763f72" />
Dashboard-page
<img width="1893" height="1048" alt="image" src="https://github.com/user-attachments/assets/6c664c10-66ca-4707-940b-2e1f6cfba82a" />







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



