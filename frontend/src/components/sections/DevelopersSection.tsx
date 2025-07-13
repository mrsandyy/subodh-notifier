
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const developers = [
  {
    name: "Sandeep Vishnoi",
    role: "Lead Developer",
    image: "images/MrSandy.jpg",
    bio: "Backend developer. Manages scraping technologies and WhatsApp automation. Created the core system architecture for Subodh Notifier.",
    social: {
      instagram: "https://www.instagram.com/mrsandyy_/",
      github: "https://github.com/mrsandyy",
      linkedin: "https://www.linkedin.com/in/sandeepvishnoi/",
      email: "mailto:contact@mrsandy.in"
    }
  },
  {
    name: "Dhairya Gupta",
    role: "Frontend & Integration",
    image: "images/Dhairya.jpg",
    bio: "UI/UX designer and frontend developer focused on crafting intuitive interfaces. Manages client‑side integration and interaction flows.",
    social: {
      instagram: "https://www.instagram.com/myself.dhairya/",
      github: "https://github.com/Dhairya2004",
      linkedin: "https://linkedin.com/in/dhairya2004",
      email: "mailto:guptadhairya38@gmail.com"
    }
  }
];

export function DevelopersSection() {
  return (
    <section id="developers" className="py-20 relative overflow-hidden">
      {/* Interactive moving gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-60 moving-gradient -z-10"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the <span className="text-gradient">Developers</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            The team behind Subodh Notifier, creating innovative solutions 
            to make college life easier for fellow students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {developers.map((dev, index) => (
            <Card 
              key={dev.name} 
              className="backdrop-blur-lg bg-black/40 border-white/10 overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-30 hover:opacity-40 transition-opacity"></div>
              <div className="relative p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/20">
                      <img 
                        src={dev.image} 
                        alt={dev.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                  </div>
                  
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold">{dev.name}</h3>
                    <p className="text-accent mb-3">{dev.role}</p>
                    <ScrollArea className="h-20">
                      <p className="text-muted-foreground text-sm">{dev.bio}</p>
                    </ScrollArea>
                  </CardContent>
                  
                  <CardFooter className="flex justify-center space-x-4 mt-4 p-0">
                    <a href={dev.social.github} target="_blank" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform duration-200">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={dev.social.instagram} target="_blank" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform duration-200">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href={dev.social.linkedin} target="_blank" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform duration-200">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={dev.social.email} target="_blank" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform duration-200">
                      <Mail className="w-5 h-5" />
                    </a>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
