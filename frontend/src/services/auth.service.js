import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const register = (userName, 
  password, 
  firstName, 
  lastName,
  email, 
  profile) => {
  return axios.post(API_URL + "signup", {
    userName, 
    password, 
    firstName, 
    lastName,
    email, 
    profile
  });
};

const login = (userName, password) => {
  console.log(API_URL + "login")
  return axios
    .post(API_URL + "login", {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = (userName) => {
  console.log(userName)
  const data = {
    userName: userName
  }
  axios.post(API_URL + "logout", data, { 
		headers: authHeader()
	})
  .then((response) => {
    localStorage.removeItem("user");
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
