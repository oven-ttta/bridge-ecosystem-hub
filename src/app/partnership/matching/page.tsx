"use client";

import { useState, useEffect } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
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
  Package,
  Wrench,
  LayoutGrid,
} from "lucide-react";

// --- Meilisearch Client ---
const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY!,
);

// --- Types ---
type CatalogType = "product" | "service" | "both";
type BusinessSize = "Micro" | "Small" | "Medium" | "Large" | "Unknown";

type CatalogItem = {
  id: number;
  company_id: number;
  type: "product" | "service";
  name: string;
  description: string;
  price: number;
  pricing_model: string;
  delivery_time: string;
};

type CompanyCatalog = {
  type: CatalogType;
  products: CatalogItem[];
  services: CatalogItem[];
};

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
  new_s_curve:
    | "ROBOTICS"
    | "AVIATION_LOGISTICS"
    | "BIOFUEL_BIOCHEMICAL"
    | "DIGITAL"
    | "MEDICAL_HUB"
    | null;
  _rankingScore?: number;
};

// --- New S-Curve Config ---
type SCurveValue =
  | "ROBOTICS"
  | "AVIATION_LOGISTICS"
  | "BIOFUEL_BIOCHEMICAL"
  | "DIGITAL"
  | "MEDICAL_HUB";

