import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import OrderConfirmation from "./components/OrderConfirmation";
import { MenuItem, CartItem, Order } from "./types";
import { MENU_ITEMS } from "./data/menu";
import { Heart, ShoppingBag, Trash2, X, Plus, Star, ChevronRight, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Cart & Favorites LocalState
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("dagi_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("dagi_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // UI state overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Fetch menu from backend Express API on mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        if (res.ok) {
          const data = await res.json();
          setMenuItems(data);
        } else {
          // Resilient fallback to static import
          setMenuItems(MENU_ITEMS);
        }
      } catch (err) {
        console.warn("Backend API not reachable. Loading premium static menu data.", err);
        setMenuItems(MENU_ITEMS);
      } finally {
        setTimeout(() => setLoading(false), 800); // Smooth premium fade-in
      }
    };
    fetchMenu();
  }, []);

  // Save Cart to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem("dagi_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Favorites to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem("dagi_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Add Item to Cart
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === item.id);
      if (existing) {
        setToast({ message: `Increased quantity of ${item.name} in your bag.`, type: "success" });
        return prev.map((i) =>
          i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      setToast({ message: `Added ${item.name} to your gourmet bag!`, type: "success" });
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  // Update Item Quantity in Cart
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.menuItem.id === id ? { ...i, quantity } : i))
    );
  };

  // Remove Item from Cart
  const handleRemoveItem = (id: string) => {
    const item = cartItems.find((i) => i.menuItem.id === id);
    setCartItems((prev) => prev.filter((i) => i.menuItem.id !== id));
    if (item) {
      setToast({ message: `Removed ${item.menuItem.name} from your bag.`, type: "info" });
    }
  };

  // Toggle Favorite Item
  const handleToggleFavorite = (id: string) => {
    const item = menuItems.find((m) => m.id === id);
    setFavorites((prev) => {
      if (prev.includes(id)) {
        if (item) setToast({ message: `Removed ${item.name} from favorites.`, type: "info" });
        return prev.filter((favId) => favId !== id);
      }
      if (item) setToast({ message: `Added ${item.name} to favorites! ❤️`, type: "success" });
      return [...prev, id];
    });
  };

  const handleOrderConfirmed = (order: Order) => {
    setConfirmedOrder(order);
    setCartItems([]); // Clear cart
  };

  const totalCartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter items that are favorited
  const favoriteItems = menuItems.filter((item) => favorites.includes(item.id));

  return (
    <div className="bg-dagi-black text-white min-h-screen relative font-sans antialiased selection:bg-gold selection:text-dagi-black">
      
      {/* --- PREMIUM SPINNER LOADER --- */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dagi-black z-[100] flex flex-col items-center justify-center space-y-6"
            id="page-loader"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-gold/15 rounded-full"></div>
              <div className="absolute w-16 h-16 border-4 border-t-dagi-red border-r-gold rounded-full animate-spin"></div>
              <span className="absolute font-serif text-2xl font-bold text-gold">D</span>
            </div>
            <div className="text-center space-y-1">
              <h1 className="font-serif text-xl font-bold tracking-wider text-white">DAGI RESTAURANT</h1>
              <p className="text-[10px] font-display uppercase tracking-[0.3em] text-gold animate-pulse">
                Preparing Gourmet Experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-[99] bg-dagi-gray-dark border border-gold/25 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 max-w-sm backdrop-blur-md"
            id="toast-notification"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-gold"></span>
            <p className="text-xs font-semibold text-gray-200">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER NAVIGATION --- */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={totalCartItemsCount}
        openCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        openFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* --- MAIN CORE VIEWS ASSEMBLY --- */}
      <main>
        {/* Home/Hero Section */}
        <Hero onOrderNow={() => {
          setActiveSection("menu");
          document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
        }} />

        {/* Menu Filtering & Card Grid Section */}
        <MenuSection
          menuItems={menuItems}
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* About Restaurant story */}
        <AboutUs />

        {/* Contact info, maps and enquiry form */}
        <ContactUs />
      </main>

      {/* --- FOOTER AT BOTTOM --- */}
      <Footer setActiveSection={setActiveSection} />

      {/* --- SLIDING SHOPPING CART DRAWER --- */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderConfirmed={handleOrderConfirmed}
      />

      {/* --- INTERACTIVE FAVORITES OVERLAY DRAWER --- */}
      <AnimatePresence>
        {isFavoritesOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFavoritesOpen(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
            ></motion.div>

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-dagi-gray-dark border-l border-gold/15 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
              id="favorites-drawer-panel"
            >
              {/* Header */}
              <div className="p-6 border-b border-gold/15 flex items-center justify-between bg-dagi-black">
                <div className="flex items-center space-x-2.5">
                  <Heart className="w-5 h-5 text-dagi-red fill-dagi-red" />
                  <h3 className="font-serif text-lg font-bold text-white">Your Favorites ({favorites.length})</h3>
                </div>
                <button
                  onClick={() => setIsFavoritesOpen(false)}
                  className="p-1.5 rounded-full bg-dagi-gray-light text-gray-400 hover:text-white hover:bg-dagi-red transition cursor-pointer"
                  id="close-favorites-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items list */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {favoriteItems.length > 0 ? (
                  favoriteItems.map((item) => {
                    const price = item.isSpecialOffer && item.discountPrice ? item.discountPrice : item.price;
                    return (
                      <div
                        key={`fav-drawer-${item.id}`}
                        className="bg-dagi-black/50 border border-gold/10 p-4 rounded-2xl flex items-center justify-between gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover border border-gold/10 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-serif text-sm font-bold text-white truncate">{item.name}</h4>
                          <span className="text-[10px] text-gold uppercase tracking-wider block font-semibold mt-0.5">
                            {item.category}
                          </span>
                          <span className="text-xs text-gold-light font-bold mt-1 block">${price.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col items-end justify-between h-full space-y-2">
                          {/* Add to bag action */}
                          <button
                            onClick={() => {
                              handleAddToCart(item);
                              setIsFavoritesOpen(false);
                              setIsCartOpen(true);
                            }}
                            className="p-2 bg-gradient-to-r from-dagi-red-dark to-dagi-red text-white rounded-full hover:from-gold-dark hover:to-gold hover:text-dagi-black transition shadow cursor-pointer"
                            title="Quick add to cart"
                            id={`fav-add-cart-${item.id}`}
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                          
                          {/* Trash button */}
                          <button
                            onClick={() => handleToggleFavorite(item.id)}
                            className="text-gray-500 hover:text-dagi-red-light transition cursor-pointer"
                            title="Remove from favorites"
                            id={`fav-remove-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-20" id="empty-favorites-state">
                    <Heart className="w-16 h-16 text-dagi-red/20 mx-auto mb-4 animate-pulse" />
                    <h4 className="font-serif text-lg font-bold text-white mb-2">No Favorites Yet</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">
                      Explore our exquisite menu and tap the heart icon on any gourmet dish to save it here!
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gold/15 bg-dagi-black text-center">
                <button
                  onClick={() => setIsFavoritesOpen(false)}
                  className="w-full py-3.5 border border-gold/30 hover:border-gold text-gold hover:text-white bg-transparent rounded-full font-semibold uppercase tracking-wider text-xs transition"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- GOURMET ORDER SUCCESS RECIPIENT DIALOG --- */}
      <AnimatePresence>
        {confirmedOrder && (
          <OrderConfirmation
            order={confirmedOrder}
            onClose={() => setConfirmedOrder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
