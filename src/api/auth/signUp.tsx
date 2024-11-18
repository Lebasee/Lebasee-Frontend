import axios from "axios";

const SignUp = async (person: object) => {
  const api = axios.create({ baseURL: "http://localhost:8000" });

  try {
    console.log(person);
    const response = await api.post("/api/signup", person);
    console.log(response);

    if (response.status === 200) {
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

export default SignUp;