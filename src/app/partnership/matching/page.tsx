"use client";

import { useState } from "react";
import {
  InstantSearch,
  useSearchBox,
  useHits,
  usePagination,
  Configure,
} from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
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
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Hash,
  Landmark,
  Calendar,
  Globe,
} from "lucide-react";

// --- Meilisearch Client ---
const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY!
);

// --- Types (matching real bdi_acc_company_with_tsic fields) ---
type CompanyHit = {
  id: number;
  tax_id: number;
  type: number;
  company_name_th: string;
  company_name: string;
  company_status: number;
  register_date: string;
  typeof_service: string[];
  subtypeof_service: string[];
  additional_info: string;
  location: string;
  city: string;
  district: string;
  subdistrict: string;
  zip: string;
  website: string;
  office_number: string;
  phone_number: string;
  fax_number: string;
  is_tech: number;
  register_capital: number;
  objective: string;
  is_verified: number | null;
  tsic: string;
  _rankingScore?: number;
};

// --- Business Size ---
type BusinessSize = "Micro" | "Small" | "Medium" | "Large" | "Unknown";

function getBusinessSize(capital: number): BusinessSize {
  if (!capital || capital === 0) return "Unknown";
  if (capital < 1_800_000) return "Micro";
  if (capital < 50_000_000) return "Small";
  if (capital < 500_000_000) return "Medium";
  return "Large";
}

