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

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/Landing",
    element: <Landing />,
  },
  {
    path: "/",
    element: <Navigate to="/landing" />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
