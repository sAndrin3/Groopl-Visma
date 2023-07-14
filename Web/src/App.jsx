import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Outlet, useParams } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Leftbar from './components/leftbar/Leftbar';
import Rightbar from './components/rightbar/Rightbar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import "./style.scss";
import { DarkModeContext } from './context/darkModeContext';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const ProfileWrapper = () => {
    const { id } = useParams(); // Access the id parameter from the URL
    return <Profile id={id} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id", // Use :id to define a parameterized route
          element: <ProfileWrapper /> // Render the ProfileWrapper component which extracts the id parameter
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
