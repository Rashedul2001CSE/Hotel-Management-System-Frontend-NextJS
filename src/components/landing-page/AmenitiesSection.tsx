import { Reveal } from "./Reveal";
import { Building2, Dumbbell, Heart, Music2, Sparkles, Utensils } from "lucide-react";

const amenities = [
  { title: "Spa & Wellness", icon: Heart, text: "Rejuvenate your body and mind with our full-service spa featuring massage therapy, facial treatments, and wellness programs.", items: ["Massage Therapy", "Facial Treatments", "Sauna & Steam Room"], iconClass: "from-pink-500 to-purple-500" },
  { title: "Fine Dining", icon: Utensils, text: "Experience culinary excellence with our award-winning restaurants featuring international cuisine and locally sourced ingredients.", items: ["Michelin Star Restaurant", "Rooftop Bar", "24/7 Room Service"], iconClass: "from-orange-500 to-red-500" },
  { title: "Fitness & Recreation", icon: Dumbbell, text: "Stay active with our state-of-the-art fitness center, infinity pool, and various recreational activities.", items: ["24/7 Fitness Center", "Infinity Pool", "Tennis Court"], iconClass: "from-green-500 to-teal-500" },
  { title: "Business Center", icon: Building2, text: "Conduct business seamlessly with our fully equipped business center and modern conference facilities.", items: ["Conference Rooms", "High-Speed WiFi", "Printing Services"], iconClass: "from-blue-500 to-indigo-500" },
  { title: "Concierge Services", icon: Sparkles, text: "Our dedicated concierge team is available 24/7 to assist with reservations, tours, and personalized recommendations.", items: ["24/7 Assistance", "Tour Bookings", "Transportation"], iconClass: "from-purple-500 to-pink-500" },
  { title: "Entertainment", icon: Music2, text: "Enjoy live music, cultural performances, and exclusive events in our sophisticated entertainment venues.", items: ["Live Music", "Cultural Shows", "Private Events"], iconClass: "from-yellow-500 to-orange-500" },
];

export function AmenitiesSection() {
  return (
    <Reveal className="py-20"><section>
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold gradient-text md:text-5xl">World-Class Amenities</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">Immerse yourself in luxury with our comprehensive range of premium facilities and services</p>
        </header>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {amenities.map(({ title, icon: Icon, text, items, iconClass }) => (
            <article key={title} className="glass-morphism-strong neon-border hover-lift card-3d group rounded-3xl p-8">
              <div className="card-3d-inner">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${iconClass} transition-transform duration-300 group-hover:scale-110`}><Icon className="h-8 w-8 text-white" /></div>
                <h3 className="mb-4 text-2xl font-bold gradient-text">{title}</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{text}</p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  {items.map((item) => <li key={item} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section></Reveal>
  );
}
