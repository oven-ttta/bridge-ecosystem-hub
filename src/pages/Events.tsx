import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  MapPin, 
  Users,
  Video,
  Search,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "AI Workshop: Generative AI for Business",
    description: "เรียนรู้การประยุกต์ใช้ Generative AI เพื่อเพิ่มประสิทธิภาพการดำเนินธุรกิจ พร้อม Workshop ลงมือปฏิบัติจริง",
    date: "15 ก.พ. 2568",
    time: "09:00 - 16:00",
    location: "Online",
    type: "workshop",
    spots: 50,
    registered: 38,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Big Data Thailand Conference 2025",
    description: "งานประชุมวิชาการด้าน Big Data ระดับประเทศ พบกับวิทยากรระดับโลกและนิทรรศการเทคโนโลยีล่าสุด",
    date: "22-23 ก.พ. 2568",
    time: "08:30 - 17:00",
    location: "BITEC Bangkok",
    type: "conference",
    spots: 500,
    registered: 423,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Knowledge Sharing: Data Governance Best Practices",
    description: "แบ่งปันประสบการณ์และแนวปฏิบัติที่ดีในการบริหารจัดการข้อมูลองค์กร",
    date: "28 ก.พ. 2568",
    time: "14:00 - 16:00",
    location: "Hybrid",
    type: "sharing",
    spots: 100,
    registered: 67,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "MLOps Bootcamp: From Model to Production",
    description: "เรียนรู้กระบวนการ Deploy ML Model สู่ Production อย่างมืออาชีพ",
    date: "5-6 มี.ค. 2568",
    time: "09:00 - 17:00",
    location: "True Digital Park",
    type: "workshop",
    spots: 30,
    registered: 28,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  },
];

const eventTypeConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  workshop: { label: "Workshop", bgColor: "bg-purple-100", textColor: "text-purple-700" },
  conference: { label: "Conference", bgColor: "bg-blue-100", textColor: "text-blue-700" },
  sharing: { label: "Knowledge Sharing", bgColor: "bg-emerald-100", textColor: "text-emerald-700" },
};

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-purple-50 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                <Calendar className="w-3 h-3 mr-1" />
                Active Event Management
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                กิจกรรมและอบรม
              </h1>
              <p className="text-lg text-muted-foreground">
                เข้าร่วม Workshop, Conference และ Knowledge Sharing เพื่อพัฒนาศักยภาพด้าน Big Data และ AI
              </p>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ค้นหากิจกรรม..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <Badge className={`absolute top-4 left-4 ${eventTypeConfig[event.type].bgColor} ${eventTypeConfig[event.type].textColor}`}>
                      {eventTypeConfig[event.type].label}
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      {event.location === "Online" ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      <span>{event.location}</span>
                    </div>
                    
                    {/* Progress */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          ลงทะเบียนแล้ว
                        </span>
                        <span className="font-medium text-foreground">
                          {event.registered}/{event.spots} ที่นั่ง
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            event.registered / event.spots > 0.8 
                              ? "bg-amber-500" 
                              : "bg-primary"
                          }`}
                          style={{ width: `${(event.registered / event.spots) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full group">
                      ลงทะเบียนเข้าร่วม
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
