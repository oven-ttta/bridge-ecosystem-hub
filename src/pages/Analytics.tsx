import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  TrendingUp,
  MapPin,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const overviewStats = [
  { 
    label: "ผู้ประกอบการในเครือข่าย", 
    value: "523", 
    change: "+12%", 
    trend: "up",
    icon: Users 
  },
  { 
    label: "โครงการที่ได้รับทุน", 
    value: "128", 
    change: "+8%", 
    trend: "up",
    icon: Briefcase 
  },
  { 
    label: "มูลค่าทุนที่สนับสนุน (ล้านบาท)", 
    value: "245.5", 
    change: "+24%", 
    trend: "up",
    icon: TrendingUp 
  },
  { 
    label: "กิจกรรมที่จัดในปีนี้", 
    value: "47", 
    change: "-3%", 
    trend: "down",
    icon: Calendar 
  },
];

const regionData = [
  { region: "กรุงเทพฯ และปริมณฑล", count: 285, percentage: 55 },
  { region: "ภาคเหนือ", count: 78, percentage: 15 },
  { region: "ภาคตะวันออก", count: 72, percentage: 14 },
  { region: "ภาคใต้", count: 47, percentage: 9 },
  { region: "ภาคตะวันออกเฉียงเหนือ", count: 41, percentage: 7 },
];

const demandCategories = [
  { category: "AI/ML Solutions", demand: 145, supply: 89 },
  { category: "Data Analytics", demand: 128, supply: 112 },
  { category: "Cloud Infrastructure", demand: 98, supply: 76 },
  { category: "IoT & Sensors", demand: 87, supply: 45 },
  { category: "Cybersecurity", demand: 76, supply: 34 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-rose-50 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-rose-100 text-rose-700">
                <BarChart3 className="w-3 h-3 mr-1" />
                Smart Dashboard & Reporting
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Dashboard และรายงาน
              </h1>
              <p className="text-lg text-muted-foreground">
                ติดตามและวิเคราะห์ข้อมูลระบบนิเวศ Big Data และ AI ของประเทศไทยแบบ Real-time
              </p>
            </div>
          </div>
        </section>

        {/* Overview Stats */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {overviewStats.map((stat) => (
                <Card key={stat.label} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
                      }`}>
                        {stat.trend === "up" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Geographic Distribution */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    การกระจายตัวตามภูมิภาค
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.map((region) => (
                      <div key={region.region}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-foreground font-medium">{region.region}</span>
                          <span className="text-muted-foreground">{region.count} ราย ({region.percentage}%)</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                            style={{ width: `${region.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Demand vs Supply */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    วิเคราะห์ Demand & Supply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demandCategories.map((cat) => (
                      <div key={cat.category}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-foreground font-medium">{cat.category}</span>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-primary">Demand: {cat.demand}</span>
                            <span className="text-emerald-600">Supply: {cat.supply}</span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                          <div 
                            className="h-full bg-primary rounded-l-full"
                            style={{ width: `${(cat.supply / cat.demand) * 100}%` }}
                          />
                          <div 
                            className="h-full bg-primary/30"
                            style={{ width: `${100 - (cat.supply / cat.demand) * 100}%` }}
                          />
                        </div>
                        {cat.demand > cat.supply * 1.5 && (
                          <p className="text-xs text-amber-600 mt-1">
                            Gap: ต้องการผู้ให้บริการเพิ่มเติม {cat.demand - cat.supply} ราย
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Business Matching Impact */}
              <Card className="border-border/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                    ผลกระทบจาก Business Matching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-primary/5 rounded-2xl">
                      <div className="text-4xl font-bold text-primary mb-2">143</div>
                      <div className="text-sm text-muted-foreground">การจับคู่สำเร็จ</div>
                    </div>
                    <div className="text-center p-6 bg-accent/20 rounded-2xl">
                      <div className="text-4xl font-bold text-accent-foreground mb-2">฿24M</div>
                      <div className="text-sm text-muted-foreground">มูลค่าธุรกิจที่เกิดขึ้น</div>
                    </div>
                    <div className="text-center p-6 bg-emerald-50 rounded-2xl">
                      <div className="text-4xl font-bold text-emerald-600 mb-2">89%</div>
                      <div className="text-sm text-muted-foreground">ความพึงพอใจ</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
