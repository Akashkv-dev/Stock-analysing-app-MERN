import { useNavigate } from "react-router-dom";
import Login from "../../components/User/Login";
import { useEffect } from "react";

const UserLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
      if (token) {
        navigate("/home");
      }
  });
  return (
    <div>
      <Login />
    </div>
  );
};

export default UserLogin;
