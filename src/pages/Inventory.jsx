import { useEffect, useRef, useState } from "react";
import { Input } from "/src/components/ui/input";
import { Plus, SlidersHorizontal, Search, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useWidgetStore } from "/src/store/widgetStore";
import { useItemStore } from "@/store/itemStore";

// TODO :remove react-icons
// TODO: move sidebar to private component,in inventory
const Inventory = () => {
  const { setShowSidebarIcon, showSidebarIcon } = useWidgetStore();
  const { items, addItem, updateItem, deleteItem } = useItemStore();
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleAddItem = () => {
    addItem({ name: "", buy: "", sell: "", deleted: 0, quantity: 0 });
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
            Inventory
          </h1>
        </motion.div>
        <div className="flex gap-4 relative top-[2px]">
          {items.length > 0 && (
            <>
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
            </>
          )}
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Plus
              size={18}
              className="cursor-pointer"
              onClick={isOpen ? onCancel : handleAddItem}
            />
          </motion.div>
        </div>
      </header>
      <main className="mx-2 overflow-auto flex-1">
        {items?.length > 0 ? (
          <>
            <div className="flex gap-2 font-semibold tracking-wide text-gray-600 mb-1">
              <span className="flex-1">Item Name</span>
              <span className="w-[45px] text-center">Buy</span>
              <span className="w-[45px] text-center">Sell</span>
            </div>
            {items.map((item) => (
              <div key={item.id} className="flex gap-2">
                <Input
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                  placeholder="Enter name..."
                  className="p-0 m-0 rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
                  value={item.name}
                />
                <Input
                  onChange={(e) => updateItem(item.id, "buy", e.target.value)}
                  type="number"
                  placeholder="0.00"
                  className=" p-0 m-0 w-[45px] text-center rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
                  value={item.buy}
                />
                <Input
                  onChange={(e) => updateItem(item.id, "sell", e.target.value)}
                  type="number"
                  placeholder="0.00"
                  className=" p-0 m-0 w-[45px] text-center rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
                  value={item.sell}
                />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Inventory;
