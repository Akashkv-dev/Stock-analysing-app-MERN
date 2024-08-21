import axios from 'axios'
import {API_URL} from './BaseURL'


export const axiosInstance = axios.create({
    baseURL:API_URL,
    headers : {
        'Content-Type' : 'application/json'
    }
});

axiosInstance.interceptors.request.use(async(req)=>{
    const token= localStorage.getItem('token')
    // console.log(token);
    
    if(token){
        req.headers.Authorization=`Bearer ${token}`
    }
    return req;
})