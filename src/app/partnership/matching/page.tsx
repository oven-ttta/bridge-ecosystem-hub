"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Target,
  Search,
  MapPin,
  Building2,
  Zap,
  ArrowRight,
  Users,
  CheckCircle2,
  Mail,
  Phone,
  ExternalLink,
  Star,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Hash,
  Package,
  Wrench,
  LayoutGrid,
} from "lucide-react";

// --- Types ---
type CatalogType = "product" | "service" | "both";

type MatchResult = {
  id: number;
  company: string;
  matchScore: number;
  type: string;
  catalogType: CatalogType; // ← NEW: ประเภทใน Catalog
  location: string;
  expertise: string[];
  matchReasons: string[];
  verified: boolean;
  projectsCompleted: number;
  avgRating: number;
  description?: string;
  tsic?: string;
  contact?: {
    email: string;
    phone: string;
    website: string;
  };
  services?: string[];
  products?: string[]; // ← NEW: รายการ Product ที่มีพร้อมขาย
};

// --- Catalog Type Config ---
const CATALOG_TYPE_CONFIG = {
  product: {
    label: "Product",
    sublabel: "สินค้าพร้อมขาย",
    icon: Package,
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
    dotColor: "bg-cyan-500",
    badgeBg: "bg-cyan-500",
  },
  service: {
    label: "Service",
    sublabel: "รับจ้างพัฒนา",
    icon: Wrench,
    color: "bg-amber-100 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
    badgeBg: "bg-amber-500",
  },
  both: {
    label: "Product + Service",
    sublabel: "มีทั้งสองประเภท",
    icon: LayoutGrid,
    color: "bg-violet-100 text-violet-700 border-violet-200",
    dotColor: "bg-violet-500",
    badgeBg: "bg-violet-500",
  },
};

// --- Catalog Type Badge Component ---
function CatalogTypeBadge({ type }: { type?: string }) {
  const normalizedType = type?.toLowerCase() as CatalogType;

  const config = CATALOG_TYPE_CONFIG[normalizedType];

  if (!config) {
    return (
      <Badge
        variant="outline"
        className="text-xs font-medium bg-gray-100 text-gray-500 border-gray-200"
      >
        Unknown
      </Badge>
    );
  }

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium gap-1 ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}

