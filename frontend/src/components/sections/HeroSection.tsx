
import { ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-glow-gradient -z-10" />

      <div className="container px-4 md:px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex flex-col lg:w-1/2 space-y-6">
          <div className="bg-white/5 border border-white/10 py-1.5 px-3 rounded-full inline-flex items-center gap-2 max-w-max mb-4">
            {/* Changed from animate-pulse to animate-blink for more pronounced effect */}
            <div className="w-2 h-2 rounded-full bg-green-500 animate-blink" />
            <span className="text-sm text-white/70">Trusted by 1000+ students</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            College Updates <span className="text-gradient">Instantly</span> On WhatsApp
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg">
            Stay informed about SS Jain Subodh College announcements, events, and updates
            without ever visiting the college website again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="https://whatsapp.com/channel/0029VaqmpmvHbFVBMXuPfg40" target="_blank">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                Join the Channel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>

            <a href="#how-it-works">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </a>

          </div>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

            {/* Phone mockup - Fixed proportions to better match a phone rather than tablet */}
            <div className="relative bg-black/20 border border-white/10 rounded-[40px] p-2 shadow-xl max-w-[280px] mx-auto">
              <div className="bg-gray-900 rounded-[34px] overflow-hidden h-[500px] relative">

                {/* WhatsApp style header - Added margin-top to prevent text overlap with notch */}
                <div className="bg-green-800 px-4 py-3  flex items-center">
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-sm">Subodh Notifier</h3>
                    <p className="text-xs text-green-100">Sandy, Dhairya, +986 others</p>
                  </div>
                  <Bell className="h-4 w-4 text-white" />
                </div>

                {/* Chat messages - Improved layout */}
                <div className="p-3 space-y-3 h-[450px] overflow-y-auto hide-scrollbar">
                  <div className="glass-card p-2.5 rounded-lg rounded-tl-none ml-auto max-w-[230px]">
                    <p className="text-xs sm:text-sm">🔔 New Update from Subodh College!</p>
                    <p className="text-xs text-green-300 mt-1">11:30 AM</p>
                  </div>

                  <div className="glass-card p-2.5 rounded-lg rounded-tl-none ml-auto max-w-[230px]">
                    <p className="text-xs sm:text-sm">📢 <strong>Exam Schedule Released:</strong> End-semester exams start from May 15th. Check your hall tickets.</p>
                    <p className="text-xs text-green-300 mt-1">11:32 AM</p>
                  </div>

                  <div className="glass-card p-2.5 rounded-lg rounded-tl-none ml-auto max-w-[230px]">
                    <p className="text-xs sm:text-sm">📚 <strong>Library Notice:</strong> Extended hours during exam week (8 AM - 10 PM)</p>
                    <p className="text-xs text-green-300 mt-1">2:45 PM</p>
                  </div>

                  <div className="glass-card p-2.5 rounded-lg rounded-tl-none ml-auto max-w-[230px]">
                    <p className="text-xs sm:text-sm">🏆 <strong>Sports Update:</strong> Subodh College wins inter-university basketball championship!</p>
                    <p className="text-xs text-green-300 mt-1">Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
