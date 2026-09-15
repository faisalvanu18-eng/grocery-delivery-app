import { Outlet } from "react-router-dom";

import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import BottomNavigation from "../components/BottomNavigation";

const AppLayout = () => {
  return (
    <>
      <Banner />
      <Navbar />

      <main className="min-h-screen pb-24 md:pb-28">
        <Outlet />
      </main>

      <Footer />
      <CartSidebar />
      <BottomNavigation />
    </>
  );
};

export default AppLayout;
