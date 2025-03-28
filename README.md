# User Management Dashboard with React

![React](https://img.shields.io/badge/React-19.0.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black)

A complete user management system built with React that integrates with the Reqres mock API. Features authentication, paginated user listing, editing, deletion, and client-side search functionality.

## Live Demo
[View on Vercel](https://user-management-blue-seven.vercel.app/)

## Features
- **Secure Authentication** with JWT token storage
- **User Management**:
  - View paginated user lists
  - Edit user details (first name, last name, email)
  - Delete users with confirmation
- **Optimistic UI Updates** for smooth user experience
- **Client-side Search** with debouncing
- **Responsive Design** works on all devices
- **Toast Notifications** for user feedback

## Installation
1. Clone the repository:
```
git clone https://github.com/your-username/user-management-app.git
cd user-management-app
```
2. Install dependencies:
```
npm install
```
4. Run the development server:
```
npm run dev
Open http://localhost:3000 in your browser
```
5. How to Use
```
Login using these test credentials:

Email: eve.holt@reqres.in

Password: cityslicka
```
6. View Users:
```
Browse through paginated user list

Search users by name or email
```
7. Manage Users:
```
Click "Edit" to modify user details

Click "Delete" to remove users (with confirmation)
```
8. Project Structure
```
src/
├── components/
│   ├── UserCard.jsx
│   ├── Pagination.jsx
│   ├── Toast.jsx
│   └── DeleteConfirmation.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── UsersListPage.jsx
├── services/
│   ├── auth.js
│   └── users.js
├── App.js
└── main.jsx
```
9. Deployment
```
This project is configured for easy deployment on Vercel:

Push your code to GitHub

Import the repository in Vercel

Deploy with default settings

The included vercel.json ensures client-side routing works properly.
```
10. Technologies Used
```
React 19

React Router 6

Tailwind CSS

Axios

Lucide React (icons)

use-debounce

Vercel (hosting)
```
11. License
```
MIT License - see LICENSE file for details
```
