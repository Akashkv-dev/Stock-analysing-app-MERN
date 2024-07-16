import { axiosInstance } from "../Axios/instance";

type user ={
    name:string,
    email:string,
    password:string
}

export const Register=(userData:user) => {
    return axiosInstance.post('/register', userData);
}