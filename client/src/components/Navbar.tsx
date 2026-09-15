import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import DastagirLogo from "./DastagirLogo";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-app-green/8">
      <div className="page-shell flex items-center justify-between h-[76px] gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight shrink-0 text-app-green"
        >
          <DastagirLogo className="size-9 text-app-green" /> Dastagir
        </Link>

        <div className="w-full flex items-center justify-end gap-3 lg:gap-7">
          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-semibold text-app-text-light">
            <Link to="/" className="hover:text-app-green">Home</Link>
            <Link to="/products" className="hover:text-app-green">Shop</Link>
            <Link to="/deals" className="inline-flex items-center gap-1 text-app-orange hover:text-app-orange-dark">
              <SparklesIcon className="size-3.5" /> Deals
            </Link>
          </div>
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md text-xs sm:text-sm"
          >
            <div className="relative w-full">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-green/55" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-app-cream rounded-full border border-app-green/8 focus:border-app-green/30 focus:bg-white"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              aria-label="Open shopping cart"
              className="relative size-10 rounded-full bg-app-cream hover:bg-orange-100 flex-center"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="size-4.5 text-app-green" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-app-orange text-white text-[10px] rounded-full flex-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* User */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-app-cream"
                >
                  <div className="size-8 rounded-full bg-app-green text-white text-xs flex-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDownIcon className="size-3 text-zinc-500" />
                </button>
              ) : (
                <div className="flex-center gap-2">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-app-green rounded-full hover:bg-app-green-light shadow-sm"
                  >
                    <UserIcon size={16} /> Sign In
                  </Link>
                  {userMenuOpen ? (
                    <XIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  ) : (
                    <MenuIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  )}
                </div>
              )}

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                    {user && (
                      <div className="px-4 py-2 border-b border-app-border">
                        <p className="text-sm font-medium text-zinc-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                      </div>
                    )}
                    <div onClick={() => setUserMenuOpen(false)}>
                      {!user && (
                        <Link to="/login" className="dropdown-link">
                          <UserIcon size={16} /> Sign In{" "}
                        </Link>
                      )}

                      {user && (
                        <Link to="/orders" className="dropdown-link">
                          <PackageIcon size={16} /> My Orders{" "}
                        </Link>
                      )}

                      {user && (
                        <Link to="/addresses" className="dropdown-link">
                          <MapPinIcon size={16} /> Addresses{" "}
                        </Link>
                      )}

                      <Link to="/products" className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} /> Products{" "}
                      </Link>

                      <Link to="/deals" className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} /> Deals{" "}
                      </Link>
                      {user?.isAdmin && (
                        <Link to="/admin/products" className="dropdown-link">
                          <ShieldIcon
                            className="text-app-orange-dark"
                            size={16}
                          />{" "}
                          <span className="text-app-orange-dark">
                            Admin Panel
                          </span>{" "}
                        </Link>
                      )}
                      {user && (
                        <div className="border-t border-app-border pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                          >
                            <LogOutIcon size={16} /> Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
