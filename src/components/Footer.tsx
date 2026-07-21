import { ArrowUp, Award, Clock, MapPin, Phone } from "lucide-react";

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  const handleScrollTop = () => {
    setActiveSection("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dagi-black border-t border-gold/15 relative overflow-hidden">
      {/* Golden accent strip */}
      <div className="h-1 bg-gradient-to-r from-dagi-red to-gold"></div>

      {/* Main Footer Blocks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center border-2 border-gold rounded-full">
                <span className="font-serif text-sm font-bold text-gold">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider text-white">DAGI</span>
                <span className="text-[8px] font-display uppercase tracking-[0.2em] text-gold">Restaurant</span>
              </div>
            </div>
            
            <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
              Experience the pinnacle of luxury fine-dining delivered hot to your doorstep. Sourced organically, crafted expertly, delivered gracefully.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider border-b border-gold/10 pb-2">
              Quick Navigations
            </h4>
            <ul className="text-[11px] text-gray-400 space-y-2">
              <li>
                <a href="#home" className="hover:text-gold transition">Home Welcome</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold transition">Exquisite Menu</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition">Our Story & Heritage</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold transition">Contact & Reservations</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Summary */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider border-b border-gold/10 pb-2">
              Concierge Contact
            </h4>
            <ul className="text-[11px] text-gray-400 space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>+251 912 345 678</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="line-clamp-1">Bole Road, Addis Ababa</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Open 10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter or Quote */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider border-b border-gold/10 pb-2">
              Chef's Promise
            </h4>
            <p className="text-[11px] text-gray-400 italic leading-relaxed">
              "We cook with love, spice with heritage, and serve with pure luxury. Every mouthful represents our absolute commitment to taste."
            </p>
            <span className="text-[9px] text-gold uppercase tracking-wider font-bold block">- Chef Dagim Tadele</span>
          </div>
        </div>

        {/* Lower row details */}
        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-500">
            &copy; {currentYear} DAGI Restaurant. All rights reserved. Addis Ababa, Ethiopia.
          </p>

          <button
            onClick={handleScrollTop}
            className="p-3 bg-dagi-gray-dark hover:bg-gold border border-gold/25 hover:border-gold text-gold hover:text-dagi-black rounded-full transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center group"
            title="Scroll to Top"
            id="scroll-top-btn"
          >
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
