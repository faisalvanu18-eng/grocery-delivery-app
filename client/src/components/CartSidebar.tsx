import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const CartSidebar = () => {
  const currency = "₹";

  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-app-green/45 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-app-green/8">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-xl bg-orange-50 text-app-orange flex-center"><ShoppingBagIcon className="size-5" /></div>
            <div><h2 className="text-lg font-bold text-app-green">Your basket</h2><p className="text-xs text-app-text-light">Ready when you are</p></div>
            <span className="px-2 py-0.5 text-xs font-bold bg-app-cream rounded-full">
              {items.length} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-app-cream transition-colors"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="size-20 rounded-full bg-orange-50 flex-center mb-4"><ShoppingBagIcon className="size-9 text-app-orange" /></div>
              <h3 className="text-lg font-bold mb-1 text-app-green">Your basket is empty</h3>
              <button onClick={() => setIsCartOpen(false)} className="button-primary mt-4">Continue shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-app-cream/70 rounded-2xl p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-16 rounded-xl object-cover shrink-0 bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-app-green truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-app-text-light">
                    {currency}
                    {item.product.price.toFixed(2)} / {item.product.unit}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="size-7 rounded-lg bg-white border border-app-border flex-center"
                      >
                        <MinusIcon className="size-3" />
                      </button>

                      <span className="text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="size-7 rounded-lg bg-white border border-app-border flex-center"
                      >
                        <PlusIcon className="size-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {currency}
                        {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-app-text-light hover:text-app-error transition-colors"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-app-green/8 space-y-3 bg-app-cream/40">
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">Subtotal</span>
              <span className="font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">Delivery</span>
              <span className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-app-success">Free</span>
                ) : (
                  `${currency}${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="text-xs text-app-text-light text-center">
                Free delivery on orders over {currency}20!
              </p>
            )}

            <div className="flex justify-between text-lg font-extrabold text-app-green border-t border-app-green/10 pt-3">
              <span>Total</span>
              <span>
                {currency}
                {grandTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3.5 bg-app-orange text-white font-bold rounded-full hover:bg-app-orange-dark transition-colors flex-center gap-2 active:scale-[0.98] shadow-lg shadow-orange-500/20"
            >
              Proceed to Checkout <ArrowRightIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
