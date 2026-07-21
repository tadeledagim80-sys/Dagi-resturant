import { motion } from "motion/react";
import { CheckCircle, Clock, MapPin, Check, Heart, HelpCircle, Utensils, Truck } from "lucide-react";
import { Order } from "../types";

interface OrderConfirmationProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderConfirmation({ order, onClose }: OrderConfirmationProps) {
  if (!order) return null;

  const steps = [
    { label: "Order Received", desc: "Confirming items", icon: CheckCircle, status: "completed" },
    { label: "Kitchen Preparation", desc: "Chef is cooking", icon: Utensils, status: "active" },
    { label: "Out for Delivery", desc: "Fast dispatcher", icon: Truck, status: "pending" },
    { label: "Delivered", desc: "Bon Appétit!", icon: Check, status: "pending" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dagi-black/95 flex items-center justify-center p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-dagi-gray-dark border border-gold/20 rounded-3xl overflow-hidden shadow-2xl"
        id="order-confirmation-panel"
      >
        {/* Top gold line indicator */}
        <div className="h-1.5 bg-gradient-to-r from-dagi-red to-gold"></div>

        {/* Success Header banner */}
        <div className="p-8 text-center bg-gradient-to-b from-dagi-black/80 to-transparent space-y-3">
          <div className="w-16 h-16 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          
          <span className="text-[10px] text-gold uppercase tracking-widest font-bold block">
            Gourmet Order Confirmed
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Thank you for dining with DAGI!
          </h2>
          <p className="text-xs text-gray-400">
            We've received your order and our master chefs have started preparing your delicacies.
          </p>
        </div>

        {/* Info Grid Card */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-dagi-black/40 border border-gold/10 p-6 rounded-2xl">
            {/* Left Col */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Order ID Reference</span>
                <span className="text-lg font-mono font-bold text-white">{order.id}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Estimated Delivery</span>
                <span className="text-base font-bold text-gold-light flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1.5 text-gold" />
                  {order.estimatedDeliveryTime} (Arriving hot!)
                </span>
              </div>
            </div>

            {/* Right Col */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-gold/10 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Deliver To Address</span>
                <span className="text-xs text-gray-300 flex items-start mt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 mr-1 text-dagi-red flex-shrink-0 mt-0.5" />
                  {order.address}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Total Payment</span>
                <span className="text-lg font-serif font-bold text-gold-light">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Preparing Live Status Timeline */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Live Delivery Journey</h4>
            
            <div className="grid grid-cols-4 gap-2 relative">
              {/* Connecting Line */}
              <div className="absolute top-5 left-[12%] right-[12%] h-0.5 bg-gold/10 z-0">
                <div className="w-[33%] h-full bg-gradient-to-r from-dagi-red to-gold"></div>
              </div>

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = step.status === "completed";
                const isActive = step.status === "active";
                return (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isCompleted
                          ? "bg-dagi-red border-dagi-red text-white"
                          : isActive
                          ? "bg-gold/20 border-gold text-gold animate-pulse"
                          : "bg-dagi-gray-light border-gold/10 text-gray-500"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-2 block leading-none">{step.label}</span>
                    <span className="text-[8px] text-gray-500 mt-0.5 block leading-none">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Summary list */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Order Items</h4>
            <div className="max-h-40 overflow-y-auto space-y-2 border border-gold/10 rounded-xl p-4 bg-dagi-black/30">
              {order.items.map((item) => {
                const itemPrice = item.menuItem.isSpecialOffer && item.menuItem.discountPrice 
                  ? item.menuItem.discountPrice 
                  : item.menuItem.price;
                return (
                  <div key={item.menuItem.id} className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gold">{item.quantity}x</span>
                      <span className="text-gray-300">{item.menuItem.name}</span>
                    </div>
                    <span className="text-gray-400 font-mono">${(itemPrice * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gold/10 bg-dagi-black text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-gold-dark to-gold text-dagi-black hover:from-dagi-red hover:to-dagi-red hover:text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-lg"
            id="order-confirm-done-btn"
          >
            Wonderful, Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
