import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { Plus, Star, ShoppingBagIcon } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const currency = "₹";

  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-app-green/8 shadow-[0_7px_20px_rgba(20,61,42,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(20,61,42,0.12)] transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-[1.05] overflow-hidden bg-gradient-to-br from-orange-50 via-white to-emerald-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-5 group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.discount > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-app-orange text-white rounded-full shadow-sm">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5 sm:p-4 text-zinc-700">
        <p className="text-[10px] text-app-text-light uppercase tracking-wider font-bold mb-1">{product.unit}</p>
        <h3 className="text-sm font-bold leading-snug mb-2 line-clamp-2 text-app-green">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="size-3 text-app-warning fill-app-warning" />
            <span className="text-xs font-bold text-app-text">
              {product.rating}
            </span>
            <span className="text-xs text-app-text-light">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price + Add */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1 truncate">
            <span className="text-lg font-extrabold text-app-green">
              {currency}
              {product.price.toFixed(1)}
            </span>
            <span className="text-[10px] text-app-text-light block">
              /{product.unit}
            </span>
            {product.originalPrice > product.price && (
              <span className="hidden sm:inline text-[10px] text-app-text-light line-through ml-1">
                {currency}
                {product.originalPrice.toFixed(1)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="h-9 px-2.5 rounded-full bg-app-green text-white flex-center gap-1 shrink-0 hover:bg-app-orange transition-colors active:scale-95"
          >
            <Plus className="size-3.5" /> <ShoppingBagIcon className="hidden sm:block size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
