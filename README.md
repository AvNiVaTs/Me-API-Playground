# **Me-API-Playground**

A full-stack application designed as a personal API playground to manage and display your professional profile, projects, and skills with a clean, glassmorphism-inspired UI.

### **Table of Contents**

* [Overview](https://www.google.com/search?q=%23overview)  
* [Features](https://www.google.com/search?q=%23features)  
* [Technologies](https://www.google.com/search?q=%23technologies)  
* [Setup & Installation](https://www.google.com/search?q=%23setup-and-installation)  
* [API Endpoints](https://www.google.com/search?q=%23api-endpoints)  
* [Assessment References](https://www.google.com/search?q=%23assessment-references)  
* [License](https://www.google.com/search?q=%23license)  
* [Contact](https://www.google.com/search?q=%23contact)

### **Overview**

This project is a personal backend assessment that builds a simple but powerful application for developers. It features a robust **Node.js backend** with an **Express.js API** that connects to a **MongoDB database**, and a dynamic frontend built with **Next.js**. The goal is to provide a comprehensive tool to showcase a developer's profile, including their projects, skills, and work history, all accessible through a RESTful API.

### **Features**

* **Comprehensive Profile Management:** Create, read, and update a personal profile with your name, email, headline, summary, links, and work history.  
* **Dynamic Project Showcase:** A dedicated section to list and display your projects with links to live demos and source repositories.  
* **Intelligent Search & Filtering:** Find projects by keyword or filter them by a specific skill using the powerful search and query functionality.  
* **Top Skills Insight:** An API endpoint that dynamically calculates and provides a list of your top 10 skills based on their frequency in your projects.  
* **Health Check Endpoint:** A dedicated endpoint to monitor the liveness of the API.  
* **Modern UI/UX:** A minimalist, mobile-responsive "glassmorphism" design built with Tailwind CSS and Shadcn/ui components, providing a seamless user experience.

### **Technologies**

The project is structured with a frontend and a backend, each using a modern and popular technology stack.

#### **Backend (Node.js)**

* **Framework:** [Express.js](https://expressjs.com/)  
* **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM  
* **Environment:** [dotenv](https://www.npmjs.com/package/dotenv)  
* **API Utilities:** [CORS](https://www.npmjs.com/package/cors)

#### **Frontend (Next.js)**

* **Framework:** [Next.js](https://nextjs.org/)  
* **Language:** JavaScript (React)  
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
* **Components:** [Shadcn/ui](https://ui.shadcn.com/)  
* **Data Fetching:** [SWR](https://swr.vercel.app/) for fast, reliable data loading

### **Setup & Installation**

To get a copy of this project up and running on your local machine, follow these simple steps.

#### **1\. Clone the repository**

git clone \[https://github.com/AvNiVaTs/Me-API-Playground.git\](https://github.com/AvNiVaTs/Me-API-Playground.git)  
cd Me-API-Playground

#### **2\. Backend Setup**

1. Navigate into the backend directory:  
   cd backend

2. Install the required dependencies:  
   npm install

3. Create a .env file in the backend directory and add your MongoDB connection string and a port number.  
   MONGODB\_URI="\<your-mongodb-connection-string\>"  
   PORT=8000  
   CORS\_ORIGIN="http://localhost:3000"

4. Start the backend server in development mode:  
   npm run dev

   The API will now be running at http://localhost:8000.

#### **3\. Frontend Setup**

1. Navigate to the frontend directory:  
   cd ../frontend

2. Install the dependencies:  
   npm install

3. Create a .env file and set the NEXT\_PUBLIC\_API\_URL to point to your backend.  
   NEXT\_PUBLIC\_API\_URL=http://localhost:8000

4. Start the frontend development server:  
   npm run dev

   The application will be accessible at http://localhost:3000.

### **API Endpoints**

The backend exposes a clean and intuitive RESTful API.

* GET /api/v1/health: Checks the liveness of the API.  
* POST /api/v1/profile: Creates a new profile.  
* GET /api/v1/profile: Retrieves the current user profile.  
* PUT /api/v1/profile: Updates the existing profile.  
* GET /api/v1/projects: Retrieves all projects. You can filter by skill: GET /api/v1/projects?skill=Node.js.  
* GET /api/v1/skills/top: Returns a list of the top 10 most used skills.  
* GET /api/v1/search?q=\<query\>: Searches for a query string across multiple fields in your profile and projects.

### **Assessment References**

This project was built to meet specific backend assessment requirements.

### **Contact**

For any questions or suggestions, feel free to open an issue in this repository.

* [Resume Link](https://drive.google.com/file/d/1yPME0O6_qUA8w7-gg_Ewy2HULKLpg44q/view?usp=sharing)