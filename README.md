# Evangadi Q&A Platform

## Overview
Evangadi Q&A Platform is a full-stack web application that enables users to ask and answer programming-related questions. The platform ensures a seamless experience with secure authentication and a structured interface.

## Features
- User authentication (Register/Login)
- Post questions with title and description
- View and answer questions
- Responsive design
- Protected routes for authenticated users

## Tech Stack
- **Frontend**: React.js, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL (PlanetScale)
- **Hosting**:
  - Frontend: Vercel
  - Backend: Render
  - Database: Railway

## Installation & Setup
### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/evangadi-backend.git
   cd evangadi-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   DB_HOST=your-host
   DB_USER=your-user
   DB_PASSWORD=your-password
   DB_NAME=your-db-name
   JWT_SECRET=your-secret
   ```
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Clone the frontend repo:
   ```sh
   git clone https://github.com/yourusername/evangadi-frontend.git
   cd evangadi-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:
   ```env
   REACT_APP_API_URL=your-backend-url
   ```
4. Start the React app:
   ```sh
   npm start
   ```

## Deployment
### Backend Deployment (Render)
- Connect GitHub repo to Render
- Add environment variables
- Deploy

### Frontend Deployment (Vercel)
- Connect GitHub repo to Vercel
- Add environment variables
- Deploy

## Usage
- Sign up or log in
- Post a question
- Answer existing questions

## Live Demo
[Frontend Live](https://evangadi-qa-platform.netlify.app) | [Backend API](https://evangadi-qa-platform.onrender.com/api)

## Contact
For inquiries, reach out via [LinkedIn](https://linkedin.com/in/yourprofile).

