import axios from "axios";

const env = import.meta.env;

export const login = async (email, password) => {
  try {
    const endPoint = env.VITE_BASE_URL + env.VITE_LOGIN_URL;
    const res = await axios.post(endPoint, {
      email,
      password,
    });
    if (res.status === 200) {
      return res.data.token;
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("authToken");
  } catch (error) {
    console.log(error);
  }
};
