"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Share2,
  Download,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  User,
  Bookmark,
  ExternalLink,
} from "lucide-react";

const eventsData: Record<
  string,
  {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    type: string;
    spots: number;
    registered: number;
    image: string;
    description: string;
    highlights: string[];
    speakers: { name: string; title: string; company: string }[];
    agenda: { time: string; topic: string; speaker?: string }[];
    requirements: string[];
    organizer: { name: string; email: string; phone: string };
  }
> = {
  "1": {
    id: 1,
    title: "AI Workshop: Generative AI for Business",
    date: "15 ก.พ. 2568",
    time: "09:00 - 16:00",
    location: "Online (Zoom)",
    type: "workshop",
    spots: 50,
    registered: 38,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    description:
      "Workshop เชิงปฏิบัติการเรื่อง Generative AI สำหรับการประยุกต์ใช้ในธุรกิจ เรียนรู้การใช้ Large Language Models, Prompt Engineering และการสร้าง AI-powered Application สำหรับองค์กร พร้อมฝึกปฏิบัติจริงกับเครื่องมือต่างๆ",
    highlights: [
      "เรียนรู้พื้นฐาน Generative AI และ LLMs",
      "ฝึก Prompt Engineering แบบ Hands-on",
      "สร้าง AI Chatbot สำหรับธุรกิจ",
      "กรณีศึกษาจากบริษัทชั้นนำในไทย",
      "รับ Certificate หลังจบ Workshop",
    ],
    speakers: [
      {
        name: "ดร.สมชาย เทคโนโลยี",
        title: "Chief AI Officer",
        company: "AI Solutions Co., Ltd.",
      },
      {
        name: "คุณวิภาวี ดาต้า",
        title: "Head of Data Science",
        company: "Digital Innovation Inc.",
      },
    ],
    agenda: [
      { time: "09:00 - 09:30", topic: "ลงทะเบียนและเปิดงาน" },
      {
        time: "09:30 - 10:30",
        topic: "Introduction to Generative AI",
        speaker: "ดร.สมชาย เทคโนโลยี",
      },
      { time: "10:30 - 10:45", topic: "พักเบรก" },
      {
        time: "10:45 - 12:00",
        topic: "Prompt Engineering Masterclass",
        speaker: "คุณวิภาวี ดาต้า",
      },
      { time: "12:00 - 13:00", topic: "พักกลางวัน" },
      {
        time: "13:00 - 14:30",
        topic: "Hands-on: สร้าง AI Chatbot",
        speaker: "ดร.สมชาย เทคโนโลยี",
      },
      { time: "14:30 - 14:45", topic: "พักเบรก" },
      {
        time: "14:45 - 15:30",
        topic: "Case Studies: AI ในธุรกิจไทย",
        speaker: "คุณวิภาวี ดาต้า",
      },
      { time: "15:30 - 16:00", topic: "Q&A และปิดงาน" },
    ],
    requirements: [
      "คอมพิวเตอร์ที่มี Internet สำหรับ Hands-on Lab",
      "ความรู้พื้นฐานด้านโปรแกรมมิ่ง (ไม่จำเป็นต้องเชี่ยวชาญ)",
      "บัญชี Google (สำหรับ Google Colab)",
    ],
    organizer: {
      name: "ฝ่ายพัฒนาศักยภาพ สขญ.",
      email: "events@bdi.or.th",
      phone: "02-xxx-xxxx ต่อ 501",
    },
  },
  "2": {
    id: 2,
    title: "Big Data Thailand Conference 2025",
    date: "22-23 ก.พ. 2568",
    time: "08:30 - 17:00",
    location: "BITEC Bangkok, Hall 101-102",
    type: "conference",
    spots: 500,
    registered: 423,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    description:
      "งานประชุมวิชาการด้าน Big Data ที่ใหญ่ที่สุดในประเทศไทย รวบรวมผู้เชี่ยวชาญ ผู้ประกอบการ และนักวิจัยด้าน Big Data, AI และ Data Science กว่า 500 คน พร้อม Keynote Speakers จากองค์กรชั้นนำทั้งในและต่างประเทศ",
    highlights: [
      "Keynote จากผู้เชี่ยวชาญระดับโลก",
      "30+ Sessions ครอบคลุมทุกเรื่อง Big Data & AI",
      "Exhibition Zone จากบริษัทเทคโนโลยีชั้นนำ",
      "Networking Event และ Business Matching",
      "Workshop เชิงปฏิบัติการ (Track แยก)",
    ],
    speakers: [
      {
        name: "Prof. John Smith",
        title: "Director of AI Research",
        company: "Stanford University",
      },
      {
        name: "ดร.นวัตกรรม ดิจิทัล",
        title: "ผู้อำนวยการ สขญ.",
        company: "สถาบันข้อมูลขนาดใหญ่",
      },
      {
        name: "คุณเทคโน วิสัยทัศน์",
        title: "CEO",
        company: "ThaiTech Corp.",
      },
    ],
    agenda: [
      { time: "08:30 - 09:00", topic: "ลงทะเบียน" },
      {
        time: "09:00 - 09:30",
        topic: "พิธีเปิด",
        speaker: "ดร.นวัตกรรม ดิจิทัล",
      },
      {
        time: "09:30 - 10:30",
        topic: "Keynote: The Future of Big Data & AI",
        speaker: "Prof. John Smith",
      },
      { time: "10:30 - 11:00", topic: "พักเบรก & Exhibition" },
      { time: "11:00 - 12:00", topic: "Panel Discussion: Data Economy in Thailand" },
      { time: "12:00 - 13:30", topic: "พักกลางวัน & Networking" },
      { time: "13:30 - 15:00", topic: "Breakout Sessions (4 Tracks)" },
      { time: "15:00 - 15:30", topic: "พักเบรก" },
      {
        time: "15:30 - 16:30",
        topic: "Keynote: Building a Data-Driven Organization",
        speaker: "คุณเทคโน วิสัยทัศน์",
      },
      { time: "16:30 - 17:00", topic: "สรุปและปิดงาน" },
    ],
    requirements: [
      "ลงทะเบียนล่วงหน้าผ่านระบบ",
      "แสดงบัตรประชาชนหรือบัตรพนักงานในวันงาน",
    ],
    organizer: {
      name: "ฝ่ายกิจกรรมและงานประชุม สขญ.",
      email: "conference@bdi.or.th",
      phone: "02-xxx-xxxx ต่อ 601",
    },
  },
  "3": {
    id: 3,
    title: "Knowledge Sharing: Data Governance Best Practices",
    date: "28 ก.พ. 2568",
    time: "14:00 - 16:00",
    location: "Hybrid (สขญ. สำนักงานใหญ่ + Zoom)",
    type: "sharing",
    spots: 100,
    registered: 67,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    description:
      "กิจกรรมแลกเปลี่ยนเรียนรู้เรื่อง Data Governance Best Practices สำหรับองค์กรที่ต้องการวางระบบธรรมาภิบาลข้อมูลอย่างมีประสิทธิภาพ ครอบคลุมทั้งนโยบาย กระบวนการ และเครื่องมือที่จำเป็น",
    highlights: [
      "เรียนรู้ Framework ด้าน Data Governance",
      "กรณีศึกษาจากองค์กรที่ประสบความสำเร็จ",
      "แนวทางปฏิบัติตาม PDPA",
      "Q&A กับผู้เชี่ยวชาญ",
    ],
    speakers: [
      {
        name: "คุณธรรมาภิบาล ข้อมูล",
        title: "Chief Data Officer",
        company: "National Data Corp.",
      },
    ],
    agenda: [
      { time: "14:00 - 14:10", topic: "เปิดงานและแนะนำวิทยากร" },
      {
        time: "14:10 - 15:00",
        topic: "Data Governance Framework & Best Practices",
        speaker: "คุณธรรมาภิบาล ข้อมูล",
      },
      { time: "15:00 - 15:30", topic: "กรณีศึกษา: Data Governance ในภาคธนาคาร" },
      { time: "15:30 - 16:00", topic: "Q&A และ Open Discussion" },
    ],
    requirements: [
      "เข้าร่วม Online ผ่าน Zoom (ลิงก์จะส่งทางอีเมลหลังลงทะเบียน)",
      "หรือ Walk-in ที่ สขญ. สำนักงานใหญ่ (จำกัด 30 ที่นั่ง)",
    ],
    organizer: {
      name: "ฝ่ายพัฒนาศักยภาพ สขญ.",
      email: "events@bdi.or.th",
      phone: "02-xxx-xxxx ต่อ 501",
    },
  },
};

