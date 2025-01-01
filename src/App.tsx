import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Container from "./components/auth/container";
import LoginForm from "./components/auth/login/loginForm";
import SignupForm from "./components/auth/signup/signupForm";
import EmailConfirmationForm from "./components/auth/signup/emailConfirmationForm";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import MainDashboard from "./components/dashboard/mainDashboard/mainDashboard";
import Information from "./components/dashboard/bodyInformation/information";
import Setting from "./components/dashboard/setting/setting";
import Clothes from "./components/dashboard/clothes/clothes";
import HomePage from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/landing" />,
  },
  {
    path: "/auth",
    element: <Container />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignupForm /> },
      { path: "confirm-email", element: <EmailConfirmationForm /> },
    ],
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "", element: <MainDashboard /> },
      { path: "info", element: <Information /> },
      { path: "clothes", element: <Clothes /> },
      { path: "setting", element: <Setting /> },
    ],
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
