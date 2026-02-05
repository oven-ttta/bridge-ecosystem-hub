import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Clock, 
  Wallet,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const openGrants = [
  {
    id: 1,
    title: "ทุนพัฒนานวัตกรรม AI สำหรับ SMEs",
    budget: "2,000,000",
    deadline: "28 ก.พ. 2568",
    applicants: 45,
    status: "open",
    category: "AI Innovation",
  },
  {
    id: 2,
    title: "ทุนวิจัยและพัฒนา Big Data Analytics",
    budget: "5,000,000",
    deadline: "15 มี.ค. 2568",
    applicants: 28,
    status: "open",
    category: "Research",
  },
  {
    id: 3,
    title: "โครงการส่งเสริม Digital Transformation",
    budget: "1,500,000",
    deadline: "31 มี.ค. 2568",
    applicants: 62,
    status: "closing",
    category: "Digital Transformation",
  },
];

const grantProcess = [
  { step: 1, label: "ลงทะเบียน", icon: FileText },
  { step: 2, label: "ยื่นข้อเสนอ", icon: FileText },
  { step: 3, label: "พิจารณา", icon: Clock },
  { step: 4, label: "อนุมัติทุน", icon: CheckCircle },
];

export function GrantsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Wallet className="w-4 h-4" />
              Digital Grant Management
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              ทุนสนับสนุนที่เปิดรับสมัคร
            </h2>
            <p className="text-muted-foreground max-w-xl">
              ยื่นข้อเสนอโครงการ ติดตามสถานะ และลงนามสัญญาอิเล็กทรอนิกส์ ได้อย่างสะดวกและโปร่งใส
            </p>
          </div>
          <Button asChild variant="outline" className="lg:self-end">
            <Link href="/grants">
              ดูทุนทั้งหมด
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        {/* Process Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {grantProcess.map((item, index) => (
            <div key={item.step} className="relative">
              <div className="bg-card rounded-2xl p-6 border border-border/50 text-center group hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">ขั้นตอนที่ {item.step}</div>
                <div className="font-semibold text-foreground">{item.label}</div>
              </div>
              {index < grantProcess.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
        
        {/* Grant Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openGrants.map((grant) => (
            <Link
              key={grant.id}
              href={`/grants/${grant.id}`}
              className="group bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge 
                  variant={grant.status === "closing" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {grant.status === "closing" ? (
                    <><AlertCircle className="w-3 h-3 mr-1" /> ใกล้ปิดรับ</>
                  ) : (
                    "เปิดรับสมัคร"
                  )}
                </Badge>
                <span className="text-xs text-muted-foreground">{grant.category}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                {grant.title}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    วงเงินทุน
                  </span>
                  <span className="font-semibold text-foreground">฿{grant.budget}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ปิดรับสมัคร
                  </span>
                  <span className="font-medium text-foreground">{grant.deadline}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  {grant.applicants} ผู้สมัครแล้ว
                </span>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  ดูรายละเอียด
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