const eventTypeLabels: Record<string, { label: string; color: string }> = {
  workshop: { label: "Workshop", color: "bg-purple-100 text-purple-700" },
  conference: { label: "Conference", color: "bg-blue-100 text-blue-700" },
  sharing: {
    label: "Knowledge Sharing",
    color: "bg-emerald-100 text-emerald-700",
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const event = eventsData[id];

  if (!event) {
    return (
      <main className="min-h-[calc(100vh-80px)] py-12 px-4 pt-28">
        <div className="container mx-auto max-w-4xl text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            ไม่พบกิจกรรม
          </h1>
          <p className="text-muted-foreground mb-6">
            กิจกรรมที่คุณค้นหาไม่มีในระบบ
          </p>
          <Button asChild>
            <Link href="/events">กลับหน้ากิจกรรม</Link>
          </Button>
        </div>
      </main>
    );
  }

  const spotsLeft = event.spots - event.registered;
  const progress = (event.registered / event.spots) * 100;
  const typeInfo = eventTypeLabels[event.type];

  return (
    <main className="min-h-[calc(100vh-80px)] py-12 px-4 pt-28">
      <div className="container mx-auto max-w-5xl">
        <Button variant="ghost" className="mb-6 gap-2" asChild>
          <Link href="/events">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้ากิจกรรม
          </Link>
        </Button>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <Badge className={`${typeInfo.color} mb-3`}>{typeInfo.label}</Badge>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Bar */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">วันที่</div>
                    <div className="text-sm font-medium text-foreground">
                      {event.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">เวลา</div>
                    <div className="text-sm font-medium text-foreground">
                      {event.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {event.location.includes("Online") ? (
                      <Video className="w-5 h-5 text-primary" />
                    ) : (
                      <MapPin className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">สถานที่</div>
                    <div className="text-sm font-medium text-foreground">
                      {event.location.split(",")[0]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">ที่นั่ง</div>
                    <div className="text-sm font-medium text-foreground">
                      เหลือ {spotsLeft} ที่
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                รายละเอียด
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {event.description}
              </p>

              <h3 className="font-semibold text-foreground mb-3">
                สิ่งที่จะได้เรียนรู้
              </h3>
              <ul className="space-y-2">
                {event.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Speakers */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                วิทยากร
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.speakers.map((speaker, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {speaker.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {speaker.title}
                      </p>
                      <p className="text-xs text-primary">{speaker.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agenda */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                กำหนดการ
              </h2>
              <div className="space-y-0">
                {event.agenda.map((item, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 py-3 ${
                      i < event.agenda.length - 1
                        ? "border-b border-border/50"
                        : ""
                    }`}
                  >
                    <div className="w-28 flex-shrink-0 text-sm font-medium text-primary">
                      {item.time}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{item.topic}</p>
                      {item.speaker && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          โดย {item.speaker}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                สิ่งที่ต้องเตรียม
              </h2>
              <ul className="space-y-2">
                {event.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-amber-700">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Register */}
              <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      ลงทะเบียนแล้ว
                    </span>
                    <span className="font-medium text-foreground">
                      {event.registered}/{event.spots}
                    </span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        progress > 80 ? "bg-amber-500" : "bg-primary"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {spotsLeft <= 20 && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      เหลือที่นั่งอีก {spotsLeft} ที่
                    </p>
                  )}
                </div>

                <Button className="w-full h-12 text-base gap-2 mb-3">
                  ลงทะเบียนเข้าร่วม
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-1" size="sm">
                    <Bookmark className="w-4 h-4" />
                    บันทึก
                  </Button>
                  <Button variant="outline" className="flex-1 gap-1" size="sm">
                    <Share2 className="w-4 h-4" />
                    แชร์
                  </Button>
                </div>
              </div>

              {/* Location */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  สถานที่จัดงาน
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {event.location}
                </p>
                {!event.location.includes("Online") && (
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    ดูแผนที่
                  </Button>
                )}
              </div>

              {/* Contact */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  ติดต่อผู้จัดงาน
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{event.organizer.name}</p>
                  <p>อีเมล: {event.organizer.email}</p>
                  <p>โทร: {event.organizer.phone}</p>
                </div>
              </div>

              {/* Related Events */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  กิจกรรมอื่นๆ
                </h3>
                <div className="space-y-3">
                  {Object.values(eventsData)
                    .filter((e) => e.id !== event.id)
                    .slice(0, 2)
                    .map((e) => (
                      <Link
                        key={e.id}
                        href={`/events/${e.id}`}
                        className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Badge
                          className={`${eventTypeLabels[e.type].color} text-xs mb-1.5`}
                        >
                          {eventTypeLabels[e.type].label}
                        </Badge>
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {e.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {e.date} | {e.location.split(",")[0]}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
