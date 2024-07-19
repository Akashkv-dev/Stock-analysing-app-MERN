import { Route, Routes } from "react-router-dom";
import UserSignup from '../Pages/UserPage/UserSignup';
import UserLogin from "../Pages/UserPage/UserLogin";
import Home from "../Pages/UserPage/Home";

const UserRoute = () => {
  return (
    <Routes>
        <Route path='/register' element={<UserSignup/>} />
        <Route path="/" element={<UserLogin/>}/>
        <Route path="/home" element={<Home/>}/>
    </Routes>
  )
}

export default UserRoute