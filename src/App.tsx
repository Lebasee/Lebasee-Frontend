import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/auth/container";
import LoginForm from "./components/auth/login/loginForm";
import SignupForm from "./components/auth/signup/signupForm";
import EmailConfirmationForm from "./components/auth/signup/emailConfirmationForm";

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
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
