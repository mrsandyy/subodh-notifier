
import { Bell, Clock, Lock, Rss, Server, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Receive college updates in real-time, as soon as they're published",
    color: "text-primary"
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    description: "Uses WhatsApp for delivery, no tracking or data collection",
    color: "text-blue-500"
  },
  {
    icon: Clock,
    title: "Time Saving",
    description: "No need to constantly check the college website for updates",
    color: "text-purple-500"
  },
  {
    icon: Rss,
    title: "Always Relevant",
    description: "Only receive important notifications that matter to you",
    color: "text-pink-500"
  },
  {
    icon: Server,
    title: "Automated Scraping",
    description: "Intelligent parsing extracts only the meaningful information",
    color: "text-teal-500"
  },
  {
    icon: Users,
    title: "Community Trusted",
    description: "Used by over 1,000 Subodh College students and growing",
    color: "text-amber-500"
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[500px] bg-feature-gradient opacity-10 -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Students <span className="text-gradient">Love</span> Subodh Notifier
          </h2>
          <p className="text-muted-foreground text-lg">
            Our service makes staying updated with college information easy, private, and instant.
            No more checking multiple websites or missing important announcements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 animate-fade-in" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("p-2 rounded-lg mb-4 max-w-max", feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
