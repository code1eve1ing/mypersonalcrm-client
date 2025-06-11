import { Button } from "/src/components/ui/button";
import PageLayout from "/src/components/common/PageLayout";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Package } from "lucide-react";
import { Input } from "/src/components/ui/input";

export const Header = () => {
  return <div>Inventory</div>;
};

export const Main = ({ items, setItems }) => {
  if (items?.length === 0) {
    return <>No items added</>;
  }

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      update: "true",
      [field]:
        field === "buy" || field === "sell" ? parseFloat(value) || 0 : value,
    };
    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <div className=" flex-1 px-3 text-sm">Item</div>
        <div className="w-12 text-center text-sm">Buy</div>
        <div className="w-12 text-center text-sm">Sell</div>
      </div>
      {items.map((item, index) => (
        <div className="flex gap-1" key={index}>
          <Input
            placeholder="Product name"
            value={item.name}
            className="border-gray-100"
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <Input
            placeholder="0.00"
            type="number"
            value={item.buy}
            className="w-12 px-1 text-center border-gray-100 text-red-400"
            onChange={(e) => handleChange(index, "buy", e.target.value)}
          />
          <Input
            placeholder="0.00"
            type="number"
            value={item.sell}
            className="w-12 px-1 text-center border-gray-100 text-green-600"
            onChange={(e) => handleChange(index, "sell", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export const Footer = ({ handleCreateNewItem }) => {
  return (
    <>
      <Button
        variant="ghost"
        onClick={handleCreateNewItem}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-indigo-200 hover:bg-gray-50 hover:text-indigo-600"
      >
        {/* <Icon className="h-5 w-5" /> */}
        <Package />
        Create New Item
      </Button>
      <div className="text-center ml-6 mr-3">
        <span className="underline text-indigo-600">Categories</span>
      </div>
    </>
  );
};

const Inventory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const newItem = { name: "", buy: "", sell: "", new: true };
  const [items, setItems] = useState([]);

  const onCreateNewItem = () => {
    setItems((v) => [newItem, ...v]);
  };

  useEffect(() => {
    const createItem = searchParams.get("create-item");
    if (createItem) {
      console.log("use effect called....");
      setItems((v) => [newItem, ...v]);
    }
  }, []);

  return (
    <>
      <PageLayout
        main={<Main items={items} setItems={setItems} />}
        footer={<Footer handleCreateNewItem={onCreateNewItem} />}
        header={<Header />}
      />
    </>
  );
};

export default Inventory;
