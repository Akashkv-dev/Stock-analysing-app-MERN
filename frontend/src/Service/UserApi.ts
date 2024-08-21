import { axiosInstance } from "../Axios/instance";

type user ={
    name:string,
    email:string,
    password:string
}
type group ={
    gName:string,
    adminId:number
}

export const Register=(userData:user) => {
    return axiosInstance.post('/register', userData);
}

export const verify=(token:string) => {
    return axiosInstance.get(`/verify?token=${token}`,);
}

export const addgroup=(groupData:group)=>{
    return axiosInstance.post('/addgroup',groupData)

}

export const getGroups= (id:number)=>{
    return axiosInstance.get('/getgroup',{
        params:{id}
    })
}

export const addMem=(email:string,Grpid:number)=>{
    return axiosInstance.post('/addMember',{email,Grpid})
}