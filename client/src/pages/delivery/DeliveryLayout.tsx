import { Outlet, useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";

import type { DeliveryPartner } from "../../types";
import DastagirLogo from "../../components/DastagirLogo";

export default function DeliveryLayout() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState<DeliveryPartner | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("delivery_partner");
    const token = localStorage.getItem("delivery_token");
    if (!saved || !token) {
      navigate("/delivery/login");
      return;
    }
    setPartner(JSON.parse(saved));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("delivery_partner");
    localStorage.removeItem("delivery_token");
    setPartner(null);
    navigate("/delivery/login");
  };

  if (!partner) return null;

  return (
    <div className="min-h-screen bg-app-cream">
      {/* Top Bar */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-app-green/8 sticky top-0 z-40">
        <div className="page-shell h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <DastagirLogo className="size-9 text-app-green" />
            <span className="text-lg font-bold text-app-green">
              Dastagir Delivery
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-zinc-600">
              {partner.name}
            </span>
            <button
              onClick={handleLogout}
              className="p-2.5 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="page-shell py-8 flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
