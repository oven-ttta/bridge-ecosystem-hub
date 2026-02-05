"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Search,
  TrendingUp,
  MapPin,
  Building2,
  Zap,
  ArrowRight,
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Globe,
  Cpu,
  Database,
  Cloud,
  Shield,
} from "lucide-react";

// --- Mock Data ---
const matchResults = [
  {
    id: 1,
    company: "DataFirst Analytics",
    matchScore: 95,
    type: "Large Enterprise",
    location: "กรุงเทพมหานคร",
    expertise: ["Data Analytics", "Machine Learning", "Cloud Solutions"],
    matchReasons: [
      "ตรงความเชี่ยวชาญ AI/ML 100%",
      "ตรงพื้นที่ให้บริการ",
      "มีประสบการณ์กับ SME",
    ],
    verified: true,
    projectsCompleted: 24,
    avgRating: 4.8,
  },
  {
    id: 2,
    company: "AI Vision Lab",
    matchScore: 88,
    type: "SME",
    location: "เชียงใหม่",
    expertise: ["Computer Vision", "Deep Learning", "IoT"],
    matchReasons: [
      "ตรงความเชี่ยวชาญ Deep Learning",
      "ราคาเหมาะสมกับงบประมาณ",
      "มีผลงาน IoT ในภาคอุตสาหกรรม",
    ],
    verified: true,
    projectsCompleted: 15,
    avgRating: 4.6,
  },
  {
    id: 3,
    company: "Cloud AI Thailand",
    matchScore: 82,
    type: "Large Enterprise",
    location: "กรุงเทพมหานคร",
    expertise: ["Cloud Infrastructure", "AI/ML Ops", "DevOps"],
    matchReasons: [
      "ตรง Cloud Infrastructure",
      "รองรับการ Scale ขนาดใหญ่",
      "มี SLA 99.9%",
    ],
    verified: true,
    projectsCompleted: 42,
    avgRating: 4.9,
  },
  {
    id: 4,
    company: "SmartFactory Tech",
    matchScore: 76,
    type: "SME",
    location: "ระยอง",
    expertise: ["Industrial IoT", "Predictive Maintenance", "AI"],
    matchReasons: [
      "เชี่ยวชาญ Industrial IoT",
      "มีประสบการณ์โรงงานอุตสาหกรรม",
    ],
    verified: true,
    projectsCompleted: 9,
    avgRating: 4.5,
  },
];

const demandSupplyData = [
  { category: "AI/ML Solutions", demand: 145, supply: 89, icon: Cpu },
  { category: "Data Analytics", demand: 128, supply: 112, icon: Database },
  { category: "Cloud Infrastructure", demand: 98, supply: 76, icon: Cloud },
  { category: "IoT & Sensors", demand: 87, supply: 45, icon: Globe },
  { category: "Cybersecurity", demand: 76, supply: 34, icon: Shield },
];

const gapAnalysisRegions = [
  {
    region: "กรุงเทพฯ และปริมณฑล",
    totalSuppliers: 185,
    gaps: [
      { tech: "Cybersecurity", severity: "high", needed: 25 },
      { tech: "IoT", severity: "medium", needed: 12 },
    ],
  },
  {
    region: "ภาคเหนือ (เชียงใหม่, เชียงราย)",
    totalSuppliers: 42,
    gaps: [
      { tech: "AI/ML", severity: "high", needed: 18 },
      { tech: "Cloud Infrastructure", severity: "high", needed: 15 },
      { tech: "Data Analytics", severity: "medium", needed: 8 },
    ],
  },
  {
    region: "ภาคตะวันออก (ชลบุรี, ระยอง)",
    totalSuppliers: 38,
    gaps: [
      { tech: "Industrial IoT", severity: "critical", needed: 22 },
      { tech: "Predictive Maintenance", severity: "high", needed: 16 },
    ],
  },
  {
    region: "ภาคใต้ (สงขลา, ภูเก็ต)",
    totalSuppliers: 18,
    gaps: [
      { tech: "AI/ML", severity: "critical", needed: 20 },
      { tech: "Data Analytics", severity: "critical", needed: 18 },
      { tech: "Cloud", severity: "high", needed: 14 },
    ],
  },
  {
    region: "ภาคตะวันออกเฉียงเหนือ (ขอนแก่น, นครราชสีมา)",
    totalSuppliers: 15,
    gaps: [
      { tech: "ทุกสาขา", severity: "critical", needed: 30 },
    ],
  },
];

