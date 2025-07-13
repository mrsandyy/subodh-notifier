
import { Bell } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 py-12 mt-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-8 md:mb-0">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Bell className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Subodh Notifier</span>
            </a>
            <p className="text-muted-foreground max-w-md">
              Get instant real-time updates regarding SS Jain Subodh College directly on WhatsApp.
              Stay informed without having to check the college website.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#developers" className="text-muted-foreground hover:text-foreground transition-colors">Developers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">Email: contact@mrsandy.in</li>
                <a href="https://whatsapp.com/channel/0029VaqmpmvHbFVBMXuPfg40" target="_blank">
                  <li className="text-muted-foreground">WhatsApp: Join the Channel</li>
                </a>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><a href="#developers" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#developers" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#developers" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Subodh Notifier. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
