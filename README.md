Project Setup Guide
1️⃣ Backend
After downloading the backend folder, follow these steps:

Create the .env file from the example file

sh
Copy
Edit
cp .env.example .env
Configure environment variables in .env (adjust them according to your setup):

env
Copy
Edit
DB_CONNECTION=mysql  
DB_HOST=127.0.0.1  
DB_PORT=3306  
DB_DATABASE=laravel  # Change this to match your database name  
DB_USERNAME=root  
DB_PASSWORD=  
Create a database matching the DB_DATABASE name

Using MySQL CLI:

sql
Copy
Edit
CREATE DATABASE laravel;
Or create it manually via phpMyAdmin.

Run migrations to set up database tables

sh
Copy
Edit
php artisan migrate
Start the backend server

sh
Copy
Edit
php artisan serve
The backend will run at http://127.0.0.1:8000 by default.

2️⃣ Frontend
After downloading the frontend folder, follow these steps:

Modify the .env file in the frontend
Configure API URLs according to your backend setup:

env
Copy
Edit
REACT_APP_API_URL_LOCAL=http://127.0.0.1:8000/api  
REACT_APP_API_URL_PROD=https://user-management-be-appk.onrender.com/api  
REACT_APP_API_URL_IMG=http://127.0.0.1:8000/api  
# Uncomment the line below to use images from the live server  
# REACT_APP_API_URL_IMG=https://user-management-be-appk.onrender.com/api  
Install dependencies (if not already installed)

sh
Copy
Edit
npm install
Start the frontend server

sh
Copy
Edit
npm start
The frontend will run at http://localhost:3000 by default.