const severityConfig = {
  critical: { label: "วิกฤต", color: "bg-red-100 text-red-700 border-red-200" },
  high: { label: "สูง", color: "bg-amber-100 text-amber-700 border-amber-200" },
  medium: { label: "ปานกลาง", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
};

export default function MatchingPage() {
  const [searchTech, setSearchTech] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [showResults, setShowResults] = useState(true);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-700">
              <Target className="w-3 h-3 mr-1" />
              Smart Matching Engine
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              ระบบจับคู่ธุรกิจอัจฉริยะ
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              วิเคราะห์และจับคู่ Demand & Supply อัตโนมัติ จาก User Journey และ Profile ข้อมูล
            </p>
            <p className="text-muted-foreground">
              พร้อมวิเคราะห์ช่องว่างเชิงพื้นที่ (Gap Analysis) เพื่อค้นหาโอกาสทางธุรกิจในระบบนิเวศ
            </p>
          </div>
        </div>
      </section>

      {/* Matching Criteria */}
      <section className="py-8 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">ความต้องการเทคโนโลยี</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="เช่น AI/ML, Data Analytics, IoT..."
                  value={searchTech}
                  onChange={(e) => setSearchTech(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">พื้นที่</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[200px] h-12">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="เลือกภูมิภาค" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั่วประเทศ</SelectItem>
                  <SelectItem value="central">กรุงเทพฯ และปริมณฑล</SelectItem>
                  <SelectItem value="north">ภาคเหนือ</SelectItem>
                  <SelectItem value="east">ภาคตะวันออก</SelectItem>
                  <SelectItem value="south">ภาคใต้</SelectItem>
                  <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">งบประมาณ</label>
              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger className="w-[200px] h-12">
                  <SelectValue placeholder="ช่วงงบประมาณ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ไม่จำกัด</SelectItem>
                  <SelectItem value="small">ไม่เกิน 500,000</SelectItem>
                  <SelectItem value="medium">500,001 - 2,000,000</SelectItem>
                  <SelectItem value="large">มากกว่า 2,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="h-12 px-8 bg-primary hover:bg-primary/90" onClick={() => setShowResults(true)}>
              <Zap className="w-4 h-4 mr-2" />
              วิเคราะห์และจับคู่
            </Button>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="results" className="space-y-8">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="results">
                <Sparkles className="w-4 h-4 mr-2" />
                ผลการจับคู่
              </TabsTrigger>
              <TabsTrigger value="demand-supply">
                <TrendingUp className="w-4 h-4 mr-2" />
                Demand & Supply
              </TabsTrigger>
              <TabsTrigger value="gap-analysis">
                <BarChart3 className="w-4 h-4 mr-2" />
                Gap Analysis
              </TabsTrigger>
            </TabsList>

            {/* Match Results */}
            <TabsContent value="results" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">ผู้ให้บริการที่แนะนำ</h2>
                  <p className="text-sm text-muted-foreground">จับคู่จาก User Journey และ Profile ข้อมูลของคุณ</p>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  พบ {matchResults.length} รายที่เหมาะสม
                </Badge>
              </div>

              {matchResults.map((result) => (
                <Card key={result.id} className="border-border/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Score */}
                      <div className="lg:w-32 bg-gradient-to-br from-primary to-primary/80 p-6 flex flex-col items-center justify-center text-white">
                        <div className="text-4xl font-bold">{result.matchScore}</div>
                        <div className="text-xs text-white/80 font-medium">Match Score</div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-foreground">{result.company}</h3>
                              {result.verified && (
                                <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {result.type}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {result.location}</span>
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {result.projectsCompleted} โครงการ</span>
                            </div>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90">
                            ดูรายละเอียด
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.expertise.map((exp) => (
                            <Badge key={exp} variant="outline" className="text-xs">{exp}</Badge>
                          ))}
                        </div>

                        <div className="bg-muted/50 rounded-xl p-4">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">เหตุผลในการจับคู่</h4>
                          <ul className="space-y-1">
                            {result.matchReasons.map((reason, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Demand & Supply */}
            <TabsContent value="demand-supply" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">วิเคราะห์ Demand & Supply</h2>
                <p className="text-sm text-muted-foreground">ภาพรวมความต้องการและผู้ให้บริการในระบบนิเวศ</p>
              </div>

              <div className="grid gap-6">
                {demandSupplyData.map((item) => {
                  const gapPercentage = ((item.demand - item.supply) / item.demand) * 100;
                  return (
                    <Card key={item.category} className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{item.category}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-primary font-medium">Demand: {item.demand}</span>
                              <span className="text-emerald-600 font-medium">Supply: {item.supply}</span>
                              <span className="text-amber-600 font-medium">Gap: {item.demand - item.supply} ({gapPercentage.toFixed(0)}%)</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-emerald-500 rounded-l-full transition-all duration-700"
                            style={{ width: `${(item.supply / item.demand) * 100}%` }}
                          />
                          <div
                            className="h-full bg-amber-400/60"
                            style={{ width: `${gapPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Supply Coverage: {((item.supply / item.demand) * 100).toFixed(0)}%</span>
                          <span>Gap: {gapPercentage.toFixed(0)}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Gap Analysis */}
            <TabsContent value="gap-analysis" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Gap Analysis เชิงพื้นที่</h2>
                <p className="text-sm text-muted-foreground">วิเคราะห์ช่องว่างของ Supply Area ที่ยังขาดผู้ให้บริการ</p>
              </div>

              <div className="grid gap-6">
                {gapAnalysisRegions.map((region) => (
                  <Card key={region.region} className="border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <MapPin className="w-5 h-5 text-primary" />
                          {region.region}
                        </CardTitle>
                        <Badge variant="secondary">{region.totalSuppliers} ผู้ให้บริการ</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {region.gaps.map((gap, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/30"
                          >
                            <div className="flex items-center gap-3">
                              <AlertTriangle className={`w-5 h-5 ${
                                gap.severity === "critical" ? "text-red-500" :
                                gap.severity === "high" ? "text-amber-500" : "text-yellow-500"
                              }`} />
                              <div>
                                <span className="font-medium text-foreground">{gap.tech}</span>
                                <p className="text-xs text-muted-foreground">ต้องการเพิ่ม {gap.needed} ราย</p>
                              </div>
                            </div>
                            <Badge className={severityConfig[gap.severity as keyof typeof severityConfig].color}>
                              {severityConfig[gap.severity as keyof typeof severityConfig].label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
