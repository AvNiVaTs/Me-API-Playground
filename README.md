# **Me-API-Playground**

A full-stack application designed as a personal API playground to manage and display your professional profile, projects, and skills with a clean, glassmorphism-inspired UI.

## **Table of Contents**

* [Overview](https://www.google.com/search?q=%23overview)  
* [Features](https://www.google.com/search?q=%23features)  
* [Technologies](https://www.google.com/search?q=%23technologies)  
* [Setup & Installation](https://www.google.com/search?q=%23setup--installation)  
* [API Endpoints](https://www.google.com/search?q=%23api-endpoints)  
* [Project Structure](https://www.google.com/search?q=%23project-structure)  
* [Dependencies](https://www.google.com/search?q=%23dependencies)  
* [License](https://www.google.com/search?q=%23license)  
* [Contact](https://www.google.com/search?q=%23contact)

## **Overview**

This project is a personal backend assessment that builds a simple but powerful application for developers. It features a robust Node.js backend with an Express.js API that connects to a MongoDB database, and a dynamic frontend built with Next.js. The goal is to provide a comprehensive tool to showcase a developer's profile, including their projects, skills, and work history, all accessible through a RESTful API.

## **Features**

* **Comprehensive Profile Management**: Create, read, update, and delete a personal profile with your name, email, headline, summary, links, and work history.  
* **Dynamic Project Showcase**: A dedicated section to list and display your projects with links to live demos and source repositories.  
* **Intelligent Search & Filtering**: Find projects by keyword or filter them by a specific skill.  
* **Top Skills Insight**: An API endpoint that dynamically calculates and provides a list of your top 10 skills based on their frequency in your projects.  
* **Health Check Endpoint**: A dedicated endpoint to a dedicated endpoint to monitor the API's liveness.  
* **Modern UI/UX**: A minimalist, mobile-responsive "glassmorphism" design built with Tailwind CSS and Shadcn/ui components.

## **Technologies**

The project is structured with a frontend and a backend, each using a modern and popular technology stack.

### **Backend (Node.js)**

* **Framework**: [Express.js](https://expressjs.com/)  
* **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)  
* **API Utilities**: [CORS](https://www.npmjs.com/package/cors), [cookie-parser](https://www.npmjs.com/package/cookie-parser), and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
* **File Uploads**: [Multer](https://www.npmjs.com/package/multer) and [Cloudinary](https://cloudinary.com/)

### **Frontend (Next.js)**

* **Framework**: [Next.js](https://nextjs.org/)  
* **Language**: JavaScript (React)  
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
* **Components**: [Shadcn/ui](https://ui.shadcn.com/)  
* **Data Fetching**: [SWR](https://swr.vercel.app/)

## **Setup & Installation**

To get a copy of this project up and running on your local machine, follow these simple steps.

### **1\. Clone the repository**

git clone [https://github.com/your-username/Me-API-Playground.git](https://github.com/your-username/Me-API-Playground.git)  
cd Me-API-Playground

### **2\. Backend Setup**

1. Navigate into the backend directory:  
   cd backend

2. Install the required dependencies:  
   npm install

3. Create a .env file in the backend directory and add your MongoDB connection string and a port number.  
   MONGODB\_URI="\<your-mongodb-connection-string\>"  
   PORT=8000  
   CORS\_ORIGIN="http://localhost:3000"

4. Start the backend server:  
   npm start

   The API will now be running at http://localhost:8000.

### **3\. Frontend Setup**

1. Navigate to the frontend directory:  
   cd ../frontend

2. Install the dependencies:  
   npm install

3. Create a .env.local file and set the NEXT\_PUBLIC\_API\_URL to point to your backend.  
   NEXT\_PUBLIC\_API\_URL=http://localhost:8000

4. Start the frontend development server:  
   npm run dev

   The application will be accessible at http://localhost:3000.

## **API Endpoints**

The backend exposes the following RESTful API endpoints:

* GET /api/v1/health: Checks the liveness of the API.  
* POST /api/v1/profile: Creates a new profile.  
* GET /api/v1/profile: Retrieves the current user profile.  
* PUT /api/v1/profile: Updates the existing profile.  
* DELETE /api/v1/profile: Deletes the existing profile.  
* GET /api/v1/projects: Retrieves all projects. You can filter by skill: GET /api/v1/projects?skill=Node.js.  
* POST /api/v1/projects: Creates a new project.  
* GET /api/v1/skills/top: Returns a list of the top 10 most used skills.  
* GET /api/v1/search/projects?q=\<query\>: Searches for a query string across multiple fields in your profile and projects.

## **Project Structure**

The project is organized into two main directories: frontend and backend.

* **frontend/**: Contains the Next.js application, with components, pages, and styles.  
* **backend/**: Contains the Node.js and Express.js application, with routes, controllers, models, and utilities.

## **Dependencies**

### **Backend Dependencies**

* bcrypt: For hashing passwords.  
* cloudinary: For image and file uploads.  
* cookie-parser: For parsing cookies.  
* cors: For enabling Cross-Origin Resource Sharing.  
* dayjs: For date and time manipulation.  
* dotenv: For managing environment variables.  
* express: The web application framework.  
* jsonwebtoken: For creating and verifying JSON Web Tokens.  
* mongoose: The MongoDB object modeling tool.  
* mongoose-aggregate-paginate-v2: For pagination of aggregated results.  
* multer: For handling multipart/form-data (file uploads).  
* prettier: For code formatting.

### **Frontend Dependencies**

* @radix-ui/\*: A collection of UI components.  
* class-variance-authority: For creating a consistent set of component variants.  
* clsx: A tiny utility for constructing className strings conditionally.  
* cmdk: A command menu component for React.  
* date-fns: For modern JavaScript date utility library.  
* embla-carousel-react: A bare-bones carousel library for React.  
* geist: A typeface for Next.js.  
* input-otp: A one-time password input component for React.  
* lucide-react: A library of simply beautiful icons.  
* next: The React framework for production.  
* next-themes: An abstraction for themes in Next.js.  
* react-day-picker: A flexible date picker component for React.  
* react-hook-form: Performant, flexible and extensible forms with easy-to-use validation.  
* react-resizable-panels: A set of components for creating resizable panels in React.  
* recharts: A composable charting library built on React components.  
* sonner: An opinionated toast component for React.  
* swr: A React Hooks library for data fetching.  
* tailwind-merge: A utility for merging Tailwind CSS classes.  
* tailwindcss-animate: A Tailwind CSS plugin for creating animations.  
* vaul: An unstyled drawer component for React.  
* zod: A TypeScript-first schema declaration and validation library.

### **Assessment References**

This project was built to meet specific backend assessment requirements.

### **Contact**

For any questions or suggestions, feel free to open an issue in this repository.

* [Resume Link](https://drive.google.com/file/d/1yPME0O6_qUA8w7-gg_Ewy2HULKLpg44q/view?usp=sharing)