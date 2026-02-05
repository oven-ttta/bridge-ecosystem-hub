"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Wallet,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  Building2,
  Download,
  ArrowRight,
  Info,
  Target,
  ListChecks,
  BookOpen,
} from "lucide-react";

const grantsData: Record<
  string,
  {
    id: number;
    title: string;
    budget: string;
    deadline: string;
    applicants: number;
    status: string;
    category: string;
    description: string;
    objectives: string[];
    eligibility: string[];
    documents: string[];
    timeline: { date: string; event: string }[];
    contact: { name: string; email: string; phone: string };
  }
> = {
  "1": {
    id: 1,
    title: "ทุนพัฒนานวัตกรรม AI สำหรับ SMEs",
    budget: "2,000,000",
    deadline: "28 ก.พ. 2568",
    applicants: 45,
    status: "open",
    category: "AI Innovation",
    description:
      "ทุนสนับสนุนเพื่อส่งเสริมให้ SMEs ไทยนำเทคโนโลยี AI มาประยุกต์ใช้ในการดำเนินธุรกิจ เพื่อเพิ่มประสิทธิภาพ ลดต้นทุน และสร้างนวัตกรรมใหม่ที่ตอบโจทย์ตลาด โดยสนับสนุนทั้งการวิจัย พัฒนา และนำไปใช้จริง",
    objectives: [
      "ส่งเสริมให้ SMEs ไทยนำ AI มาใช้ในกระบวนการทำงาน",
      "พัฒนาต้นแบบ AI Solution ที่สามารถนำไปใช้ได้จริง",
      "สร้างองค์ความรู้ด้าน AI สำหรับภาคธุรกิจ SMEs",
      "เพิ่มขีดความสามารถในการแข่งขันด้านดิจิทัล",
    ],
    eligibility: [
      "เป็นนิติบุคคลที่จดทะเบียนในประเทศไทย",
      "จัดอยู่ในประเภท SMEs ตามนิยามของ สสว.",
      "มีทีมงานด้านเทคโนโลยีอย่างน้อย 2 คน",
      "ไม่เป็นผู้ที่ค้างส่งรายงานทุนจากโครงการอื่นของ สขญ.",
      "มีแผนธุรกิจที่ชัดเจนในการนำ AI ไปใช้งานจริง",
    ],
    documents: [
      "ข้อเสนอโครงการ (ตามแบบฟอร์มที่กำหนด)",
      "หนังสือรับรองบริษัท (อายุไม่เกิน 6 เดือน)",
      "สำเนาบัตรประชาชนผู้มีอำนาจลงนาม",
      "งบการเงินย้อนหลัง 2 ปี",
      "ประวัติบริษัทและผลงาน (Company Profile)",
      "แผนการดำเนินโครงการ (Project Plan)",
    ],
    timeline: [
      { date: "1 ม.ค. 2568", event: "เปิดรับสมัคร" },
      { date: "28 ก.พ. 2568", event: "ปิดรับสมัคร" },
      { date: "1-15 มี.ค. 2568", event: "คณะกรรมการพิจารณา" },
      { date: "20 มี.ค. 2568", event: "ประกาศผล" },
      { date: "1 เม.ย. 2568", event: "ลงนามสัญญา" },
      { date: "เม.ย. - ก.ย. 2568", event: "ระยะเวลาดำเนินโครงการ (6 เดือน)" },
    ],
    contact: {
      name: "ฝ่ายบริหารทุนสนับสนุน สขญ.",
      email: "grants@bdi.or.th",
      phone: "02-xxx-xxxx ต่อ 201",
    },
  },
  "2": {
    id: 2,
    title: "ทุนวิจัยและพัฒนา Big Data Analytics",
    budget: "5,000,000",
    deadline: "15 มี.ค. 2568",
    applicants: 28,
    status: "open",
    category: "Research",
    description:
      "ทุนสนับสนุนงานวิจัยและพัฒนาด้าน Big Data Analytics เพื่อสร้างองค์ความรู้ใหม่ พัฒนาเครื่องมือ และแนวทางการวิเคราะห์ข้อมูลขนาดใหญ่ที่สามารถนำไปประยุกต์ใช้ในอุตสาหกรรมต่างๆ ของประเทศไทย",
    objectives: [
      "พัฒนาวิธีการวิเคราะห์ข้อมูลขนาดใหญ่แบบใหม่",
      "สร้างเครื่องมือ Open Source สำหรับ Big Data Analytics",
      "ถ่ายทอดองค์ความรู้สู่ภาคอุตสาหกรรม",
      "เผยแพร่ผลงานวิจัยในระดับนานาชาติ",
    ],
    eligibility: [
      "เป็นสถาบันการศึกษาหรือสถาบันวิจัย",
      "มีนักวิจัยหลักที่มีประสบการณ์ด้าน Data Science",
      "มีความร่วมมือกับภาคเอกชนอย่างน้อย 1 ราย",
      "มีแผนเผยแพร่ผลงานวิจัย",
    ],
    documents: [
      "ข้อเสนอโครงการวิจัย",
      "ประวัตินักวิจัย (CV)",
      "หนังสือรับรองจากสถาบัน",
      "หนังสือแสดงความร่วมมือจากภาคเอกชน",
      "แผนงบประมาณโดยละเอียด",
    ],
    timeline: [
      { date: "15 ม.ค. 2568", event: "เปิดรับสมัคร" },
      { date: "15 มี.ค. 2568", event: "ปิดรับสมัคร" },
      { date: "1-30 เม.ย. 2568", event: "ผู้ทรงคุณวุฒิประเมิน" },
      { date: "15 พ.ค. 2568", event: "ประกาศผล" },
      { date: "1 มิ.ย. 2568", event: "เริ่มดำเนินโครงการ" },
      { date: "มิ.ย. 2568 - พ.ค. 2569", event: "ระยะเวลาดำเนินโครงการ (12 เดือน)" },
    ],
    contact: {
      name: "ฝ่ายวิจัยและพัฒนา สขญ.",
      email: "research@bdi.or.th",
      phone: "02-xxx-xxxx ต่อ 301",
    },
  },
  "3": {
    id: 3,
    title: "โครงการส่งเสริม Digital Transformation",
    budget: "1,500,000",
    deadline: "31 มี.ค. 2568",
    applicants: 62,
    status: "closing",
    category: "Digital Transformation",
    description:
      "ทุนสนับสนุนสำหรับองค์กรที่ต้องการปรับเปลี่ยนกระบวนการทำงานสู่ดิจิทัล โดยเน้นการนำเทคโนโลยี Big Data และ AI เข้ามาช่วยเพิ่มประสิทธิภาพการดำเนินงาน",
    objectives: [
      "ช่วยเหลือองค์กรในการวางแผน Digital Transformation",
      "พัฒนา Proof of Concept สำหรับการปรับเปลี่ยนสู่ดิจิทัล",
      "สร้างกรณีศึกษาด้าน Digital Transformation",
      "เสริมสร้างทักษะดิจิทัลให้กับบุคลากรในองค์กร",
    ],
    eligibility: [
      "เป็นนิติบุคคลที่จดทะเบียนในประเทศไทย",
      "มีความพร้อมด้านบุคลากรและโครงสร้างพื้นฐาน",
      "มีแผนการปรับเปลี่ยนสู่ดิจิทัลที่ชัดเจน",
      "ผู้บริหารระดับสูงให้ความสำคัญและสนับสนุนโครงการ",
    ],
    documents: [
      "ข้อเสนอโครงการ Digital Transformation",
      "หนังสือรับรองบริษัท",
      "แผนการดำเนินโครงการ",
      "รายงานสถานะ Digital Maturity ขององค์กร",
    ],
    timeline: [
      { date: "1 ก.พ. 2568", event: "เปิดรับสมัคร" },
      { date: "31 มี.ค. 2568", event: "ปิดรับสมัคร" },
      { date: "1-15 เม.ย. 2568", event: "พิจารณาคัดเลือก" },
      { date: "30 เม.ย. 2568", event: "ประกาศผล" },
      { date: "พ.ค. - ต.ค. 2568", event: "ระยะเวลาดำเนินโครงการ (6 เดือน)" },
    ],
    contact: {
      name: "ฝ่ายส่งเสริมอุตสาหกรรมดิจิทัล สขญ.",
      email: "digital@bdi.or.th",
      phone: "02-xxx-xxxx ต่อ 401",
    },
  },
};

