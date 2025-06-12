import { useRef, useState } from "react";
import { Input } from "/src/components/ui/input";
import { Plus, PackagePlus, Search } from "lucide-react";
import { motion } from "framer-motion";

// TODO :remove react-icons
// TODO: move sidebar to private component,in inventory
const Inventory = () => {
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onSearch = () => {
    titleRef.current.classList.add("animate-shrinkFade");
    setIsOpen(true);
    // inputRef.current.classList.add("animate-appearFromRight");
    inputRef.current.focus();
  };

  const onCancel = () => {
    titleRef.current.classList.remove("animate-shrinkFade");
    setIsOpen(false);
    inputRef.current.blur();
  };

  const items = [
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
    { name: "Bhakhari", buy: 10, sell: 20 },
    { name: "Dal Makhani", buy: 40, sell: 70 },
    { name: "Tava Roti", buy: 1022, sell: 1542 },
    { name: "Mag Nu Shak", buy: 20, sell: 40 },
  ];

  return (
    <div className="absolute top-1 right-1 left-1 bottom-1 bg-white">
      <header className="py-4 pl-16 pr-4 flex justify-between items-center">
        <h1 ref={titleRef} className="text-xl font-semibold tracking-widest">
          Inventory
        </h1>
        <div className="flex gap-4 relative">
          <motion.div
            initial={false}
            animate={{ x: !isOpen ? -360 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 left-4 z-50 bg-white pb-2"
          >
            <Input
              ref={inputRef}
              placeholder="Search..."
              className="w-[calc(100dvw-110px)]"
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
            <PackagePlus size={18} className="cursor-pointer" />
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
      <main className="mx-2 overflow-auto max-h-[calc(100dvh-130px)]">
        <div className="flex gap-2 font-semibold tracking-wide text-gray-600 mb-1">
          <span className="flex-1">Product Name</span>
          <span className="w-[45px] text-center">Buy</span>
          <span className="w-[45px] text-center">Sell</span>
        </div>
        {items.map((item) => (
          <div key={item.name} className="flex gap-2">
            <Input
              className="p-0 m-0 rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
              value={item.name}
            />
            <Input
              className="p-0 m-0 w-[45px] text-center rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
              value={item.buy}
            />
            <Input
              className="p-0 m-0 w-[45px] text-center rounded-none focus:outline-none focus:ring-0 border-none focus-visible::outline-none focus-visible:ring-0"
              value={item.sell}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Inventory;
