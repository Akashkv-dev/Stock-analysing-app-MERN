import { axiosInstance } from "../Axios/instance";

type user ={
    name:string,
    email:string,
    password:string
}

export const Register=(userData:user) => {
    return axiosInstance.post('/register', userData);
}

export const verify=(token:string) => {
    return axiosInstance.get(`/verify?token=${token}`,);
}

export const addgroup=(groupName:string)=>{
    return axiosInstance.post('/addgroup',{groupName})

}