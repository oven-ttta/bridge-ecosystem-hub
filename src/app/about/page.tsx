import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Building2,
  Target,
  Users,
  Globe,
  Award,
  BarChart3,
  Lightbulb,
  Handshake,
  Shield,
  CheckCircle,
} from "lucide-react";

const missions = [
  {
    icon: Target,
    title: "พัฒนาอุตสาหกรรมข้อมูล",
    description:
      "ส่งเสริมและพัฒนาอุตสาหกรรมข้อมูลขนาดใหญ่และปัญญาประดิษฐ์ของประเทศไทย ให้สามารถแข่งขันได้ในระดับสากล",
  },
  {
    icon: Users,
    title: "เชื่อมโยงเครือข่าย",
    description:
      "สร้างและเชื่อมโยงเครือข่ายผู้ประกอบการ นักวิจัย และหน่วยงานภาครัฐ เพื่อสร้างระบบนิเวศที่เข้มแข็ง",
  },
  {
    icon: Lightbulb,
    title: "สนับสนุนนวัตกรรม",
    description:
      "จัดสรรทุนสนับสนุนและทรัพยากรเพื่อส่งเสริมการวิจัยพัฒนาและนวัตกรรมด้านเทคโนโลยีข้อมูล",
  },
  {
    icon: Globe,
    title: "ยกระดับมาตรฐาน",
    description:
      "กำหนดมาตรฐานและแนวปฏิบัติที่ดีด้านข้อมูลขนาดใหญ่ เพื่อเพิ่มความน่าเชื่อถือและความปลอดภัย",
  },
];

const stats = [
  { value: "500+", label: "ผู้ประกอบการในเครือข่าย" },
  { value: "120+", label: "โครงการที่สนับสนุน" },
  { value: "200+", label: "ล้านบาทมูลค่าทุน" },
  { value: "50+", label: "กิจกรรมต่อปี" },
];

const values = [
  {
    icon: Shield,
    title: "ความโปร่งใส",
    description: "ดำเนินงานด้วยความโปร่งใส ตรวจสอบได้ และยึดมั่นในหลักธรรมาภิบาล",
  },
  {
    icon: Handshake,
    title: "ความร่วมมือ",
    description: "ส่งเสริมการทำงานร่วมกันระหว่างภาครัฐ ภาคเอกชน และภาคการศึกษา",
  },
  {
    icon: Award,
    title: "ความเป็นเลิศ",
    description: "มุ่งมั่นพัฒนาคุณภาพและมาตรฐานการดำเนินงานอย่างต่อเนื่อง",
  },
  {
    icon: BarChart3,
    title: "ขับเคลื่อนด้วยข้อมูล",
    description: "ใช้ข้อมูลและหลักฐานเชิงประจักษ์ในการตัดสินใจและวางแผนยุทธศาสตร์",
  },
];

const timeline = [
  { year: "2562", event: "ก่อตั้งสถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน)" },
  { year: "2563", event: "เปิดตัวโครงการ BRIDGE Ecosystem เชื่อมโยงผู้ประกอบการ" },
  { year: "2564", event: "เริ่มโปรแกรมทุนสนับสนุนนวัตกรรม Big Data" },
  { year: "2565", event: "พัฒนาระบบ Smart Business Matching ด้วย AI" },
  { year: "2566", event: "ขยายเครือข่ายผู้ประกอบการครบ 300 ราย" },
  { year: "2567", event: "เปิดตัว BRIDGE Platform เวอร์ชันใหม่พร้อมระบบ Digital Grant" },
  { year: "2568", event: "เครือข่ายผู้ประกอบการเติบโตกว่า 500 ราย" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Building2 className="w-3.5 h-3.5 mr-1.5" />
            สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน)
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            เกี่ยวกับ BRIDGE Platform
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            BRIDGE (Big Data Registry and Intelligence for Digital Growth Ecosystem)
            คือแพลตฟอร์มศูนย์กลางที่พัฒนาโดย สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน) หรือ BDI
            เพื่อเชื่อมโยงผู้ประกอบการด้าน Big Data และ AI ของประเทศไทย
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative -mt-16 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-6 text-center border border-border/50 shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              พันธกิจของเรา
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              สถาบันข้อมูลขนาดใหญ่มุ่งมั่นพัฒนาระบบนิเวศข้อมูลของประเทศไทยอย่างยั่งยืน
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((mission) => (
              <div
                key={mission.title}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <mission.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {mission.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              ค่านิยมหลัก
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              หลักการที่เรายึดมั่นในการดำเนินงานเพื่อขับเคลื่อนระบบนิเวศดิจิทัลของประเทศ
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              เส้นทางของเรา
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ลำดับเหตุการณ์สำคัญตั้งแต่ก่อตั้งจนถึงปัจจุบัน
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    {item.year.slice(-2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-sm font-medium text-primary mb-1">
                    พ.ศ. {item.year}
                  </div>
                  <p className="text-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIDGE Platform */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                BRIDGE Platform คืออะไร?
              </h2>
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 shadow-lg">
              <p className="text-muted-foreground leading-relaxed mb-6">
                BRIDGE Platform เป็นระบบดิจิทัลครบวงจรที่ออกแบบมาเพื่อเชื่อมโยงและสนับสนุน
                ผู้ประกอบการด้านเทคโนโลยี Big Data และ AI ในประเทศไทย โดยมีฟีเจอร์หลักดังนี้:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "ทะเบียนผู้ประกอบการด้าน Big Data & AI",
                  "ระบบจับคู่ธุรกิจอัจฉริยะด้วย AI",
                  "บริหารจัดการทุนสนับสนุนแบบดิจิทัล",
                  "จัดการกิจกรรม Workshop & Conference",
                  "Dashboard วิเคราะห์ข้อมูลเชิงลึก",
                  "ระบบมอบอำนาจและจัดการสิทธิ์",
                  "แม่แบบเอกสารอิเล็กทรอนิกส์",
                  "เชื่อมต่อ API กับระบบ E-Saraban & ERP",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            พร้อมเข้าร่วมเครือข่าย BRIDGE?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            ลงทะเบียนเป็นสมาชิกวันนี้เพื่อเข้าถึงทรัพยากรและโอกาสทางธุรกิจ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-base group">
              <Link href="/partnership/register">
                เข้าร่วมเครือข่าย
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
              <Link href="/partnership">ค้นหาผู้ประกอบการ</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
