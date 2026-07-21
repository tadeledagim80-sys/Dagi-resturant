import { motion } from "motion/react";
import { Award, Target, Users, BookOpen } from "lucide-react";

export default function AboutUs() {
  const cards = [
    {
      icon: Award,
      title: "Our Heritage",
      desc: "Founded with a passion for excellence, DAGI Restaurant serves award-winning cuisine blending local fine-dining heritage with contemporary culinary innovation.",
    },
    {
      icon: Target,
      title: "Our Mission",
      desc: "To deliver unmatched gastronomic pleasure. We strive for pristine quality, culinary speed, and an ambient atmosphere of luxury on every plate we serve.",
    },
    {
      icon: Users,
      title: "Master Chefs",
      desc: "Under the creative direction of Executive Chef Dagim Tadele, our kitchen represents a collective of elite artisans with decades of experience in Michelin-starred establishments.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-dagi-black border-t border-gold/10 relative">
      {/* Background Decorative glow */}
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">
            A Legacy of Taste
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            The Story of <span className="text-gold-gradient font-serif">DAGI</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-dagi-red to-gold mx-auto rounded-full"></div>
        </div>

        {/* Story details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Text Block */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Where Culinary Passion Meets Absolute Luxury.
            </h3>
            
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Since our inception in Addis Ababa, DAGI Restaurant has redefined the boundary 
              of modern fine-dining delivery. Our core philosophy is simple: to make the finest, 
              most luxurious culinary creations available with the prompt, precise delivery 
              expected in today's fast-paced world.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              We select only USDA Prime meats, fresh caught ocean seafood, and organically sourced 
              herbs from local premium farms. Every dish, from our famous Gold-infused Cappuccino 
              to our Wagyu Gold Burger, is treated as an individual piece of culinary art.
            </p>

            {/* Signature Block */}
            <div className="pt-4 border-t border-gold/15 flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=150&auto=format&fit=crop"
                  alt="Executive Chef Dagim Tadele"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="font-serif text-base font-bold text-white">Chef Dagim Tadele</h5>
                <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                  Executive Chef & Founder
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Grid / Bento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-3xl overflow-hidden border border-gold/15 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop"
                  alt="Kitchen Artistry"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="h-44 rounded-3xl overflow-hidden border border-gold/15 shadow-2xl bg-gradient-to-br from-dagi-red-dark to-dagi-red p-6 flex flex-col justify-between">
                <BookOpen className="w-8 h-8 text-white opacity-80" />
                <div>
                  <h4 className="text-white font-serif text-lg font-bold">100+</h4>
                  <p className="text-xs text-white/80">Premium Recipes Curated</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="h-44 rounded-3xl overflow-hidden border border-gold/15 shadow-2xl bg-gradient-to-br from-dagi-black to-dagi-gray-dark p-6 flex flex-col justify-between border-t-2 border-t-gold">
                <span className="text-xs text-gold font-bold uppercase tracking-widest">Est. 2022</span>
                <div>
                  <h4 className="text-white font-serif text-lg font-bold">Addis Ababa</h4>
                  <p className="text-xs text-gray-400">HQ Bole Business District</p>
                </div>
              </div>
              <div className="h-64 rounded-3xl overflow-hidden border border-gold/15 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop"
                  alt="Elegant Table"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-dagi-gray-dark border border-gold/15 hover:border-gold/30 p-8 rounded-3xl transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/35 flex items-center justify-center text-gold mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-3">{card.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
