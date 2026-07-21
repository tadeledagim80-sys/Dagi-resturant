import { useState, FormEvent } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function ContactUs() {
  const dagiLocation = { lat: 9.0300, lng: 38.7400 }; // Addis Ababa Bole Road

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to submit message.");
      }

      setSubmitSuccess("Your reservation inquiry / message has been delivered to Chef Dagim. We will reply shortly!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Failed to deliver contact message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", color: "hover:text-blue-500 hover:bg-blue-500/10" },
    { icon: Instagram, url: "https://instagram.com", color: "hover:text-pink-500 hover:bg-pink-500/10" },
    { icon: MessageSquare, url: "https://telegram.org", label: "Telegram", color: "hover:text-sky-500 hover:bg-sky-500/10" },
    { icon: Sparkles, url: "https://tiktok.com", label: "TikTok", color: "hover:text-amber-400 hover:bg-amber-400/10" },
  ];

  return (
    <section id="contact" className="py-24 bg-dagi-black border-t border-gold/10 relative">
      {/* Visual background gradient accent */}
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-dagi-red-dark/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">
            Reserve Your Experience
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Contact & <span className="text-gold-gradient font-serif">Reservations</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-dagi-red to-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Contact Cards & Info (5 cols out of 12) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">Get in Touch</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Whether you wish to make a VIP table reservation, enquire about corporate gourmet catering, or give delivery feedback, our concierge desk is always delighted to assist.
              </p>
            </div>

            {/* Quick Details Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="bg-dagi-gray-dark border border-gold/10 hover:border-gold/35 p-5 rounded-2xl flex items-start space-x-4 transition duration-300">
                <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl text-gold flex-shrink-0">
                  <MapPin className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">DAGI Gourmet HQ</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Bole Road, Premium Square Block C, Floor 1<br />Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="bg-dagi-gray-dark border border-gold/10 hover:border-gold/35 p-5 rounded-2xl flex items-start space-x-4 transition duration-300">
                <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl text-gold flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Reservations Concierge</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Phone: <span className="text-gold-light font-medium">+251 912 345 678</span><br />
                    Email: <span className="text-gold-light font-medium">concierge@dagirestaurant.com</span>
                  </p>
                </div>
              </div>

              {/* Opening hours */}
              <div className="bg-dagi-gray-dark border border-gold/10 hover:border-gold/35 p-5 rounded-2xl flex items-start space-x-4 transition duration-300">
                <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl text-gold flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Operating Hours</h4>
                  <div className="text-xs text-gray-400 mt-1 space-y-1">
                    <p className="flex justify-between gap-4">
                      <span>Mon - Fri (Weekdays):</span>
                      <span className="text-white font-medium">10:00 AM - 11:00 PM</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Sat - Sun (Weekends):</span>
                      <span className="text-gold-light font-medium">11:00 AM - 12:30 AM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles links */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-gold">Follow our gourmet journey</h5>
              <div className="flex space-x-3">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-dagi-gray-dark border border-gold/10 hover:border-gold/40 text-gray-400 rounded-xl transition duration-300 cursor-pointer ${item.color}`}
                      title={item.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Block: Contact Form & HQ location preview (7 cols out of 12) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Reservation / Message form */}
            <form onSubmit={handleContactSubmit} className="bg-dagi-gray-dark border border-gold/15 p-8 rounded-3xl shadow-xl space-y-6" id="contact-us-form">
              <h3 className="font-serif text-xl font-bold text-white border-b border-gold/10 pb-2">
                Send a Message
              </h3>

              {submitSuccess && (
                <div className="p-4 bg-gold/10 border border-gold/40 text-gold-light text-xs rounded-xl flex items-center space-x-2">
                  <span>✨ {submitSuccess}</span>
                </div>
              )}

              {submitError && (
                <div className="p-4 bg-dagi-red/10 border border-dagi-red text-dagi-red-light text-xs rounded-xl">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dagim"
                    className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-xs text-white focus:outline-none"
                    id="contact-name-input"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. contact@dagim.com"
                    className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-xs text-white focus:outline-none"
                    id="contact-email-input"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. VIP Table Reservation / Inquiry"
                  className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-xs text-white focus:outline-none"
                  id="contact-subject-input"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gold block">Your Inquiry Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your dietary preferences, preferred reservation timings or delivery query..."
                  rows={4}
                  className="w-full bg-dagi-black border border-gold/10 hover:border-gold/30 focus:border-gold px-4 py-3 rounded-xl text-xs text-white focus:outline-none resize-none"
                  id="contact-message-input"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-dagi-red-dark to-dagi-red hover:from-gold-dark hover:to-gold text-white hover:text-dagi-black font-semibold text-xs uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
                id="contact-submit-btn"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Sending Inquiry..." : "Submit Reservation Inquiry"}</span>
              </button>
            </form>

            {/* Custom Premium HQ location Visual Card */}
            <div className="h-64 rounded-3xl overflow-hidden border border-gold/20 shadow-lg relative bg-dagi-gray-dark">
              <div className="w-full h-full bg-dagi-black flex flex-col items-center justify-center p-6 relative">
                {/* Decorative mesh */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                <div className="absolute w-44 h-44 rounded-full border border-gold/25 animate-ping opacity-20"></div>
                
                <div className="relative z-10 text-center space-y-3 max-w-sm">
                  <div className="w-12 h-12 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h5 className="font-serif text-base font-bold text-white uppercase tracking-wider">DAGI HQ Coordinates</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Bole Road, Premium Square Block C, Floor 1, Addis Ababa, Ethiopia.
                  </p>
                  <p className="text-[10px] text-gold font-mono uppercase bg-gold/5 px-2.5 py-1 rounded-full border border-gold/10 inline-block">
                    LAT: {dagiLocation.lat.toFixed(4)} &nbsp;|&nbsp; LNG: {dagiLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
