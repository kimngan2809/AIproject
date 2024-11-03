import axios from "axios";
import { getToken } from "./helper";

// const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_URL
const URL_SERVER = "http://localhost:8800/api";

export const callAPI = async (endpoint, method, body, params, isFormData = false, token) => {
  let headers = {};
  
  if (!isFormData) {
    headers["Content-Type"] = "application/json"; // Chỉ thêm Content-Type nếu không phải FormData
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return await axios({
    method: method,
    url: `${URL_SERVER}${endpoint}`, // URL endpoint
    headers: headers,
    data: body,
    params: params
  });
};