// --- Catalog Type Filter Button ---
function CatalogTypeFilter({
  value,
  selected,
  onClick,
}: {
  value: string;
  selected: boolean;
  onClick: () => void;
}) {
  const getConfig = () => {
    if (value === "all")
      return { label: "ทั้งหมด", icon: LayoutGrid, color: selected ? "bg-primary text-primary-foreground border-primary" : "" };
    const c = CATALOG_TYPE_CONFIG[value as CatalogType];
    return { label: c.label, icon: c.icon, color: selected ? c.color : "" };
  };
  const { label, icon: Icon, color } = getConfig();

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
        ${selected
          ? `${color} shadow-sm`
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
        }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

export default function MatchingPage() {
  const [searchTech, setSearchTech] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedCatalogType, setSelectedCatalogType] = useState("all"); // ← NEW
  const [selectedCompany, setSelectedCompany] = useState<MatchResult | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const ITEMS_PER_PAGE = 10;

  const performSearch = async (pageToFetch = 1) => {
    setIsSearching(true);
    try {
      const queryParams = new URLSearchParams({
        q: searchTech,
        region: selectedRegion,
        catalogType: selectedCatalogType, // ← NEW: ส่ง filter ไป API
        page: pageToFetch.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });

      const res = await fetch(`/api/companies/search?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Network latency or failed fetch");

      const rawData = await res.json();
      let data;

      if (rawData._data) {
        const binaryString = atob(rawData._data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decodedText = new TextDecoder().decode(bytes);
        data = JSON.parse(decodedText);
      } else {
        data = rawData;
      }

      setMatchResults(data.hits as MatchResult[]);
      setTotalHits(data.totalHits);
      setTotalPages(data.totalPages);
      setCurrentPage(pageToFetch);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(1);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTech, selectedRegion, selectedBudget, selectedCatalogType]); // ← เพิ่ม dep

  // Count by type (for filter badges)
  const countByType = (type: string) =>
    type === "all"
      ? matchResults.length
      : matchResults.filter((r) => r.catalogType === type || (type === "product" && r.catalogType === "both") || (type === "service" && r.catalogType === "both")).length;

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
        <div className="container mx-auto px-4 space-y-4">
          {/* Row 1: Search inputs */}
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                ความต้องการเทคโนโลยี
              </label>
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
            <Button
              className="h-12 px-8 bg-primary hover:bg-primary/90"
              onClick={() => performSearch(1)}
              disabled={isSearching}
            >
              <Zap className="w-4 h-4 mr-2" />
              {isSearching ? "กำลังค้นหา..." : "วิเคราะห์และจับคู่"}
            </Button>
          </div>

          {/* Row 2: Catalog Type Filter ← NEW */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground shrink-0">
              ประเภทผู้ให้บริการ:
            </span>
            {["all", "product", "service", "both"].map((type) => (
              <CatalogTypeFilter
                key={type}
                value={type}
                selected={selectedCatalogType === type}
                onClick={() => setSelectedCatalogType(type)}
              />
            ))}
            {selectedCatalogType !== "all" && (
              <span className="text-xs text-muted-foreground ml-1">
                {selectedCatalogType === "product" && "→ ซื้อได้เลย ราคาชัดเจน ส่งมอบเร็ว"}
                {selectedCatalogType === "service" && "→ Custom ได้เต็มที่ ต้องเจรจาขอบเขตงาน"}
                {selectedCatalogType === "both" && "→ ยืดหยุ่น มีทั้งของพร้อมขายและรับพัฒนา"}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">ผู้ให้บริการที่แนะนำ</h2>
                <p className="text-sm text-muted-foreground">
                  จับคู่จาก User Journey และ Profile ข้อมูลของคุณ
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Type summary badges ← NEW */}
                {matchResults.some((r) => r.catalogType === "product" || r.catalogType === "both") && (
                  <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200 gap-1">
                    <Package className="w-3 h-3" />
                    Product
                  </Badge>
                )}
                {matchResults.some((r) => r.catalogType === "service" || r.catalogType === "both") && (
                  <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200 gap-1">
                    <Wrench className="w-3 h-3" />
                    Service
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  พบ {totalHits} รายที่เหมาะสม
                </Badge>
              </div>
            </div>

            {/* Result Cards */}
            {matchResults.map((result) => (
              <Card
                key={result.id}
                className="border-border/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Score */}
                    <div className="lg:w-32 bg-gradient-to-br from-primary to-primary/80 p-6 flex flex-col items-center justify-center text-white shrink-0">
                      <div className="text-4xl font-bold">{result.matchScore}</div>
                      <div className="text-xs text-white/80 font-medium">Match Score</div>
                    </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-foreground">
                                {result.company}
                              </h3>
                              {result.verified && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-emerald-100 text-emerald-700"
                                >
                                  <CheckCircle2 className="w-3 h-3 mr-1" />{" "}
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" /> {result.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {result.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />{" "}
                                {result.projectsCompleted} โครงการ
                              </span>
                              {result.tsic && (
                                <span className="flex items-center gap-1">
                                  <Hash className="w-3 h-3" /> TSIC: {result.tsic}
                                </span>
                              )}
                            </div>
                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-lg font-semibold text-foreground">
                              {result.company}
                            </h3>
                            {result.verified && (
                              <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                              </Badge>
                            )}
                            {/* Catalog Type Badge ← NEW */}
                            <CatalogTypeBadge type={result.catalogType} />
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" /> {result.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {result.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" /> {result.projectsCompleted} โครงการ
                            </span>
                          </div>
                        </div>
                        <Button
                          className="bg-primary hover:bg-primary/90 shrink-0"
                          onClick={() => setSelectedCompany(result)}
                        >
                          ดูรายละเอียด
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.expertise.map((exp) => (
                          <Badge key={exp} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>

                      {/* Catalog Callout ← NEW: แสดงข้อมูลที่เกี่ยวกับ Product/Service */}
                      {result.catalogType !== undefined && (
                        <div
                          className={`rounded-lg px-4 py-2.5 mb-3 flex items-center gap-2 text-sm border
                            ${result.catalogType === "product" ? "bg-cyan-50 border-cyan-200 text-cyan-800" : ""}
                            ${result.catalogType === "service" ? "bg-amber-50 border-amber-200 text-amber-800" : ""}
                            ${result.catalogType === "both" ? "bg-violet-50 border-violet-200 text-violet-800" : ""}
                          `}
                        >
                          {result.catalogType === "product" && (
                            <>
                              <Package className="w-4 h-4 shrink-0" />
                              <span>มีสินค้าพร้อมขาย — ซื้อได้ทันที ราคาชัดเจน ไม่ต้องรอพัฒนา</span>
                            </>
                          )}
                          {result.catalogType === "service" && (
                            <>
                              <Wrench className="w-4 h-4 shrink-0" />
                              <span>รับจ้างพัฒนา Custom — ปรับแต่งได้ตามโจทย์ ต้องผ่านกระบวนการ Discovery</span>
                            </>
                          )}
                          {result.catalogType === "both" && (
                            <>
                              <LayoutGrid className="w-4 h-4 shrink-0" />
                              <span>มีทั้ง Product พร้อมขาย และ Service รับพัฒนา Custom</span>
                            </>
                          )}
                        </div>
                      )}

                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          เหตุผลในการจับคู่
                        </h4>
                        <ul className="space-y-1">
                          {result.matchReasons.map((reason, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-8 pb-4">
                <div className="text-sm text-muted-foreground">
                  แสดงหน้า{" "}
                  <span className="font-medium text-foreground">{currentPage}</span> จากทั้งหมด{" "}
                  <span className="font-medium text-foreground">{totalPages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline" size="icon"
                    onClick={() => performSearch(1)}
                    disabled={currentPage === 1 || isSearching}
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline" size="icon"
                    onClick={() => performSearch(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || isSearching}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm font-medium px-4">{currentPage}</div>
                  <Button
                    variant="outline" size="icon"
                    onClick={() => performSearch(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || isSearching}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline" size="icon"
                    onClick={() => performSearch(totalPages)}
                    disabled={currentPage === totalPages || isSearching}
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Company Detail Dialog */}
      <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCompany && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedCompany.matchScore}
                  </div>
                  <div>
                    <DialogTitle className="text-xl flex items-center gap-2 flex-wrap">
                      {selectedCompany.company}
                      {selectedCompany.verified && (
                        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                        </Badge>
                      )}
                      {/* Catalog Type Badge in Dialog ← NEW */}
                      <CatalogTypeBadge type={selectedCompany.catalogType} />
                    </DialogTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> {selectedCompany.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {selectedCompany.location}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-lg font-bold">{selectedCompany.avgRating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">คะแนนเฉลี่ย</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-lg font-bold">{selectedCompany.projectsCompleted}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">โครงการสำเร็จ</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1">
                      <Target className="w-4 h-4" />
                      <span className="text-lg font-bold">{selectedCompany.matchScore}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                  </div>
                </div>

                {/* Catalog Type Detail ← NEW */}
                <div className={`rounded-xl p-4 border
                  ${selectedCompany.catalogType === "product" ? "bg-cyan-50 border-cyan-200" : ""}
                  ${selectedCompany.catalogType === "service" ? "bg-amber-50 border-amber-200" : ""}
                  ${selectedCompany.catalogType === "both" ? "bg-violet-50 border-violet-200" : ""}
                `}>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    {selectedCompany.catalogType === "product" && <><Package className="w-4 h-4 text-cyan-600" /><span className="text-cyan-800">สินค้าพร้อมขาย (Product)</span></>}
                    {selectedCompany.catalogType === "service" && <><Wrench className="w-4 h-4 text-amber-600" /><span className="text-amber-800">รับจ้างพัฒนา (Service)</span></>}
                    {selectedCompany.catalogType === "both" && <><LayoutGrid className="w-4 h-4 text-violet-600" /><span className="text-violet-800">Product + Service</span></>}
                  </h4>

                  {/* Products list */}
                  {selectedCompany.products && selectedCompany.products.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Package className="w-3 h-3" /> สินค้าพร้อมขาย
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCompany.products.map((p) => (
                          <Badge key={p} className="text-xs bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services list */}
                  {selectedCompany.services && selectedCompany.services.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Wrench className="w-3 h-3" /> บริการรับพัฒนา
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCompany.services.map((s) => (
                          <Badge key={s} className="text-xs bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedCompany.description && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">เกี่ยวกับบริษัท</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedCompany.description}
                    </p>
                  </div>
                )}

                {/* TSIC Code */}
                {selectedCompany.tsic && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      รหัส TSIC
                    </h4>
                    <Badge className="text-sm bg-blue-100 text-blue-700 border-blue-200">
                      <Hash className="w-3 h-3 mr-1" />
                      {selectedCompany.tsic}
                    </Badge>
                  </div>
                )}

                {/* Expertise */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">ความเชี่ยวชาญ</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.expertise.map((exp) => (
                      <Badge key={exp} variant="outline" className="text-xs">{exp}</Badge>
                    ))}
                  </div>
                </div>

                {/* Match Reasons */}
                <div className="bg-emerald-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-emerald-800 mb-2">เหตุผลในการจับคู่</h4>
                  <ul className="space-y-2">
                    {selectedCompany.matchReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                {selectedCompany.contact && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">ข้อมูลติดต่อ</h4>
                    <div className="space-y-2">
                      <a href={`mailto:${selectedCompany.contact.email}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                        {selectedCompany.contact.email}
                      </a>
                      <a href={`tel:${selectedCompany.contact.phone}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" />
                        {selectedCompany.contact.phone}
                      </a>
                      <a href={`https://${selectedCompany.contact.website}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        {selectedCompany.contact.website}
                      </a>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Mail className="w-4 h-4 mr-2" />
                    ติดต่อบริษัท
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="w-4 h-4 mr-2" />
                    ขอนัดประชุม
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
