import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  Clock, 
  ArrowRight, 
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const openGrants = [
  {
    id: 1,
    title: "ทุนพัฒนานวัตกรรม AI สำหรับ SMEs",
    description: "สนับสนุนผู้ประกอบการขนาดกลางและเล็กในการพัฒนาและประยุกต์ใช้เทคโนโลยี AI เพื่อเพิ่มประสิทธิภาพการดำเนินธุรกิจ",
    budget: "2,000,000",
    deadline: "28 ก.พ. 2568",
    applicants: 45,
    status: "open",
    category: "AI Innovation",
    department: "ฝ่ายส่งเสริมนวัตกรรม",
  },
  {
    id: 2,
    title: "ทุนวิจัยและพัฒนา Big Data Analytics",
    description: "สนับสนุนการวิจัยและพัฒนาเครื่องมือวิเคราะห์ข้อมูลขนาดใหญ่ เพื่อสร้างมูลค่าเพิ่มให้กับภาคอุตสาหกรรม",
    budget: "5,000,000",
    deadline: "15 มี.ค. 2568",
    applicants: 28,
    status: "open",
    category: "Research",
    department: "ฝ่ายวิจัยและพัฒนา",
  },
  {
    id: 3,
    title: "โครงการส่งเสริม Digital Transformation",
    description: "สนับสนุนองค์กรในการปรับเปลี่ยนสู่ดิจิทัล ครอบคลุมทั้งกระบวนการทำงาน ระบบ และบุคลากร",
    budget: "1,500,000",
    deadline: "31 มี.ค. 2568",
    applicants: 62,
    status: "closing",
    category: "Digital Transformation",
    department: "ฝ่ายส่งเสริมอุตสาหกรรม",
  },
];

const myApplications = [
  {
    id: 101,
    title: "โครงการพัฒนา AI Chatbot",
    submittedDate: "15 ม.ค. 2568",
    status: "review",
    currentStep: "พิจารณาข้อเสนอ",
  },
  {
    id: 102,
    title: "โครงการวิเคราะห์ข้อมูลลูกค้า",
    submittedDate: "10 ธ.ค. 2567",
    status: "approved",
    currentStep: "อนุมัติแล้ว - รอลงนามสัญญา",
  },
];

const Grants = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-amber-50 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-700">
                <Wallet className="w-3 h-3 mr-1" />
                Digital Grant Management
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                ทุนสนับสนุน
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                ค้นหาทุนสนับสนุนที่เหมาะกับโครงการของคุณ ยื่นข้อเสนอออนไลน์ และติดตามสถานะได้แบบ Real-time
              </p>
              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90">
                  <FileText className="w-4 h-4 mr-2" />
                  ยื่นข้อเสนอโครงการ
                </Button>
                <Button variant="outline">
                  ดาวน์โหลดคู่มือ
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="open" className="space-y-8">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="open">ทุนที่เปิดรับสมัคร</TabsTrigger>
                <TabsTrigger value="my-applications">โครงการของฉัน</TabsTrigger>
                <TabsTrigger value="history">ประวัติ</TabsTrigger>
              </TabsList>

              <TabsContent value="open" className="space-y-6">
                {openGrants.map((grant) => (
                  <div
                    key={grant.id}
                    className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge 
                            variant={grant.status === "closing" ? "destructive" : "secondary"}
                          >
                            {grant.status === "closing" ? (
                              <><AlertCircle className="w-3 h-3 mr-1" /> ใกล้ปิดรับ</>
                            ) : (
                              "เปิดรับสมัคร"
                            )}
                          </Badge>
                          <Badge variant="outline">{grant.category}</Badge>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                          {grant.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {grant.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">หน่วยงาน: </span>
                            <span className="font-medium text-foreground">{grant.department}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ผู้สมัคร: </span>
                            <span className="font-medium text-foreground">{grant.applicants} ราย</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:text-right lg:min-w-[200px]">
                        <div className="mb-4">
                          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1 lg:justify-end">
                            <Wallet className="w-4 h-4" />
                            วงเงินทุน
                          </div>
                          <div className="text-2xl font-bold text-foreground">฿{grant.budget}</div>
                        </div>
                        <div className="mb-6">
                          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1 lg:justify-end">
                            <Clock className="w-4 h-4" />
                            ปิดรับสมัคร
                          </div>
                          <div className="font-semibold text-foreground">{grant.deadline}</div>
                        </div>
                        <Button className="w-full lg:w-auto">
                          ดูรายละเอียด
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="my-applications" className="space-y-6">
                {myApplications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-card rounded-2xl p-6 border border-border/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={app.status === "approved" ? "default" : "secondary"}>
                            {app.status === "approved" ? (
                              <><CheckCircle className="w-3 h-3 mr-1" /> อนุมัติแล้ว</>
                            ) : (
                              "กำลังพิจารณา"
                            )}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {app.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            ยื่นเมื่อ {app.submittedDate}
                          </span>
                          <span>•</span>
                          <span>{app.currentStep}</span>
                        </div>
                      </div>
                      <Button variant="outline">
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="history">
                <div className="text-center py-12 text-muted-foreground">
                  ยังไม่มีประวัติโครงการ
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Grants;
