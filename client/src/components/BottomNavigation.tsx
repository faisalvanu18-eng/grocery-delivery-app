import { HomeIcon, LayoutGridIcon, ShoppingBagIcon, ShoppingCartIcon, SparklesIcon, UserRoundIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const BottomNavigation = () => {
  const { user } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const accountPath = user ? "/orders" : "/login";
  const items = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/products", label: "Shop", icon: LayoutGridIcon },
    { to: "/deals", label: "Deals", icon: SparklesIcon },
    { to: accountPath, label: user ? "Orders" : "Account", icon: user ? ShoppingBagIcon : UserRoundIcon },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:bottom-5 md:w-[430px] z-50 px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2 bg-white/95 backdrop-blur-xl border-t md:border border-app-green/10 md:rounded-2xl md:shadow-2xl md:shadow-app-green/15">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {items.slice(0, 2).map((item) => (
          <NavLink key={item.label} to={item.to} className={({ isActive }) => `flex flex-col items-center gap-1 py-1 text-[10px] font-bold ${isActive ? "text-app-orange" : "text-app-text-light"}`}>
            <item.icon className="size-5" />
            {item.label}
          </NavLink>
        ))}
        <button onClick={() => setIsCartOpen(true)} className="relative -mt-7 mx-auto size-14 rounded-full bg-app-orange text-white shadow-lg shadow-orange-500/30 flex-center border-4 border-app-cream" aria-label="Open cart">
          <ShoppingCartIcon className="size-5" />
          {cartCount > 0 && <span className="absolute -right-1 -top-1 min-w-5 h-5 px-1 rounded-full bg-app-green text-[10px] font-bold flex-center">{cartCount}</span>}
        </button>
        {items.slice(2).map((item) => (
          <NavLink key={item.label} to={item.to} className={({ isActive }) => `flex flex-col items-center gap-1 py-1 text-[10px] font-bold ${isActive ? "text-app-orange" : "text-app-text-light"}`}>
            <item.icon className="size-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
