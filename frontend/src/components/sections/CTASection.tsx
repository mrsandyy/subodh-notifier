
import { ArrowRight, CheckCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Never miss important college announcements",
  "Stay updated without checking the college website",
  "Completely free service for all students",
  "Join 1000+ students already using Subodh Notifier"
];

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-30 moving-gradient -z-10" />

      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl relative">
          <div className="absolute inset-0 bg-black/30 rounded-2xl blur-sm -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get <span className="text-gradient">College Updates</span> Instantly?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join our WhatsApp channel and start receiving real-time updates about
                SS Jain Subodh College directly on your phone.
              </p>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <a href="https://whatsapp.com/channel/0029VaqmpmvHbFVBMXuPfg40" target="_blank" >
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-105">
                  Join the Channel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>

            </div>
            <a href="https://whatsapp.com/channel/0029VaqmpmvHbFVBMXuPfg40" target="_blank">
              <div className="relative animate-fade-in-right hidden lg:block">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-30" />
                <div className="relative bg-black/20 border border-white/10 rounded-[20px] p-4 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-gray-900 rounded-[12px] overflow-hidden p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white mr-3">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Subodh Notifier</h4>
                        <p className="text-xs text-green-300">Latest Update</p>
                      </div>
                    </div>

                    <div className="glass-card p-3 rounded-lg mb-3">
                      <p className="text-sm">📣 <strong>College Update:</strong> All classes suspended tomorrow due to faculty meeting.</p>
                      <p className="text-xs text-green-300 mt-1">Just now</p>
                    </div>

                    <div className="text-center mt-6">

                      <p className="text-xs text-muted-foreground">Tap to open</p>

                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