const BUSINESS_SIZE_CONFIG: Record<BusinessSize, { label: string; sublabel: string; color: string }> = {
  Micro: { label: "Micro", sublabel: "< 1.8M", color: "bg-rose-100 text-rose-700 border-rose-200" },
  Small: { label: "Small", sublabel: "1.8M – 50M", color: "bg-sky-100 text-sky-700 border-sky-200" },
  Medium: { label: "Medium", sublabel: "50M – 500M", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  Large: { label: "Large", sublabel: "> 500M", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Unknown: { label: "N/A", sublabel: "ไม่ทราบ", color: "bg-gray-100 text-gray-500 border-gray-200" },
};

function BusinessSizeBadge({ capital }: { capital?: number }) {
  const size = getBusinessSize(capital ?? 0);
  const config = BUSINESS_SIZE_CONFIG[size];
  return (
    <Badge variant="outline" className={`text-xs font-medium gap-1 ${config.color}`}>
      <Landmark className="w-3 h-3" />
      {config.label}
      {size !== "Unknown" && <span className="opacity-60">({config.sublabel})</span>}
    </Badge>
  );
}

function formatCapital(capital?: number) {
  if (!capital || capital === 0) return "ไม่ทราบ";
  if (capital >= 1_000_000) return `${(capital / 1_000_000).toLocaleString("th-TH", { maximumFractionDigits: 2 })} ล้านบาท`;
  return `${capital.toLocaleString("th-TH")} บาท`;
}

// --- City Filter options ---
const CITY_OPTIONS = [
  { value: "all", label: "ทั่วประเทศ" },
  { value: "กรุงเทพมหานคร", label: "กรุงเทพมหานคร" },
  { value: "เชียงใหม่", label: "เชียงใหม่" },
  { value: "ระยอง", label: "ระยอง" },
  { value: "ขอนแก่น", label: "ขอนแก่น" },
  { value: "ภูเก็ต", label: "ภูเก็ต" },
  { value: "นนทบุรี", label: "นนทบุรี" },
  { value: "ปทุมธานี", label: "ปทุมธานี" },
];

// --- Inner component (uses InstantSearch hooks) ---
function SearchContent() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState<CompanyHit | null>(null);

  const { refine, query: searchQuery } = useSearchBox();
  const { hits, results } = useHits<CompanyHit>();
  const {
    currentRefinement: currentPage,
    nbPages: totalPages,
    refine: goToPage,
  } = usePagination();

  const totalHits = results?.nbHits ?? 0;
  const companies = hits as unknown as CompanyHit[];

  // Build filter string
  const filterString = selectedCity && selectedCity !== "all"
    ? `city = "${selectedCity}"`
    : "";

  // Score helpers
  const scorePercent = (score?: number) => Math.round((score ?? 1) * 100);
  const scoreGradient = (score?: number) => {
    const s = score ?? 1;
    if (s >= 0.8) return "from-emerald-600 to-emerald-500";
    if (s >= 0.6) return "from-primary to-primary/80";
    if (s >= 0.4) return "from-amber-500 to-amber-400";
    return "from-rose-500 to-rose-400";
  };

  return (
    <main className="pt-20">
      <Configure filters={filterString} hitsPerPage={12} {...({ meiliSearchParams: { showRankingScore: true } } as any)} />

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

      {/* Search & Filter Bar */}
      <section className="py-6 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                ค้นหาบริษัท / เทคโนโลยี / บริการ
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="เช่น AI, Data Analytics, Software, ชื่อบริษัท..."
                  value={searchQuery}
                  onChange={(e) => refine(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">จังหวัด</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-[200px] h-12">
                  <MapPin className="w-4 h-4 mr-2 shrink-0" />
                  <SelectValue placeholder="เลือกจังหวัด" />
                </SelectTrigger>
                <SelectContent>
                  {CITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">บริษัทในระบบนิเวศ</h2>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? `ผลการค้นหา "${searchQuery}"` : "แสดงบริษัทเทคโนโลยีทั้งหมด"}
                </p>
              </div>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                พบ {totalHits} บริษัท
              </Badge>
            </div>

            {/* Company Cards */}
            {companies.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">ไม่พบบริษัทที่ตรงกับเงื่อนไข</p>
                <p className="text-sm mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกจังหวัดอื่น</p>
              </div>
            )}

            {companies.map((company) => (
              <Card
                key={company.id}
                className="border-border/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Ranking Score */}
                    <div className={`lg:w-28 bg-gradient-to-br ${scoreGradient(company._rankingScore)} p-5 flex flex-col items-center justify-center text-white shrink-0`}>
                      <div className="text-4xl font-bold tabular-nums">
                        {scorePercent(company._rankingScore)}
                      </div>
                      <div className="text-xs text-white/80 font-medium mt-1">Match Score</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          {/* Company Name + Badges */}
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-lg font-semibold text-foreground truncate">
                              {company.company_name_th || company.company_name}
                            </h3>
                            {company.is_verified === 1 && (
                              <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 shrink-0">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                              </Badge>
                            )}
                            <BusinessSizeBadge capital={company.register_capital} />
                            {company.tsic && (
                              <span className="flex items-center gap-1 border border-blue-400 text-blue-700 bg-blue-100 text-xs px-1.5 py-0.5 rounded-xl shrink-0">
                                <Hash className="w-3 h-3" /> TSIC: {company.tsic}
                              </span>
                            )}
                          </div>

                          {/* English name */}
                          {company.company_name && (
                            <p className="text-sm text-muted-foreground mb-2">{company.company_name}</p>
                          )}

                          {/* Meta row */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap mb-3">
                            {company.city && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {company.city}
                                {company.district ? ` · ${company.district}` : ""}
                              </span>
                            )}
                            {company.register_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> จดทะเบียน {company.register_date}
                              </span>
                            )}
                            {company.website && (
                              <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-primary transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Globe className="w-3 h-3" />
                                {company.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                              </a>
                            )}
                          </div>

                          {/* Description */}
                          {(company.additional_info || company.objective) && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {company.additional_info || company.objective}
                            </p>
                          )}
                        </div>

                        <Button
                          className="bg-primary hover:bg-primary/90 shrink-0 self-start"
                          onClick={() => setSelectedCompany(company)}
                        >
                          ดูรายละเอียด
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
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
                  หน้า <span className="font-medium text-foreground">{currentPage + 1}</span> จาก{" "}
                  <span className="font-medium text-foreground">{totalPages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => goToPage(0)} disabled={currentPage === 0}>
                    <ChevronsLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm font-medium px-4">{currentPage + 1}</div>
                  <Button variant="outline" size="icon" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => goToPage(totalPages - 1)} disabled={currentPage === totalPages - 1}>
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
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {(selectedCompany.company_name_th || selectedCompany.company_name || "?").charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="text-xl flex items-center gap-2 flex-wrap">
                      {selectedCompany.company_name_th || selectedCompany.company_name}
                      {selectedCompany.is_verified === 1 && (
                        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </DialogTitle>
                    {selectedCompany.company_name && selectedCompany.company_name_th && (
                      <p className="text-sm text-muted-foreground mt-0.5">{selectedCompany.company_name}</p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                      {selectedCompany.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {selectedCompany.city}
                        </span>
                      )}
                      {selectedCompany.register_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {selectedCompany.register_date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                {/* Badges row */}
                <div className="flex flex-wrap gap-2">
                  <BusinessSizeBadge capital={selectedCompany.register_capital} />
                  {selectedCompany.tsic && (
                    <Badge className="text-sm bg-blue-100 text-blue-700 border-blue-200 gap-1">
                      <Hash className="w-3 h-3" />
                      TSIC: {selectedCompany.tsic}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">ทุนจดทะเบียน</p>
                    <p className="text-sm font-semibold text-foreground">
                      {formatCapital(selectedCompany.register_capital)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">ที่อยู่</p>
                    <p className="text-sm font-semibold text-foreground">
                      {[selectedCompany.subdistrict, selectedCompany.district, selectedCompany.city]
                        .filter(Boolean)
                        .join(", ") || "-"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {(selectedCompany.additional_info || selectedCompany.objective) && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">เกี่ยวกับบริษัท</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedCompany.additional_info || selectedCompany.objective}
                    </p>
                  </div>
                )}

                {/* Address */}
                {selectedCompany.location && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">ที่อยู่สำนักงาน</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCompany.location}
                      {selectedCompany.zip ? ` ${selectedCompany.zip}` : ""}
                    </p>
                  </div>
                )}

                {/* Contact */}
                {(selectedCompany.website || selectedCompany.phone_number || selectedCompany.office_number) && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">ข้อมูลติดต่อ</h4>
                    <div className="space-y-2">
                      {(selectedCompany.phone_number || selectedCompany.office_number) && (
                        <a
                          href={`tel:${selectedCompany.phone_number || selectedCompany.office_number}`}
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {selectedCompany.phone_number || selectedCompany.office_number}
                        </a>
                      )}
                      {selectedCompany.website && (
                        <a
                          href={selectedCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {selectedCompany.website}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Tax ID */}
                {selectedCompany.tax_id && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      เลขประจำตัวผู้เสียภาษี: {selectedCompany.tax_id}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  {(selectedCompany.phone_number || selectedCompany.office_number) ? (
                    <a
                      href={`tel:${selectedCompany.phone_number || selectedCompany.office_number}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Phone className="w-4 h-4 mr-2" />
                        โทรติดต่อ
                      </Button>
                    </a>
                  ) : (
                    <Button className="flex-1 bg-primary hover:bg-primary/90" disabled>
                      <Mail className="w-4 h-4 mr-2" />
                      ติดต่อบริษัท
                    </Button>
                  )}
                  {selectedCompany.website && (
                    <a
                      href={selectedCompany.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        <Globe className="w-4 h-4 mr-2" />
                        เยี่ยมชมเว็บไซต์
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

// --- Root component wraps with InstantSearch ---
export default function MatchingPage() {
  return (
    <InstantSearch indexName="bdi_acc_company_with_tsic" searchClient={searchClient}>
      <SearchContent />
    </InstantSearch>
  );
}
