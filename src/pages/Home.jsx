import PageLayout from "/src/components/common/PageLayout";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  return <div>Header</div>;
};

export const Main = () => {
  return <div>Main</div>;
};

export const Footer = () => {
  return <div>Footer</div>;
};

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <PageLayout main={Main} footer={Footer} header={Header} />
    </>
  );
};

export default Home;
