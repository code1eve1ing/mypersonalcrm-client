import { Button } from "/src/components/ui/button";
import PageLayout from "/src/components/common/PageLayout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { Input } from "/src/components/ui/input";

export const Header = () => {
  return <div>Inventory</div>;
};

export const Main = () => {
  const items = [
    { name: null, buy: null, sell: null },
    { name: "Macroni", buy: 199, sell: 299 },
    { name: "Shrikhand", buy: 50, sell: 100 },
    { name: "Burger", buy: 75, sell: 150 },
  ];
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <div className="flex gap-1">
          <Input
            placeholder="Product name"
            value={item.name}
            className="border-gray-100"
          />
          <Input
            placeholder="0.00"
            type="number"
            value={item.buy}
            className="w-12 px-1 text-center border-gray-100 text-red-400"
          />
          <Input
            placeholder="0.00"
            type="number"
            value={item.sell}
            className="w-12 px-1 text-center border-gray-100 text-green-600"
          />
        </div>
      ))}
    </div>
  );
};

export const Footer = () => {
  return (
    <>
      <Button
        variant="ghost"
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-indigo-200 hover:bg-gray-50 hover:text-indigo-600"
      >
        {/* <Icon className="h-5 w-5" /> */}
        <Package />
        <span>Create New Item</span>
      </Button>
      <div className="text-center ml-6 mr-3">
        <span className="underline text-indigo-600">Categories</span>
      </div>
    </>
  );
};

const Inventory = () => {
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

export default Inventory;
