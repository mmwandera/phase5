import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCourse from './admin-components/AddCourse.jsx';
import AdminHome from './admin-components/AdminHome.jsx';
import AdminManagement from './admin-components/AdminManagement.jsx';
import SendMessage from './admin-components/SendMessage.jsx';
import UserManagement from './admin-components/UserManagement.jsx';
import AdminLogin from './authentication-components/AdminLogin.jsx';
import Login from './authentication-components/Login.jsx';
import SignUp from './authentication-components/SignUp.jsx';
import AboutUs from './client-side-components/AboutUs.jsx';
import ContactUs from './client-side-components/ContactUs.jsx';
import CourseView from './client-side-components/CourseView.jsx';
import Home from './client-side-components/Home.jsx';
import MyCourses from './client-side-components/MyCourses.jsx';
import Profile from './client-side-components/Profile.jsx';
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-courses",
    element: <MyCourses />,
  },
  {
    path: "/course-view",
    element: <CourseView />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/dashboard",
    element: <AdminHome />,
  },
  {
    path: "/dashboard/admin-management",
    element: <AdminManagement />,
  },
  {
    path: "/dashboard/user-management",
    element: <UserManagement />,
  },
  {
    path: "/dashboard/add-course",
    element: <AddCourse />,
  },
  {
    path: "/user-management/send-message",
    element: <SendMessage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
