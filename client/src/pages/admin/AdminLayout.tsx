import { Navigate, NavLink, Outlet } from "react-router-dom";
import {
  PlusIcon,
  PackageSearchIcon,
  ShoppingBagIcon,
  LogOutIcon,
  BarChart3Icon,
  ShieldIcon,
  Truck,
  TagsIcon,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { user, loading } = useAuth();

  const AdminLinkData = [
    { to: "/admin", label: "Dashboard", icon: BarChart3Icon },
    { to: "/admin/products/new", label: "Add Product", icon: PlusIcon },
    { to: "/admin/products", label: "Products", icon: PackageSearchIcon },
    { to: "/admin/categories", label: "Categories", icon: TagsIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
    { to: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck },
    { to: "/", label: "Exit", icon: LogOutIcon },
  ];
  if (loading) {
    return <></>;
  }
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-lg:hidden">
        <Navbar />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 page-shell py-8 animate-fade-in">
        {/* Admin Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 h-fit surface-card rounded-2xl p-4 lg:sticky lg:top-24">
          <div className="pb-4 mb-4 border-b border-app-green/10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-app-orange px-2 mb-1">Workspace</p>
            <h2 className="text-lg font-bold text-app-green flex items-center gap-2 px-2">
              <ShieldIcon className="size-5 text-app-orange" /> Admin Panel
            </h2>
          </div>
          <nav className="flex flex-row overflow-x-auto lg:flex-col gap-1.5 no-scrollbar">
            {AdminLinkData.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={true}
                className={({ isActive }) =>
                  `whitespace-nowrap flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-app-green text-white shadow-sm" : "text-app-text-light hover:bg-orange-50 hover:text-app-green"}`
                }
              >
                <link.icon className="size-4" /> {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 min-w-0 pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
