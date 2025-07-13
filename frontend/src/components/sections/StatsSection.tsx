
import { BookOpen, MessageSquare, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1,000+",
    label: "Active Students"
  },
  {
    icon: MessageSquare,
    value: "5,000+",
    label: "Updates Delivered"
  },
  {
    icon: BookOpen,
    value: "100%",
    label: "Information Accuracy"
  }
];

export function StatsSection() {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="glass-card p-8 rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
