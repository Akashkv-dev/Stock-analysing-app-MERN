import { useNavigate } from "react-router-dom";
import { Home as Homepage } from "../../components/User/Home";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
      }
    
  });
  return (
    <div>
      <Homepage />
    </div>
  );
};

export default Home;
