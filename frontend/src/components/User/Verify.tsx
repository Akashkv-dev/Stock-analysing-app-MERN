import  { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verify } from '../../Service/UserApi';

const Verify = () => {
    const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) {
        alert("Invalid token");
        return;
      }

      try {
        const response =await verify(token);
        if (( response).status === 200) {
          console.log(response);
          const name= response.data.name
          const email = response.data.email
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          navigate('/home');
        }
      } catch (error) {
        console.error("Verification failed", error);
        alert("Verification failed");
      }
    };

    verifyToken();
  }, [location, navigate]);
  return <div>Verifying...</div>;
}

export default Verify