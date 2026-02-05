import { Link } from "react-router-dom";
import { 
  Users, 
  Handshake, 
  Wallet, 
  Calendar, 
  BarChart3, 
  Mail,
  ArrowRight,
  Sparkles,
  Shield,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "ทะเบียนผู้ประกอบการ",
    titleEn: "Partnership Directory",
    description: "ค้นหาและเชื่อมต่อกับผู้ประกอบการด้าน Big Data และ AI กว่า 500 ราย พร้อมข้อมูลความเชี่ยวชาญและบริการ",
    href: "/partnership",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Handshake,
    title: "จับคู่ธุรกิจอัจฉริยะ",
    titleEn: "Smart Business Matching",
    description: "ระบบวิเคราะห์และจับคู่ Demand-Supply ด้วยเกณฑ์การประเมินศักยภาพเทคโนโลยีและธุรกิจ",
    href: "/partnership/matching",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Wallet,
    title: "ระบบบริหารจัดการทุน",
    titleEn: "Digital Grant Management",
    description: "ยื่นข้อเสนอโครงการ ติดตามสถานะ และลงนามสัญญาอิเล็กทรอนิกส์แบบครบวงจร",
    href: "/grants",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Calendar,
    title: "กิจกรรมและอบรม",
    titleEn: "Event Management",
    description: "ลงทะเบียนเข้าร่วมกิจกรรม Workshop, Knowledge Sharing และอบรมเชิงปฏิบัติการ",
    href: "/events",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: BarChart3,
    title: "Dashboard และรายงาน",
    titleEn: "Analytics & Reporting",
    description: "แดชบอร์ดวิเคราะห์ข้อมูลเชิงลึก พร้อมรายงานผลกระทบทางเศรษฐกิจแบบ Real-time",
    href: "/analytics",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    titleEn: "Communication Hub",
    description: "ระบบสื่อสารและประชาสัมพันธ์ไปยังเครือข่ายพันธมิตรอย่างมีประสิทธิภาพ",
    href: "/communication",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-500/10",
  },
];

const highlights = [
  { icon: Sparkles, label: "AI-Powered Matching" },
  { icon: Shield, label: "PDPA Compliant" },
  { icon: Zap, label: "Real-time Analytics" },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            {highlights.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium">
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </span>
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            บริการของ <span className="gradient-text">BRIDGE Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            ระบบนิเวศดิจิทัลครบวงจรสำหรับอุตสาหกรรม Big Data และ AI ของประเทศไทย
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group relative bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.bgColor}`} />
              
              {/* Content */}
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{feature.titleEn}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  <span>เรียนรู้เพิ่มเติม</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
