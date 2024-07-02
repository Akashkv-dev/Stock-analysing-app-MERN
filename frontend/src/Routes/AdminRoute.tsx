import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Pages/AdminPage/AdminLogin";

const AdminRoute = () => {
  return (
    <Routes>
        <Route path='/login' element={<AdminLogin/>} />
    </Routes>
  )
}

export default AdminRoute