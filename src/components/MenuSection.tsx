import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { MenuItem } from "../types";
import MenuItemCard from "./MenuItemCard";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function MenuSection({
  menuItems,
  onAddToCart,
  favorites,
  onToggleFavorite,
}: MenuSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "price-asc" | "price-desc">("rating");

  // Get unique categories and prepend "All"
  const categories = useMemo(() => {
    const cats = new Set(menuItems.map((item) => item.category));
    return ["All", ...Array.from(cats)];
  }, [menuItems]);

  // Today's special offers & featured dishes
  const specialOffers = useMemo(() => {
    return menuItems.filter((item) => item.isSpecialOffer).slice(0, 3);
  }, [menuItems]);

  const featuredDishes = useMemo(() => {
    return menuItems.filter((item) => item.isFeatured).slice(0, 4);
  }, [menuItems]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...menuItems];

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
      );
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const pA = a.isSpecialOffer && a.discountPrice ? a.discountPrice : a.price;
        const pB = b.isSpecialOffer && b.discountPrice ? b.discountPrice : b.price;
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const pA = a.isSpecialOffer && a.discountPrice ? a.discountPrice : a.price;
        const pB = b.isSpecialOffer && b.discountPrice ? b.discountPrice : b.price;
        return pB - pA;
      });
    }

    return result;
  }, [menuItems, selectedCategory, searchTerm, sortBy]);

  return (
    <section id="menu" className="py-24 bg-dagi-black border-t border-gold/10 relative">
      {/* Background elegant details */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-dagi-red-dark/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">
            Curated Culinary Artistry
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Our Exquisite <span className="text-gold-gradient font-serif">Menu</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-dagi-red to-gold mx-auto rounded-full"></div>
        </div>

        {/* --- SECTION 1: TODAY'S SPECIAL OFFERS (IF ALL is selected) --- */}
        {selectedCategory === "All" && searchTerm === "" && specialOffers.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center space-x-3 mb-8">
              <span className="flex h-3 w-3 rounded-full bg-dagi-red animate-pulse"></span>
              <h3 className="font-serif text-2xl font-bold text-white">Today's Special Offers</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialOffers.map((item) => {
                const discountPercentage = Math.round(
                  ((item.price - (item.discountPrice || item.price)) / item.price) * 100
                );
                return (
                  <motion.div
                    key={`special-${item.id}`}
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-dagi-gray-dark to-dagi-black border border-dagi-red-dark/40 hover:border-gold/30 p-6 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
                  >
                    {/* Discount Tag */}
                    <div className="absolute top-4 right-4 bg-dagi-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                      Save {discountPercentage}%
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover border border-gold/20"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base font-bold text-white">{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500 line-through">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-bold text-gold">
                            ${item.discountPrice?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-full py-2.5 bg-gradient-to-r from-dagi-red-dark to-dagi-red hover:from-gold-dark hover:to-gold text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300"
                    >
                      Claim Offer Now
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- SEARCH, FILTER & SORT UTILITY BAR --- */}
        <div className="bg-dagi-gray-dark border border-gold/15 p-6 rounded-3xl shadow-xl space-y-6 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-grow max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for premium dishes, steak, pasta, dessert..."
                className="w-full pl-12 pr-4 py-3.5 bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold rounded-2xl text-sm text-white focus:outline-none placeholder-gray-500 transition-colors"
                id="search-input"
              />
            </div>

            {/* Sorting control */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-wider">
                <ArrowUpDown className="w-4 h-4 text-gold" />
                <span>Sort By:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-dagi-black border border-gold/10 text-xs text-white rounded-xl py-2 px-3 focus:outline-none focus:border-gold cursor-pointer"
                id="sort-select"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="border-t border-gold/10 pt-6">
            <div className="flex items-center space-x-2 mb-3 text-xs text-gray-400 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-gold" />
              <span>Select Category:</span>
            </div>
            
            {/* Scrollable category pill rail */}
            <div className="flex items-center overflow-x-auto pb-2 gap-2 scrollbar-none scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-dagi-red-dark to-dagi-red border-dagi-red text-white shadow-lg shadow-dagi-red-dark/30"
                      : "bg-dagi-black border-gold/10 hover:border-gold/30 text-gray-300 hover:text-white"
                  }`}
                  id={`category-pill-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- MAIN MENU CARD GRID --- */}
        <AnimatePresence mode="popLayout">
          {filteredAndSortedItems.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              id="menu-items-grid"
            >
              {filteredAndSortedItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={onAddToCart}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-gold/15 rounded-3xl bg-dagi-gray-dark/50"
            >
              <Search className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
              <h3 className="font-serif text-xl font-bold text-white mb-2">No Premium Dishes Found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                We couldn't find any dishes matching "{searchTerm}". Please check your spelling or choose another category filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
