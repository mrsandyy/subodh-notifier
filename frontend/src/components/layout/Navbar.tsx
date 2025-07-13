
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent"
    )}>
      <div className="container flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2 group">
          <Bell className="w-6 h-6 text-primary group-hover:animate-pulse-slow transition-colors" />
          <span className="text-xl font-bold">Subodh Notifier</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How it Works</a>
          <a href="#developers" className="text-foreground/70 hover:text-foreground transition-colors">Developers</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <a href="https://whatsapp.com/channel/0029VaqmpmvHbFVBMXuPfg40" target="_blank">
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            Join Now
          </Button>
          </a>

        </div>
      </div>
    </header>
  );
}
