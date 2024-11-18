import axios from "axios";

const Login = async (person: object) => {
  const api = axios.create({ baseURL: "http://localhost:8000" });

  try {
    const response = await api.post("/api/login", person);

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    if (response.status === 201) {
      console.log(response.status);
      console.log(response.data.access);
    } else {
      console.log(response.status);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default Login;