import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  ShoppingCart,
  Boxes,
  LogOut,
  Menu,
  X,
  CornerDownLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "/src/components/ui/button";
import { Card } from "/src/components/ui/card";

const links = [
  { name: "Home", icon: Home, to: "/" },
  { name: "Orders", icon: ShoppingCart, to: "/orders" },
  { name: "Inventory", icon: Boxes, to: "/inventory" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const location = useLocation();

  // TODO: create common component for sidebar
  return (
    <>
      {/* Floating Toggle Button */}
      <motion.div
        initial={false}
        animate={{ x: !isOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-4 left-4 z-50"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className={`shadow-md bg-white `}
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </Button>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ x: !isActionOpen ? 0 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsActionOpen(true)}
          className={`shadow-md bg-white `}
        >
          <CornerDownLeft className="h-5 w-5 text-gray-700" />
        </Button>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ x: isActionOpen ? 0 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 bottom-0 h-full w-64 bg-white shadow-xl border-r z-40"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-xl font-bold text-gray-800">Actions</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsActionOpen(false)}
            className="text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Card className="border-0 shadow-none px-2 py-4">
          <nav className="space-y-1">
            {["Re Order", "Delete"].map((name) => (
              <Link key={name}>
                <Button
                  onClick={() => setIsActionOpen(false)}
                  variant="ghost"
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors`}
                >
                  <span>{name}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </Card>

        {/* <div className="absolute bottom-4 left-0 w-full px-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-3 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div> */}
      </motion.div>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r z-40"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-xl font-bold text-gray-800">Personal CRM</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Card className="border-0 shadow-none px-2 py-4">
          <nav className="space-y-1">
            {links.map(({ name, icon: Icon, to }) => (
              <Link key={name} to={to}>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors ${
                    location.pathname === to
                      ? "bg-gray-100 text-indigo-600 font-semibold"
                      : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </Card>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-3 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
