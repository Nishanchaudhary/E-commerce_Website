import axios from "axios";
import { toast } from "react-toastify";
export const baseUrl = "https://fakestoreapi.com/";

export const apiCallInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await apiCallInstance.get("products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginFunction = async (data) => {
  try {
    const response = await apiCallInstance.post("auth/login", data);
    toast.success("Login Successfull");
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    toast.error(error?.response.data);
  }
};

export const addUser = async (data) => {
  try {
    const response = await apiCallInstance.post("users", data);
    toast.success("User Registered");
    console.log(response.data);
  } catch (error) {
    toast.error("Error");
  }
};

export const profile = async(data) =>{
  try{
    const response = await apiCallInstance.get("users/1", data);
    console.log(response.data);
  } catch(error){
console.log(error);
  }
}

