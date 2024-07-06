import React, { useState } from 'react';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


type userData={
    name:string,
    email:string,
    password:string,
}

type errorType={
    name:string,
    email:string,
    password:string,
   
}

const Signup = () => {

   const [userData,setUserData]=useState<userData>({
    name:"",
    email:"",
    password:""
   })

   const [errors, setErrors] = useState<errorType>({
    name:'',
    email:'',
    password:''
   });
   const handleChange=(e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} =e.target;
    let error ='';
        if(name === 'email'){
            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if(!emailPattern.test(value)){
                error='Please enter a valid email address.'
            }
            else {
                error=''
            }
        }
        
        if (name === 'name'){
            if(value.length <3){
                error='Name should be atleast 3 characters'
            }
            else {
                error=''
            }
        }  
        if (name === 'password'){
            if(value.length < 6){
                error='Password should be atleast 6 characters'
            }
            else{
                error=''
            }
        }

        setErrors({
            ...errors,
            [name]: error
          });

        setUserData({
            ...userData,
            [name]:value
        })
        console.log(userData);
        
    }
   
    
    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault()
        if(!(errors.email == '' && errors.name == '' && errors.password == '')){
            console.log(errors);
            
            toast('Please fill in the all fields!');
            return
        }
        else{
            try {
                await axios.post('http://localhost:3000/register',userData)
                .then((response)=>{
                    if(response.status === 200){
                        console.log(response);
                        
                        alert(response.data.message)
                    }else{
                        console.log("unhandled status code:",response.status);
                    }
                })
                .catch((error)=>{
                    if(error.response){
                        console.log(error);
                        toast(error.response.data.message)              
                    }
                    else if(error.request){
                        console.error("no response from server")
                    }
                    else{
                        console.error("request error")
                    }
                })
                
            } catch (error) {
                console.log(error);
                
            }
            
        }
    }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen items-center bg-white shadow-lg overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src="/images/image.png"
              alt="Bitcoin"
              className="hidden sm:hidden md:block lg:block w-80 h-80"            />
          </div>
        </div>
      </div>
      <div className="w-full p-4 h-screen md:w-1/2 flex flex-col justify-center items-center sm:hidden sm:pl-0 md:pl-28 lg:pl-28 md:flex lg:flex background-shape">
      <h2 className="text-2xl font-semibold mb-6 flex justify-center text-white">Signup</h2>
        <div className="w-full sm:w-3/5 md:w-full lg:w-3/4 flex flex-col border px-6 py-4 rounded-md">
          <form>
            <div className="mb-4">
              <label className="block text-white font-quicksand">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                onChange={handleChange}
                name='name'
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-quicksand">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                onChange={handleChange}
                name='email'
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-quicksand">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                onChange={handleChange}
                name='password'
                required
              />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Log in
            </button>
            <ToastContainer />
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-600">or</span>
            <div className="mt-4">
              <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Signup with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
