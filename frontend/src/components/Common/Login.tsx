import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

type Props={
    head:string,
    loginType:'user' | 'admin';
}

export const Login = ({head,loginType}:Props) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error,setError] = useState<boolean>(false)
  const [errorMsg, setErrormsg] = useState<string | null>(null);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setErrormsg(null)
    if(!email.trim()){
      setError(true)
      setErrormsg('Enter the email')
      return
    }
    else if(!password.trim()){
      setError(true)
      setErrormsg("Enter the password");
      return;
    }
    try {
      await axios.post(`http://localhost:3000/${loginType === 'user'? 'login' : 'admin/login'}`,
        {email,password}
      )
      .then((response)=>{
        if(response.status === 200){
          console.log(response);
          
        }else{
          console.log("unhandled status code:",response.status);
      }
      })
      .catch((err)=>{
        if(err.response){
          console.log(err.response);
          setError(true)
          setErrormsg(err.response.data.message)
          
        }else if(err.request){
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
  return (
    <div className="flex flex-col md:flex-row w-full h-screen items-center bg-white shadow-lg overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src="/images/image.png"
              alt="Bitcoin"
              className="hidden sm:hidden md:block lg:block w-80 h-80"/>
          </div>
        </div>
      </div>
      <div className="w-full p-4 h-screen md:w-1/2 flex flex-col justify-center items-center sm:hidden sm:pl-0 md:pl-28 lg:pl-28 md:flex lg:flex background-shape">
      <h2 className="text-2xl font-semibold mb-6 flex justify-center text-white">{head}</h2>
        <div className="w-full sm:w-3/5 md:w-full lg:w-3/4 flex flex-col border px-6 py-4 rounded-md">
        {error && <p className='text-center text-red-500'>{errorMsg}</p>}
          <form>
            <div className="mb-4">
              <label className="block text-white font-quicksand">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                autoComplete='email'
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-quicksand">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </form>
          <div className='flex justify-end text-white font-extralight pr-2 pt-2 text-sm'><Link to={''}>forgot password</Link></div>
          {loginType == "user"? 
          <div className="mt-2 text-center flex flex-col">
            <span className='text-white font-quicksand'>Don't have an account? 
              <a href="/register" className='text-blue-400'>Signup</a></span>
            <span className="text-gray-600">or</span>
            <div className="mt-4">
              <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Log in with Google
              </button>
            </div>
          </div>
          :null
        }
        </div>
      </div>
    </div>
  )
}

