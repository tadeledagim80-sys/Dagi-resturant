import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  openCart: () => void;
  favoritesCount: number;
  openFavorites: () => void;
}

export default function Header({
  activeSection,
  setActiveSection,
  cartCount,
  openCart,
  favoritesCount,
  openFavorites,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to element
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dagi-black/90 backdrop-blur-md py-4 border-b border-gold/20 shadow-lg"
          : "bg-gradient-to-b from-dagi-black/80 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center border-2 border-gold rounded-full bg-dagi-black group-hover:border-dagi-red transition-all duration-300">
              <span className="font-serif text-xl font-bold text-gold group-hover:text-dagi-red transition-all duration-300">
                D
              </span>
              <div className="absolute -inset-0.5 bg-gold rounded-full opacity-0 group-hover:opacity-30 blur transition duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wider text-white group-hover:text-gold transition duration-300">
                DAGI
              </span>
              <span className="text-[9px] font-display uppercase tracking-[0.25em] text-gold">
                Restaurant
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer ${
                  activeSection === item.id
                    ? "text-gold font-semibold"
                    : "text-gray-300 hover:text-gold"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-dagi-red to-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Utility Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Favorites Icon */}
            <button
              onClick={openFavorites}
              className="relative p-2.5 text-gray-300 hover:text-dagi-red hover:bg-dagi-gray-light rounded-full transition duration-300 cursor-pointer"
              title="My Favorites"
              id="favorites-btn"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? "fill-dagi-red text-dagi-red animate-pulse" : ""}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-dagi-red text-[10px] font-bold text-white shadow-md">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-gray-300 hover:text-gold hover:bg-dagi-gray-light rounded-full transition duration-300 cursor-pointer"
              title="Shopping Cart"
              id="cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-dagi-black shadow-md border border-dagi-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Order Button */}
            <button
              onClick={() => handleNavClick("menu")}
              className="px-6 py-2 border border-gold hover:border-dagi-red text-gold hover:text-white bg-transparent hover:bg-gradient-to-r hover:from-dagi-red-dark hover:to-dagi-red text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-dagi-red-dark/30"
              id="header-order-btn"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu & Cart Trigger */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile Favorites */}
            <button
              onClick={openFavorites}
              className="relative p-2 text-gray-300 hover:text-dagi-red"
              id="mobile-fav-btn"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? "fill-dagi-red text-dagi-red" : ""}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-dagi-red text-[9px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-300 hover:text-gold"
              id="mobile-cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-dagi-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-gold hover:bg-dagi-gray-light rounded-md"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dagi-black border-b border-gold/20 overflow-hidden"
            id="mobile-nav-panel"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium uppercase tracking-wide transition duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-dagi-red-dark to-dagi-red text-white"
                      : "text-gray-300 hover:bg-dagi-gray-light hover:text-gold"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gold/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick("menu");
                  }}
                  className="w-full py-3 bg-gradient-to-r from-dagi-red-dark to-dagi-red hover:from-gold-dark hover:to-gold text-white font-semibold uppercase tracking-wider rounded-full shadow-lg"
                >
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
