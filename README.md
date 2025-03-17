Project Setup Guide

1️⃣ Backend

After downloading the backend folder, follow these steps:

1. Create the .env file from the example file

cp .env.example .env  

2. Configure environment variables in .env

Adjust these values according to your setup:

DB_CONNECTION=mysql  
DB_HOST=127.0.0.1  
DB_PORT=3306  
DB_DATABASE=laravel  # Change this to match your database name  
DB_USERNAME=root  
DB_PASSWORD=  

3. Create a database matching the DB_DATABASE name

Using MySQL CLI:

CREATE DATABASE laravel;  

Or create it manually via phpMyAdmin.

4. Run migrations to set up database tables

php artisan migrate  

5. Start the backend server

php artisan serve  

The backend will run at http://127.0.0.1:8000 by default.

2️⃣ Frontend

After downloading the frontend folder, follow these steps:

1. Modify the .env file in the frontend

Configure API URLs according to your backend setup:

REACT_APP_API_URL_LOCAL=http://127.0.0.1:8000/api  
REACT_APP_API_URL_PROD=https://user-management-be-appk.onrender.com/api  
REACT_APP_API_URL_IMG=http://127.0.0.1:8000/api  
# Uncomment the line below to use images from the live server  
# REACT_APP_API_URL_IMG=https://user-management-be-appk.onrender.com/api  

2. Install dependencies (if not already installed)

npm install  

3. Start the frontend server

npm start  

The frontend will run at http://localhost:3000 by default.

