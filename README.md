# Employee App

Employee App is a full-stack application designed to manage employee data such as creating new users, updating existing users, and other related features. It provides an intuitive interface for handling employee information including experience, benefits, salary coefficients, and more.

## Project Structure

The app is divided into two main parts:

- **Backend:** Built with NestJS, it handles the business logic, authentication, and communication with MongoDB.
- **Frontend:** Developed using React, it provides an intuitive UI for managing employee data.

## Getting Started

********** CREATE MANUAL ADMIN USER IN MONGODB EMPLOYEE-APP/USERS FOR FIRST LOG IN **********

### Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install

2. **Set up environment variables:**
    Create a .env file in the backend folder. Add the following variables:

    MONGODB_URI=mongodb_your_db
    JWT_SECRET=your_jwt_secret_key
    PORT=3000

3. **Run the development server:**

    npm run start:dev

    ### Frontend Setup
1. **Install dependencies:**
    
    cd frontend
    npm install

2. **Set up environment variables:**

    Create a .env file in the frontend folder. Add the following variables:
    VITE_API_URL=http://localhost:3000

3. **Start development server:**

    npm run dev

### Technologies

**Backend**

    NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
    MongoDB: A NoSQL database used for storing employee data.
    JWT: For user authentication and authorization.
    Mongoose: For MongoDB object modeling.
    BcryptJS: For hashing passwords.
    Class-Validator: For validating DTOs.
    Cron: For running scheduled jobs.
    Passport: For authentication and authorization management.
    RxJS: Reactive programming with observables.

**Frontend**

    React: A JavaScript library for building user interfaces.
    React Router: For handling routing within the app.
    Vite: A fast build tool for modern web development.
    Formik: For building forms with ease.
    Yup: For form validation.
    Axios: For making HTTP requests to the backend.
    Tailwind CSS: A utility-first CSS framework for styling.
    Zustand: A small, fast, and scalable state management solution.
    Lucide-React: For adding customizable icons.
    React Spinners: For adding loading indicators in the UI.