export default function GrantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const grant = grantsData[id];

  if (!grant) {
    return (
      <main className="min-h-[calc(100vh-80px)] py-12 px-4 pt-28">
        <div className="container mx-auto max-w-4xl text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">ไม่พบทุนสนับสนุน</h1>
          <p className="text-muted-foreground mb-6">
            ทุนสนับสนุนที่คุณค้นหาไม่มีในระบบ
          </p>
          <Button asChild>
            <Link href="/grants">กลับหน้าทุนสนับสนุน</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] py-12 px-4 pt-28">
      <div className="container mx-auto max-w-5xl">
        <Button variant="ghost" className="mb-6 gap-2" asChild>
          <Link href="/grants">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าทุนสนับสนุน
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant={grant.status === "closing" ? "destructive" : "secondary"}
                >
                  {grant.status === "closing" ? (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" /> ใกล้ปิดรับ
                    </>
                  ) : (
                    "เปิดรับสมัคร"
                  )}
                </Badge>
                <Badge variant="outline">{grant.category}</Badge>
              </div>

              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                {grant.title}
              </h1>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {grant.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Wallet className="w-4 h-4" />
                    วงเงินทุน
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    ฿{grant.budget}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    ปิดรับสมัคร
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {grant.deadline}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    ผู้สมัคร
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {grant.applicants} ราย
                  </div>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  วัตถุประสงค์
                </h2>
              </div>
              <ul className="space-y-3">
                {grant.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  คุณสมบัติผู้สมัคร
                </h2>
              </div>
              <ul className="space-y-3">
                {grant.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  เอกสารที่ต้องยื่น
                </h2>
              </div>
              <ul className="space-y-3">
                {grant.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  กำหนดการ
                </h2>
              </div>
              <div className="space-y-4">
                {grant.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                      {i < grant.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-sm font-medium text-foreground">
                        {item.date}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.event}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Button */}
              <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-6">
                <Button className="w-full h-12 text-base gap-2 mb-4">
                  ยื่นใบสมัคร
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  ดาวน์โหลดแบบฟอร์ม
                </Button>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">หมายเหตุ</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>- สมัครผ่านระบบออนไลน์เท่านั้น</li>
                  <li>- ผลการพิจารณาถือเป็นที่สิ้นสุด</li>
                  <li>- ไม่เสียค่าใช้จ่ายในการสมัคร</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">ติดต่อสอบถาม</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{grant.contact.name}</p>
                  <p>อีเมล: {grant.contact.email}</p>
                  <p>โทร: {grant.contact.phone}</p>
                </div>
              </div>

              {/* Related */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">ทุนที่เกี่ยวข้อง</h3>
                </div>
                <div className="space-y-3">
                  {Object.values(grantsData)
                    .filter((g) => g.id !== grant.id)
                    .slice(0, 2)
                    .map((g) => (
                      <Link
                        key={g.id}
                        href={`/grants/${g.id}`}
                        className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {g.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ฿{g.budget} | ปิด {g.deadline}
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
