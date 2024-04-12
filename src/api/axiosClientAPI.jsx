"use client"
import axios from "axios";
import { baseURL } from "./baseURL";

/**
 * 
 * Axios Cofig file
 * 
 **/



const axiosClientAPI = axios.create({
    baseURL: `${baseURL}api/`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
  }
)


export default axiosClientAPI;
