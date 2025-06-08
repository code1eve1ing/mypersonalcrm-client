import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      Home <button onClick={handleClick}>logout</button>
    </>
  );
};

export default Home;
