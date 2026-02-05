import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users,
  Video
} from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "AI Workshop: Generative AI for Business",
    date: "15 ก.พ. 2568",
    time: "09:00 - 16:00",
    location: "Online",
    type: "workshop",
    spots: 50,
    registered: 38,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Big Data Thailand Conference 2025",
    date: "22-23 ก.พ. 2568",
    time: "08:30 - 17:00",
    location: "BITEC Bangkok",
    type: "conference",
    spots: 500,
    registered: 423,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Knowledge Sharing: Data Governance Best Practices",
    date: "28 ก.พ. 2568",
    time: "14:00 - 16:00",
    location: "Hybrid",
    type: "sharing",
    spots: 100,
    registered: 67,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
  },
];

const eventTypeLabels: Record<string, { label: string; color: string }> = {
  workshop: { label: "Workshop", color: "bg-purple-100 text-purple-700" },
  conference: { label: "Conference", color: "bg-blue-100 text-blue-700" },
  sharing: { label: "Knowledge Sharing", color: "bg-emerald-100 text-emerald-700" },
};

export function EventsSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Active Event Management
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            กิจกรรมและอบรมที่กำลังจะมาถึง
          </h2>
          <p className="text-muted-foreground">
            เข้าร่วม Workshop, Conference และ Knowledge Sharing เพื่อพัฒนาศักยภาพด้าน Big Data และ AI
          </p>
        </div>
        
        {/* Event Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {upcomingEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className={`absolute top-4 left-4 ${eventTypeLabels[event.type].color}`}>
                  {eventTypeLabels[event.type].label}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                    <span className="opacity-60">•</span>
                    <span className="opacity-80">{event.time}</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  {event.location === "Online" ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  <span>{event.location}</span>
                </div>
                
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      ที่นั่ง
                    </span>
                    <span className="font-medium text-foreground">
                      {event.registered}/{event.spots}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(event.registered / event.spots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/events">
              ดูกิจกรรมทั้งหมด
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
