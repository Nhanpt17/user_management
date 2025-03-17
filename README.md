# Project Setup Guide

## 1️⃣ Backend

After downloading the **backend** folder, follow these steps:

### 1. Create the `.env` file from the example file

```sh
cp .env.example .env  
```

### 2. Configure environment variables in `.env`

Adjust these values according to your setup:

```env
DB_CONNECTION=mysql  
DB_HOST=127.0.0.1  
DB_PORT=3306  
DB_DATABASE=laravel  # Change this to match your database name  
DB_USERNAME=root  
DB_PASSWORD=  
```

### 3. Create a database matching the `DB_DATABASE` name

- Using MySQL CLI:

```sql
CREATE DATABASE laravel;  
```

- Or create it manually via **phpMyAdmin**.

### 4. Run migrations to set up database tables

```sh
php artisan migrate  
```

### 5. Start the backend server

```sh
php artisan serve  
```

The backend will run at `http://127.0.0.1:8000` by default.

---

## 2️⃣ Frontend

After downloading the **frontend** folder, follow these steps:

### 1. Modify the `.env` file in the frontend

Configure API URLs according to your backend setup:

```env
REACT_APP_API_URL_LOCAL=http://127.0.0.1:8000/api  
REACT_APP_API_URL_PROD=https://user-management-be-appk.onrender.com/api  
REACT_APP_API_URL_IMG=http://127.0.0.1:8000/api  
# Uncomment the line below to use images from the live server  
# REACT_APP_API_URL_IMG=https://user-management-be-appk.onrender.com/api  
```

### 2. Install dependencies (if not already installed)

```sh
npm install  
```

### 3. Start the frontend server

```sh
npm start  
```

The frontend will run at `http://localhost:3000` by default.

---

## ✅ Notes

- If you encounter **CORS** issues while making API requests, check the backend CORS settings (`cors.php`).
- If the backend is running on a different port (`8000` by default), update `REACT_APP_API_URL_LOCAL` in the frontend `.env` file.
- After running migrations, verify that the database contains the required tables.

