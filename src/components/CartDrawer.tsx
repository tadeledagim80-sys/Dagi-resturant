import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowLeft, Send, CheckCircle, MapPin } from "lucide-react";
import { CartItem, MenuItem, Order } from "../types";
import MapPicker from "./MapPicker";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onOrderConfirmed: (order: Order) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOrderConfirmed,
}: CartDrawerProps) {
  const [view, setView] = useState<"cart" | "checkout">("cart");

  // Checkout Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.menuItem.isSpecialOffer && item.menuItem.discountPrice 
      ? item.menuItem.discountPrice 
      : item.menuItem.price;
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 40 ? 0 : 5.00;
  const taxRate = 0.08; // 8%
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  const handleLocationSelected = (location: { lat: number; lng: number }, selectedAddress: string) => {
    setCoords(location);
    setAddress(selectedAddress);
  };

  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setSubmitError("Please fill in all requested contact and delivery fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: name,
          phone,
          email,
          address,
          items: cartItems,
          total,
          location: coords,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit order.");
      }

      const confirmedOrder: Order = await response.json();
      
      // Clear form and view states
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setView("cart");
      
      // Trigger confirmation callback
      onOrderConfirmed(confirmedOrder);
      onClose();
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Something went wrong while placing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          ></motion.div>

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-dagi-gray-dark border-l border-gold/15 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/15 flex items-center justify-between bg-dagi-black">
              {view === "checkout" ? (
                <button
                  onClick={() => setView("cart")}
                  className="flex items-center space-x-2 text-gold hover:text-white transition-colors cursor-pointer"
                  id="checkout-back-btn"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Back to Cart</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-lg font-bold text-white">Your Shopping Bag</h3>
                  <span className="px-2 py-0.5 rounded-full bg-dagi-red text-[10px] font-bold text-white">
                    {cartItems.length}
                  </span>
                </div>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-dagi-gray-light text-gray-400 hover:text-white hover:bg-dagi-red transition duration-300 cursor-pointer"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Scroll Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {view === "cart" ? (
                /* --- VIEW: SHOPPING CART LIST --- */
                cartItems.length > 0 ? (
                  <div className="space-y-4" id="cart-items-list">
                    {cartItems.map((item) => {
                      const itemPrice = item.menuItem.isSpecialOffer && item.menuItem.discountPrice 
                        ? item.menuItem.discountPrice 
                        : item.menuItem.price;
                      return (
                        <div
                          key={`cart-${item.menuItem.id}`}
                          className="bg-dagi-black/60 border border-gold/10 p-4 rounded-2xl flex items-center justify-between gap-4 group hover:border-gold/30 transition-all duration-300"
                        >
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-16 h-16 rounded-xl object-cover border border-gold/10 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />

                          <div className="flex-grow min-w-0">
                            <span className="text-[9px] text-gold uppercase tracking-wider font-semibold">
                              {item.menuItem.category}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-white truncate">
                              {item.menuItem.name}
                            </h4>
                            <p className="text-xs text-gold-light font-medium mt-1">
                              ${itemPrice.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-between h-full space-y-2">
                            {/* Quantity Adjusters */}
                            <div className="flex items-center space-x-2 bg-dagi-gray-light rounded-lg p-1 border border-gold/5">
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                                className="p-1 text-gray-400 hover:text-gold transition cursor-pointer"
                                id={`qty-minus-${item.menuItem.id}`}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-semibold text-white px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                                className="p-1 text-gray-400 hover:text-gold transition cursor-pointer"
                                id={`qty-plus-${item.menuItem.id}`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Remove Icon */}
                            <button
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="text-gray-500 hover:text-dagi-red-light transition cursor-pointer"
                              id={`remove-item-${item.menuItem.id}`}
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20" id="empty-cart-state">
                    <ShoppingBag className="w-16 h-16 text-gold/30 mx-auto mb-4 animate-bounce" />
                    <h4 className="font-serif text-lg font-bold text-white mb-2">Your Bag is Empty</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
                      Looks like you haven't added any gourmet delights to your bag yet.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-dagi-black font-semibold text-xs uppercase tracking-wider rounded-full hover:from-dagi-red hover:to-dagi-red hover:text-white transition duration-300"
                    >
                      Start Ordering
                    </button>
                  </div>
                )
              ) : (
                /* --- VIEW: CHECKOUT FORM & GEOLOCATION --- */
                <form onSubmit={handlePlaceOrder} className="space-y-6" id="checkout-form">
                  <h4 className="font-serif text-lg font-bold text-white border-b border-gold/10 pb-2">
                    Delivery & Contact Details
                  </h4>

                  {submitError && (
                    <div className="p-3.5 bg-dagi-red/10 border border-dagi-red text-dagi-red-light text-xs rounded-xl">
                      {submitError}
                    </div>
                  )}

                  {/* Customer Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dagim Tadele"
                      className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                      id="customer-name-input"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +251 912 345 678"
                      className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                      id="customer-phone-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. user@example.com"
                      className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                      id="customer-email-input"
                    />
                  </div>

                  {/* Google Maps & Geolocation Address Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">
                      Map Geolocation & Delivery Point *
                    </label>
                    
                    {/* The Maps Integration Picker */}
                    <MapPicker onLocationSelected={handleLocationSelected} />
                  </div>

                  {/* Manual Address fallback / clarification */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">
                      Custom Delivery Instructions or Apartment/Room #
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter precise apartment room number or nearby landmarks..."
                      rows={3}
                      className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-sm text-white focus:outline-none resize-none"
                      id="customer-address-input"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Drawer Footer Section (Receipt / Action Button) */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gold/15 bg-dagi-black space-y-4">
                {/* Bill details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Gourmet Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery Service Fee</span>
                    <span>{deliveryFee === 0 ? <span className="text-gold font-medium">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>V.A.T (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gold/10 pt-2 flex justify-between text-sm font-bold text-white">
                    <span>Total Cost</span>
                    <span className="text-gold-light text-base">${total.toFixed(2)}</span>
                  </div>
                </div>

                {view === "cart" ? (
                  <button
                    onClick={() => setView("checkout")}
                    className="w-full py-3.5 bg-gradient-to-r from-dagi-red-dark to-dagi-red hover:from-gold-dark hover:to-gold text-white hover:text-dagi-black font-semibold uppercase tracking-wider text-xs rounded-full transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                    id="checkout-proceed-btn"
                  >
                    <span>Proceed to Checkout</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-dark to-gold text-dagi-black font-semibold uppercase tracking-wider text-xs rounded-full hover:from-dagi-red hover:to-dagi-red hover:text-white transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                    id="place-order-btn"
                  >
                    <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-bounce" : ""}`} />
                    <span>{isSubmitting ? "Processing Gourmet Order..." : "Place Delivery Order"}</span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
