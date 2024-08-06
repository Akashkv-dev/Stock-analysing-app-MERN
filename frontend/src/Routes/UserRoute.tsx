import { Route, Routes } from "react-router-dom";
import UserSignup from '../Pages/UserPage/UserSignup';
import UserLogin from "../Pages/UserPage/UserLogin";
import Home from "../Pages/UserPage/Home";
import Verify from "../components/User/Verify";

const UserRoute = () => {
  return (
    <Routes>
        <Route path='/register' element={<UserSignup/>} />
        <Route path="/" element={<UserLogin/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/home" element={<Home/>}/>
    </Routes>
  )
}

export default UserRoute