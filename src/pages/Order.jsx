import { useEffect, useRef, useState } from "react";
import { Input } from "/src/components/ui/input";
import { Plus, SlidersHorizontal, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useWidgetStore } from "/src/store/widgetStore";
import { useItemStore } from "@/store/itemStore";

// TODO :remove react-icons
// TODO: move sidebar to private component,in inventory
const Order = () => {
  const { setShowSidebarIcon, showSidebarIcon } = useWidgetStore();
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { items, addItem, updateItem, deleteItem } = useItemStore();

  // TODO: use motion animation
  const onSearch = async () => {
    setShowSidebarIcon(false);
    await new Promise((res) => setTimeout(res, 500));
    setIsOpen(true);
    inputRef.current.focus();
  };

  const onCancel = async () => {
    inputRef.current.blur();
    setIsOpen(false);
    await new Promise((res) => setTimeout(res, 500));
    setShowSidebarIcon(true);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <header className="mt-3.5  pl-16 pr-4 flex justify-between items-center">
        <motion.div
          initial={false}
          animate={{
            opacity: showSidebarIcon ? 1 : 0,
            scale: showSidebarIcon ? 1 : 0.7,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className=""
        >
          <h1 ref={titleRef} className="text-xl font-semibold tracking-widest">
            Orders
          </h1>
        </motion.div>
        <div className="flex gap-4 relative top-[2px]">
          <motion.div
            initial={false}
            animate={{ x: !isOpen ? -360 : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 left-3 z-50 "
          >
            <Input
              ref={inputRef}
              placeholder="Search..."
              className="m-0 w-[calc(100dvw-110px)] relative bottom-[4px] bg-white/60 focus-visible:ring-white focus-visible:border-none"
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ x: isOpen ? 40 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Search
              onClick={onSearch}
              size={18}
              className="cursor-pointer mr-1"
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ x: isOpen ? 40 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <SlidersHorizontal size={18} className="cursor-pointer" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Plus
              size={18}
              className="cursor-pointer"
              onClick={() => {
                isOpen ? onCancel() : null;
              }}
            />
          </motion.div>
        </div>
      </header>
      <main className="mx-2 overflow-auto flex-1">
        <div className="flex gap-2 font-semibold tracking-wide text-gray-600 mb-1">
          <span className="flex-1">Item Name</span>
          <span className="w-[100px] text-center ">Quantity</span>
        </div>
        {items.map((item) => (
          <div key={item.name} className="flex gap-1">
            <Input
              // placeholder="Enter name..."
              className="flex-1 pointer-events-none p-0 m-0 rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
              value={item.name}
            />
            <div className="flex items-center justify-center w-[100px] ">
              <p
                className=" py-1 w-[30px] text-center"
                onClick={() =>
                  updateItem(
                    item.id,
                    "quantity",
                    Number(item.quantity || 0) - 1
                  )
                }
              >
                -
              </p>
              <Input
                type="number"
                className="p-0 m-0 flex-1 text-center rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
                value={item.quantity || 0}
                onChange={(e) =>
                  updateItem(item.id, "quantity", e.target.value)
                }
                min={0}
              />
              <p
                className=" py-1 w-[30px] text-center"
                onClick={() =>
                  updateItem(
                    item.id,
                    "quantity",
                    Number(item.quantity || 0) + 1
                  )
                }
              >
                +
              </p>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Order;
