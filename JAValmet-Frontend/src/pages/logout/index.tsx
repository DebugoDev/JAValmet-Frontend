import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Role");
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
