
import { ArrowRight, Bot, FileText, MessageCircle, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Bot,
    title: "Automated Scraping",
    description: "Our bot regularly checks College's website for new updates using Nodefetch,FS Promises and Cheerio"
  },
  {
    icon: FileText,
    title: "Content Parsing",
    description: "The system extracts and processes meaningful information from the website using custom logic"
  },
  {
    icon: Search,
    title: "Update Verification",
    description: "Each update is verified to ensure it's new and relevant to students using String Similarity Algortihms"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Delivery",
    description: "Verified updates are formatted and delivered directly to students via WhatsApp using Whatsapp-web.js"
  },
  
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-black/20">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">Subodh Notifier</span> Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Our technology ensures you never miss important college updates 
            by automatically delivering them directly to your WhatsApp.
          </p>
        </div>
        
        <div className="relative">
          {/* Horizontal connecting line (only visible on desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-accent to-primary/20 -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative" style={{ animationDelay: `${index * 200}ms` }}>
                <Card className="glass-card border-white/5 h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrows between cards (fixed positioning) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
