import { motion } from "motion/react";
import { Star, Heart, Clock, ShoppingCart } from "lucide-react";
import { MenuItem } from "../types";

interface MenuItemCardProps {
  key?: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function MenuItemCard({
  item,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}: MenuItemCardProps) {
  // Check if item has a discount
  const originalPrice = item.price;
  const currentPrice = item.isSpecialOffer && item.discountPrice ? item.discountPrice : item.price;
  const hasDiscount = item.isSpecialOffer && item.discountPrice !== undefined;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-dagi-gray-dark border border-gold/15 hover:border-gold/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/5 transition-all duration-300 flex flex-col h-full"
    >
      {/* Food Image Container */}
      <div className="relative h-56 overflow-hidden bg-dagi-black">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        
        {/* Dark overlay inside image */}
        <div className="absolute inset-0 bg-gradient-to-t from-dagi-black/85 via-dagi-black/20 to-transparent"></div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          className="absolute top-4 right-4 p-2 rounded-full bg-dagi-black/60 hover:bg-dagi-black backdrop-blur-md text-white border border-gold/10 hover:border-dagi-red transition-colors duration-300 cursor-pointer"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              isFavorite ? "fill-dagi-red text-dagi-red" : "text-white hover:text-dagi-red"
            }`}
          />
        </button>

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {item.isFeatured && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gold text-dagi-black rounded-full shadow-md">
              Chef Special
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-dagi-red text-white rounded-full shadow-md animate-pulse">
              Offer
            </span>
          )}
          <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider bg-dagi-black/80 text-gray-300 rounded-full shadow-md backdrop-blur-sm border border-white/5">
            {item.category}
          </span>
        </div>
      </div>

      {/* Food Information */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Name and Rating Row */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition duration-300 line-clamp-1">
              {item.name}
            </h3>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span className="flex items-center text-gold font-medium">
              <Star className="w-3.5 h-3.5 fill-gold text-gold mr-1" />
              {item.rating.toFixed(1)}
            </span>
            <span>({item.reviews} reviews)</span>
            <span className="flex items-center text-gray-400">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {item.preparationTime} mins
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed flex-grow">
          {item.description}
        </p>

        {/* Price & Action Button Row */}
        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-serif text-xl font-bold text-gold-light">
              ${currentPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(item)}
            className="px-4 py-2.5 bg-gradient-to-r from-dagi-red-dark to-dagi-red hover:from-gold-dark hover:to-gold text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer flex items-center space-x-2 shadow-lg hover:shadow-dagi-red/10"
            id={`add-to-cart-${item.id}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
