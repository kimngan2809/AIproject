import axios from "axios";
import { getToken } from "./helper";

// const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_URL
const URL_SERVER = "http://localhost:8800/api"
export const callAPI = async (endpoint, method , body , params) =>{
    const token =  getToken();
    return await axios({
        method: method,
        url: `${URL_SERVER}${endpoint}`, //Ex: https://backend.com + /products
        headers : {"Content-Type": "application/json"},
        data: body,
        params
        
      })
      
}