const S_CURVE_CONFIG: Record<SCurveValue, { label: string; color: string }> = {
  ROBOTICS: {
    label: "หุ่นยนต์",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  AVIATION_LOGISTICS: {
    label: "การบิน & โลจิสติกส์",
    color: "bg-sky-100 text-sky-700 border-sky-200",
  },
  BIOFUEL_BIOCHEMICAL: {
    label: "เชื้อเพลิงชีวภาพ",
    color: "bg-lime-100 text-lime-700 border-lime-200",
  },
  DIGITAL: {
    label: "ดิจิทัล",
    color: "bg-violet-100 text-violet-700 border-violet-200",
  },
  MEDICAL_HUB: {
    label: "การแพทย์",
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
};

// --- Catalog Type Config ---
const CATALOG_TYPE_CONFIG = {
  product: {
    label: "Product",
    sublabel: "สินค้าพร้อมขาย",
    icon: Package,
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
  service: {
    label: "Service",
    sublabel: "รับจ้างพัฒนา",
    icon: Wrench,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  both: {
    label: "Product + Service",
    sublabel: "มีทั้งสองประเภท",
    icon: LayoutGrid,
    color: "bg-violet-100 text-violet-700 border-violet-200",
  },
};

function CatalogTypeBadge({ type }: { type: CatalogType }) {
  const config = CATALOG_TYPE_CONFIG[type];
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
      return {
        label: "ทั้งหมด",
        icon: LayoutGrid,
        color: selected
          ? "bg-primary text-primary-foreground border-primary"
          : "",
      };
    const c = CATALOG_TYPE_CONFIG[value as CatalogType];
    return { label: c.label, icon: c.icon, color: selected ? c.color : "" };
  };
  const { label, icon: Icon, color } = getConfig();
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
        ${selected ? `${color} shadow-sm` : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

// --- Business Size ---
const BUSINESS_SIZE_CONFIG: Record<
  BusinessSize,
  { label: string; sublabel: string; color: string }
> = {
  Micro: {
    label: "Micro",
    sublabel: "< 1.8M",
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
  Small: {
    label: "Small",
    sublabel: "1.8M – 50M",
    color: "bg-sky-100 text-sky-700 border-sky-200",
  },
  Medium: {
    label: "Medium",
    sublabel: "50M – 500M",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  Large: {
    label: "Large",
    sublabel: "> 500M",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  Unknown: {
    label: "N/A",
    sublabel: "ไม่ทราบ",
    color: "bg-gray-100 text-gray-500 border-gray-200",
  },
};

function getBusinessSize(capital: number): BusinessSize {
  if (!capital || capital === 0) return "Unknown";
  if (capital < 1_800_000) return "Micro";
  if (capital < 50_000_000) return "Small";
  if (capital < 500_000_000) return "Medium";
  return "Large";
}

function BusinessSizeBadge({ capital }: { capital?: number }) {
  const size = getBusinessSize(capital ?? 0);
  const config = BUSINESS_SIZE_CONFIG[size];
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium gap-1 ${config.color}`}
    >
      <Landmark className="w-3 h-3" />
      {config.label}
      {size !== "Unknown" && (
        <span className="opacity-60">({config.sublabel})</span>
      )}
    </Badge>
  );
}

function formatCapital(capital?: number) {
  if (!capital || capital === 0) return "ไม่ทราบ";
  if (capital >= 1_000_000)
    return `${(capital / 1_000_000).toLocaleString("th-TH", { maximumFractionDigits: 2 })} ล้านบาท`;
  return `${capital.toLocaleString("th-TH")} บาท`;
}

// --- Thai provinces (77 จังหวัด) ---
const THAI_PROVINCES = [
  "กรุงเทพมหานคร",
  "สมุทรปราการ",
  "นนทบุรี",
  "ปทุมธานี",
  "พระนครศรีอยุธยา",
  "อ่างทอง",
  "ลพบุรี",
  "สิงห์บุรี",
  "ชัยนาท",
  "สระบุรี",
  "ชลบุรี",
  "ระยอง",
  "จันทบุรี",
  "ตราด",
  "ฉะเชิงเทรา",
  "ปราจีนบุรี",
  "นครนายก",
  "สระแก้ว",
  "นครราชสีมา",
  "บุรีรัมย์",
  "สุรินทร์",
  "ศรีสะเกษ",
  "อุบลราชธานี",
  "ยโสธร",
  "ชัยภูมิ",
  "อำนาจเจริญ",
  "หนองบัวลำภู",
  "ขอนแก่น",
  "อุดรธานี",
  "เลย",
  "หนองคาย",
  "มหาสารคาม",
  "ร้อยเอ็ด",
  "กาฬสินธุ์",
  "สกลนคร",
  "นครพนม",
  "มุกดาหาร",
  "เชียงใหม่",
  "ลำพูน",
  "ลำปาง",
  "อุตรดิตถ์",
  "แพร่",
  "น่าน",
  "พะเยา",
  "เชียงราย",
  "แม่ฮ่องสอน",
  "นครสวรรค์",
  "อุทัยธานี",
  "กำแพงเพชร",
  "ตาก",
  "สุโขทัย",
  "พิษณุโลก",
  "พิจิตร",
  "เพชรบูรณ์",
  "ราชบุรี",
  "กาญจนบุรี",
  "สุพรรณบุรี",
  "นครปฐม",
  "สมุทรสาคร",
  "สมุทรสงคราม",
  "เพชรบุรี",
  "ประจวบคีรีขันธ์",
  "นครศรีธรรมราช",
  "กระบี่",
  "พังงา",
  "ภูเก็ต",
  "สุราษฎร์ธานี",
  "ระนอง",
  "ชุมพร",
  "สงขลา",
  "สตูล",
  "ตรัง",
  "พัทลุง",
  "ปัตตานี",
  "ยะลา",
  "นราธิวาส",
  "บึงกาฬ",
];

// --- Inner component (uses InstantSearch hooks) ---
function SearchContent() {
  const [selectedCity, setSelectedCity] = useState("");
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [selectedSCurve, setSelectedSCurve] = useState<SCurveValue | "">("");
  const [selectedCatalogType, setSelectedCatalogType] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState<CompanyHit | null>(
    null,
  );
  const [catalogMap, setCatalogMap] = useState<Map<number, CompanyCatalog>>(
    new Map(),
  );

  const { refine, query: searchQuery } = useSearchBox();
  const { hits, results } = useHits<CompanyHit>();
  const {
    currentRefinement: currentPage,
    nbPages: totalPages,
    refine: goToPage,
  } = usePagination();

  const companies = hits as unknown as CompanyHit[];

  // Fetch all company_catalog data once on mount
  useEffect(() => {
    const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST;
    const key = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY;
    fetch(`${host}/indexes/company_catalog/documents?limit=1000`, {
      headers: { Authorization: `Bearer ${key}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const map = new Map<number, CompanyCatalog>();
        for (const item of data.results as CatalogItem[]) {
          const existing = map.get(item.company_id) ?? {
            type: "service" as CatalogType,
            products: [],
            services: [],
          };
          if (item.type === "product") existing.products.push(item);
          else existing.services.push(item);
          existing.type =
            existing.products.length > 0 && existing.services.length > 0
              ? "both"
              : existing.products.length > 0
                ? "product"
                : "service";
          map.set(item.company_id, existing);
        }
        setCatalogMap(map);
      })
      .catch(console.error);
  }, []);

  // Build filter string
  const filters = [
    selectedCity ? `city = "${selectedCity}"` : "",
    selectedSCurve ? `new_s_curve = "${selectedSCurve}"` : "",
  ]
    .filter(Boolean)
    .join(" AND ");
  const filterString = filters;

  // Client-side filter by catalog type
  const filteredCompanies =
    selectedCatalogType === "all"
      ? companies
      : companies.filter((c) => {
          const cat = catalogMap.get(c.id);
          if (!cat) return false;
          if (selectedCatalogType === "both") return cat.type === "both";
          return cat.type === selectedCatalogType || cat.type === "both";
        });

  // Score helpers
  const scorePercent = (score?: number) => Math.round((score ?? 1) * 100);
  const scoreGradient = (score?: number) => {
    const s = score ?? 1;
    if (s >= 0.8) return "from-emerald-600 to-emerald-500";
    if (s >= 0.6) return "from-primary to-primary/80";
    if (s >= 0.4) return "from-amber-500 to-amber-400";
    return "from-rose-500 to-rose-400";
  };

  const totalHits = results?.nbHits ?? 0;

  return (
    <main className="pt-20">
      <Configure
        filters={filterString}
        hitsPerPage={12}
        {...({ meiliSearchParams: { showRankingScore: true } } as any)}
      />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="mb-4 bg-emerald-100 text-emerald-700"
            >
              <Target className="w-3 h-3 mr-1" />
              Smart Matching Engine
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              ระบบจับคู่ธุรกิจอัจฉริยะ
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              วิเคราะห์และจับคู่ Demand & Supply อัตโนมัติ จาก User Journey และ
              Profile ข้อมูล
            </p>
            <p className="text-muted-foreground">
              พร้อมวิเคราะห์ช่องว่างเชิงพื้นที่ (Gap Analysis)
              เพื่อค้นหาโอกาสทางธุรกิจในระบบนิเวศ
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4 space-y-4">
          {/* Row 1: Search + City */}
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
              <label className="text-sm font-medium text-foreground mb-2 block">
                จังหวัด
              </label>
              <Popover open={provinceOpen} onOpenChange={setProvinceOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-52 h-12 justify-between font-normal"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                      {selectedCity || "ทั่วประเทศ"}
                    </span>
                    <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="ค้นหาจังหวัด..." />
                    <CommandList>
                      <CommandEmpty>ไม่พบจังหวัด</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="__all__"
                          onSelect={() => {
                            setSelectedCity("");
                            setProvinceOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 w-4 h-4 ${!selectedCity ? "opacity-100" : "opacity-0"}`}
                          />
                          ทั่วประเทศ
                        </CommandItem>
                        {THAI_PROVINCES.map((p) => (
                          <CommandItem
                            key={p}
                            value={p}
                            onSelect={() => {
                              setSelectedCity(p);
                              setProvinceOpen(false);
                            }}
                          >
                            <Check
                              className={`mr-2 w-4 h-4 ${selectedCity === p ? "opacity-100" : "opacity-0"}`}
                            />
                            {p}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Row 2: New S-Curve Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground shrink-0">
              New S-Curve:
            </span>
            <button
              onClick={() => setSelectedSCurve("")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
                ${!selectedSCurve ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
            >
              ทั้งหมด
            </button>
            {(
              Object.entries(S_CURVE_CONFIG) as [
                SCurveValue,
                (typeof S_CURVE_CONFIG)[SCurveValue],
              ][]
            ).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() =>
                  setSelectedSCurve(selectedSCurve === key ? "" : key)
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
                  ${selectedSCurve === key ? `${cfg.color} shadow-sm` : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
              >
                {cfg.label}
              </button>
            ))}
          </div>

          {/* Row 3: Catalog Type Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground shrink-0">
              ประเภทผู้ให้บริการ:
            </span>
            {(["all", "product", "service", "both"] as const).map((type) => (
              <CatalogTypeFilter
                key={type}
                value={type}
                selected={selectedCatalogType === type}
                onClick={() => setSelectedCatalogType(type)}
              />
            ))}
            {selectedCatalogType !== "all" && (
              <span className="text-xs text-muted-foreground ml-1">
                {selectedCatalogType === "product" &&
                  "→ ซื้อได้เลย ราคาชัดเจน ส่งมอบเร็ว"}
                {selectedCatalogType === "service" &&
                  "→ Custom ได้เต็มที่ ต้องเจรจาขอบเขตงาน"}
                {selectedCatalogType === "both" &&
                  "→ ยืดหยุ่น มีทั้งของพร้อมขายและรับพัฒนา"}
              </span>
            )}
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
                <h2 className="text-xl font-semibold text-foreground">
                  ผู้ให้บริการที่แนะนำ
                </h2>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? `ผลการค้นหา "${searchQuery}"`
                    : "แสดงบริษัทเทคโนโลยีทั้งหมด"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {filteredCompanies.some((c) => {
                  const cat = catalogMap.get(c.id);
                  return cat?.type === "product" || cat?.type === "both";
                }) && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200 gap-1"
                  >
                    <Package className="w-3 h-3" /> Product
                  </Badge>
                )}
                {filteredCompanies.some((c) => {
                  const cat = catalogMap.get(c.id);
                  return cat?.type === "service" || cat?.type === "both";
                }) && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-amber-50 text-amber-700 border-amber-200 gap-1"
                  >
                    <Wrench className="w-3 h-3" /> Service
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700"
                >
                  พบ{" "}
                  {selectedCatalogType === "all"
                    ? totalHits
                    : filteredCompanies.length}{" "}
                  บริษัท
                </Badge>
              </div>
            </div>

            {/* Company Cards */}
            {filteredCompanies.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">ไม่พบบริษัทที่ตรงกับเงื่อนไข</p>
                <p className="text-sm mt-1">
                  ลองเปลี่ยนคำค้นหาหรือเลือกประเภทอื่น
                </p>
              </div>
            )}

            {filteredCompanies.map((company) => {
              const catalog = catalogMap.get(company.id);
              return (
                <Card
                  key={company.id}
                  className="border-border/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Ranking Score */}
                      <div
                        className={`lg:w-28 bg-gradient-to-br ${scoreGradient(company._rankingScore)} p-5 flex flex-col items-center justify-center text-white shrink-0`}
                      >
                        <div className="text-4xl font-bold tabular-nums">
                          {scorePercent(company._rankingScore)}
                        </div>
                        <div className="text-xs text-white/80 font-medium mt-1">
                          Match Score
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            {/* Name + Badges */}
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-lg font-semibold text-foreground truncate">
                                {company.company_name_th ||
                                  company.company_name}
                              </h3>
                              {company.is_verified === 1 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-emerald-100 text-emerald-700 shrink-0"
                                >
                                  <CheckCircle2 className="w-3 h-3 mr-1" />{" "}
                                  Verified
                                </Badge>
                              )}
                              {catalog && (
                                <CatalogTypeBadge type={catalog.type} />
                              )}
                              <BusinessSizeBadge
                                capital={company.register_capital}
                              />
                              {company.tsic && (
                                <span className="flex items-center gap-1 border border-blue-400 text-blue-700 bg-blue-100 text-xs px-1.5 py-0.5 rounded-xl shrink-0">
                                  <Hash className="w-3 h-3" /> TSIC:{" "}
                                  {company.tsic}
                                </span>
                              )}
                              {company.new_s_curve && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs font-medium ${S_CURVE_CONFIG[company.new_s_curve].color}`}
                                >
                                  {S_CURVE_CONFIG[company.new_s_curve].label}
                                </Badge>
                              )}
                            </div>

                            {/* English name */}
                            {company.company_name && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {company.company_name}
                              </p>
                            )}

                            {/* Meta row */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap mb-3">
                              {company.city && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {company.city}
                                  {company.district
                                    ? ` · ${company.district}`
                                    : ""}
                                </span>
                              )}
                              {company.register_date && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" /> จดทะเบียน{" "}
                                  {company.register_date}
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
                                  {company.website
                                    .replace(/^https?:\/\//, "")
                                    .replace(/\/$/, "")}
                                </a>
                              )}
                            </div>

                            {/* Description */}
                            {(company.additional_info || company.objective) && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {company.additional_info || company.objective}
                              </p>
                            )}

                            {/* Catalog Callout */}
                            {catalog && (
                              <div
                                className={`rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm border
                                ${catalog.type === "product" ? "bg-cyan-50 border-cyan-200 text-cyan-800" : ""}
                                ${catalog.type === "service" ? "bg-amber-50 border-amber-200 text-amber-800" : ""}
                                ${catalog.type === "both" ? "bg-violet-50 border-violet-200 text-violet-800" : ""}
                              `}
                              >
                                {catalog.type === "product" && (
                                  <>
                                    <Package className="w-4 h-4 shrink-0" />
                                    <span>
                                      มีสินค้าพร้อมขาย — ซื้อได้ทันที ราคาชัดเจน
                                      ไม่ต้องรอพัฒนา
                                    </span>
                                  </>
                                )}
                                {catalog.type === "service" && (
                                  <>
                                    <Wrench className="w-4 h-4 shrink-0" />
                                    <span>
                                      รับจ้างพัฒนา Custom — ปรับแต่งได้ตามโจทย์
                                      ต้องผ่านกระบวนการ Discovery
                                    </span>
                                  </>
                                )}
                                {catalog.type === "both" && (
                                  <>
                                    <LayoutGrid className="w-4 h-4 shrink-0" />
                                    <span>
                                      มีทั้ง Product พร้อมขาย และ Service
                                      รับพัฒนา Custom
                                    </span>
                                  </>
                                )}
                              </div>
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
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-8 pb-4">
                <div className="text-sm text-muted-foreground">
                  หน้า{" "}
                  <span className="font-medium text-foreground">
                    {currentPage + 1}
                  </span>{" "}
                  จาก{" "}
                  <span className="font-medium text-foreground">
                    {totalPages}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(0)}
                    disabled={currentPage === 0}
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm font-medium px-4">
                    {currentPage + 1}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(totalPages - 1)}
                    disabled={currentPage === totalPages - 1}
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
      <Dialog
        open={!!selectedCompany}
        onOpenChange={() => setSelectedCompany(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCompany &&
            (() => {
              const catalog = catalogMap.get(selectedCompany.id);
              return (
                <>
                  <DialogHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${scoreGradient(selectedCompany._rankingScore)} flex items-center justify-center text-white text-xl font-bold tabular-nums shrink-0`}
                      >
                        {scorePercent(selectedCompany._rankingScore)}
                      </div>
                      <div className="min-w-0">
                        <DialogTitle className="text-xl flex items-center gap-2 flex-wrap">
                          {selectedCompany.company_name_th ||
                            selectedCompany.company_name}
                          {selectedCompany.is_verified === 1 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-emerald-100 text-emerald-700"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                            </Badge>
                          )}
                          {catalog && <CatalogTypeBadge type={catalog.type} />}
                          <BusinessSizeBadge
                            capital={selectedCompany.register_capital}
                          />
                        </DialogTitle>
                        {selectedCompany.company_name &&
                          selectedCompany.company_name_th && (
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {selectedCompany.company_name}
                            </p>
                          )}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                          {selectedCompany.city && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{" "}
                              {selectedCompany.city}
                            </span>
                          )}
                          {selectedCompany.register_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />{" "}
                              {selectedCompany.register_date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-5 mt-4">
                    <div className="flex gap-2">
                      {/* TSIC Badge */}
                      {selectedCompany.tsic && (
                        <Badge className="text-sm bg-blue-100 text-blue-700 border-blue-200 gap-1">
                          <Hash className="w-3 h-3" />
                          TSIC: {selectedCompany.tsic}
                        </Badge>
                      )}
                      {selectedCompany.new_s_curve && (
                        <Badge
                          variant="outline"
                          className={`text-sm font-medium ${S_CURVE_CONFIG[selectedCompany.new_s_curve].color}`}
                        >
                          {S_CURVE_CONFIG[selectedCompany.new_s_curve].label}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1">
                          ทุนจดทะเบียน
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatCapital(selectedCompany.register_capital)}
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1">
                          ที่อยู่
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {[
                            selectedCompany.subdistrict,
                            selectedCompany.district,
                            selectedCompany.city,
                          ]
                            .filter(Boolean)
                            .join(", ") || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Catalog Section */}
                    {catalog && (
                      <div
                        className={`rounded-xl p-4 border
                      ${catalog.type === "product" ? "bg-cyan-50 border-cyan-200" : ""}
                      ${catalog.type === "service" ? "bg-amber-50 border-amber-200" : ""}
                      ${catalog.type === "both" ? "bg-violet-50 border-violet-200" : ""}
                    `}
                      >
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          {catalog.type === "product" && (
                            <>
                              <Package className="w-4 h-4 text-cyan-600" />
                              <span className="text-cyan-800">
                                สินค้าพร้อมขาย (Product)
                              </span>
                            </>
                          )}
                          {catalog.type === "service" && (
                            <>
                              <Wrench className="w-4 h-4 text-amber-600" />
                              <span className="text-amber-800">
                                รับจ้างพัฒนา (Service)
                              </span>
                            </>
                          )}
                          {catalog.type === "both" && (
                            <>
                              <LayoutGrid className="w-4 h-4 text-violet-600" />
                              <span className="text-violet-800">
                                Product + Service
                              </span>
                            </>
                          )}
                        </h4>

                        {catalog.products.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                              <Package className="w-3 h-3" /> สินค้าพร้อมขาย
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {catalog.products.map((p) => (
                                <Badge
                                  key={p.id}
                                  className="text-xs bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200"
                                >
                                  {p.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {catalog.services.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                              <Wrench className="w-3 h-3" /> บริการรับพัฒนา
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {catalog.services.map((s) => (
                                <Badge
                                  key={s.id}
                                  className="text-xs bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
                                >
                                  {s.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    {(selectedCompany.additional_info ||
                      selectedCompany.objective) && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          เกี่ยวกับบริษัท
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {selectedCompany.additional_info ||
                            selectedCompany.objective}
                        </p>
                      </div>
                    )}

                    {/* Address */}
                    {selectedCompany.location && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          ที่อยู่สำนักงาน
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedCompany.location}
                          {selectedCompany.zip ? ` ${selectedCompany.zip}` : ""}
                        </p>
                      </div>
                    )}

                    {/* Contact */}
                    {(selectedCompany.website ||
                      selectedCompany.phone_number ||
                      selectedCompany.office_number) && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          ข้อมูลติดต่อ
                        </h4>
                        <div className="space-y-2">
                          {(selectedCompany.phone_number ||
                            selectedCompany.office_number) && (
                            <a
                              href={`tel:${selectedCompany.phone_number || selectedCompany.office_number}`}
                              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                              {selectedCompany.phone_number ||
                                selectedCompany.office_number}
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
                      {selectedCompany.phone_number ||
                      selectedCompany.office_number ? (
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
                        <Button
                          className="flex-1 bg-primary hover:bg-primary/90"
                          disabled
                        >
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
              );
            })()}
        </DialogContent>
      </Dialog>
    </main>
  );
}

// --- Root component wraps with InstantSearch ---
export default function MatchingPage() {
  return (
    <InstantSearch
      indexName="bdi_acc_company_with_tsic"
      searchClient={searchClient}
    >
      <SearchContent />
    </InstantSearch>
  );
}
