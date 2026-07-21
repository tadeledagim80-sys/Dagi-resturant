import { motion } from "motion/react";
import { ArrowRight, Clock, Star, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOrderNow: () => void;
}

export default function Hero({ onOrderNow }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dagi-black pt-20"
    >
      {/* Background Image with elegant dark parallax overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600&auto=format&fit=crop"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover opacity-30 transform scale-105 transition-transform duration-10000"
        />
        {/* Luxurious gradient overlays to frame typography beautifully */}
        <div className="absolute inset-0 bg-gradient-to-r from-dagi-black via-dagi-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dagi-black via-transparent to-dagi-black/40"></div>
        
        {/* Subtle decorative grid lines to feel like a modern curated brand */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content (7 columns out of 12) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-dagi-red-dark/50 to-gold/20 border border-gold/30 shadow-md backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-gold animate-ping"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                THE ULTIMATE FINE DINING EXPERIENCE
              </span>
            </motion.div>

            {/* Display Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-white"
              >
                Welcome to <br />
                <span className="text-gold-gradient gold-glow-text font-serif">
                  DAGI Restaurant
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-xl sm:text-2xl font-light text-gray-300 italic max-w-xl"
              >
                "Fresh Food, Fast Delivery, Great Taste."
              </motion.p>
            </div>

            {/* Slogan Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base text-gray-400 max-w-lg leading-relaxed font-sans"
            >
              Indulge in a premium gastronomic journey curated by our master chefs. 
              We blend fresh ingredients, culinary artistry, and rapid delivery to bring 
              gourmet luxury right to your dining table.
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
            >
              <button
                onClick={onOrderNow}
                className="group relative px-8 py-4 bg-gradient-to-r from-dagi-red-dark to-dagi-red hover:from-dagi-red hover:to-gold text-white font-semibold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-xl shadow-dagi-red-dark/40 hover:shadow-gold/20 flex items-center space-x-2"
                id="hero-order-cta"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <a
                href="#menu"
                className="px-8 py-4 border border-gold/40 hover:border-gold text-gold hover:text-white bg-transparent rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-gold/10"
              >
                Explore Menu
              </a>
            </motion.div>

            {/* Key Value Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-10 border-t border-gold/15 max-w-lg"
            >
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-gold flex items-center">
                  4.9 <Star className="w-4 h-4 text-gold fill-gold ml-1 inline" />
                </span>
                <span className="text-xs text-gray-400 tracking-wide mt-1">Excellent Rating</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-gold flex items-center">
                  25<span className="text-sm font-sans text-gold-light ml-0.5">min</span>
                </span>
                <span className="text-xs text-gray-400 tracking-wide mt-1">Fast Delivery Limit</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-gold flex items-center">
                  100%
                </span>
                <span className="text-xs text-gray-400 tracking-wide mt-1">Gourmet Quality</span>
              </div>
            </motion.div>
          </div>

          {/* Graphical/Creative Element (5 columns out of 12) */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full h-[450px] flex items-center justify-center"
            >
              {/* Back glowing golden circle */}
              <div className="absolute w-80 h-80 rounded-full bg-gold/10 blur-[60px] animate-pulse"></div>
              
              {/* Spinning circular food showcase */}
              <div className="absolute w-[380px] h-[380px] rounded-full border border-gold/20 flex items-center justify-center p-4">
                <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-dashed border-gold/40 animate-[spin_40s_linear_infinite]"></div>
                
                {/* Showcase Image */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-80 h-80 rounded-full overflow-hidden border-4 border-gold shadow-2xl z-10"
                >
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
                    alt="Filet Mignon Showcase"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Float Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 -left-10 bg-dagi-gray-dark/95 border border-gold/30 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center space-x-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-dagi-red/20 flex items-center justify-center border border-dagi-red">
                  <Clock className="w-5 h-5 text-dagi-red-light" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Super Fast</h4>
                  <p className="text-[11px] text-gray-400">Order is served hot</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1.5, ease: "easeInOut" }}
                className="absolute bottom-10 -right-4 bg-dagi-gray-dark/95 border border-gold/30 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center space-x-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">100% Organic</h4>
                  <p className="text-[11px] text-gray-400">Farm to table ingredients</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
