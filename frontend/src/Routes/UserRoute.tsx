import { Route, Routes } from "react-router-dom";
import UserSignup from '../Pages/UserPage/UserSignup';
import UserLogin from "../Pages/UserPage/UserLogin";

const UserRoute = () => {
  return (
    <Routes>
        <Route path='/register' element={<UserSignup/>} />
        <Route path="/login" element={<UserLogin/>}/>
    </Routes>
  )
}

export default UserRoute