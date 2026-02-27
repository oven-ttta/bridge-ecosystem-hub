"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "lucide-react";

// --- Type ---
type MatchResult = {
  id: number;
  company: string;
  matchScore: number;
  type: string;
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
};

// Mock data base removed, relying on meilisearch backend now

export default function MatchingPage() {
  const [searchTech, setSearchTech] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<MatchResult | null>(
    null,
  );
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const ITEMS_PER_PAGE = 10;

  // Initial load and search function
  const performSearch = async (pageToFetch = 1) => {
    setIsSearching(true);
    try {
      const queryParams = new URLSearchParams({
        q: searchTech,
        region: selectedRegion,
        page: pageToFetch.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });

      const res = await fetch(
        `/api/companies/search?${queryParams.toString()}`,
      );
      if (!res.ok) throw new Error("Network latency or failed fetch");

      const rawData = await res.json();

      let data;
      if (rawData._data) {
        // Decode base64 to utf-8 text safely
        const binaryString = atob(rawData._data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decodedText = new TextDecoder().decode(bytes);
        data = JSON.parse(decodedText);
      } else {
        data = rawData; // Fallback for safety
      }

      setMatchResults(data.hits as MatchResult[]);
      setTotalHits(data.totalHits);
      setTotalPages(data.totalPages);
      setCurrentPage(pageToFetch);
      setShowResults(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Perform search whenever criteria change (with debounce for text input)
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(1);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTech, selectedRegion, selectedBudget]);

  return (
    <main className="pt-20">
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

      {/* Matching Criteria */}
      <section className="py-8 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
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
              <label className="text-sm font-medium text-foreground mb-2 block">
                พื้นที่
              </label>
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
                  <SelectItem value="northeast">
                    ภาคตะวันออกเฉียงเหนือ
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                งบประมาณ
              </label>
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
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Match Results */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    ผู้ให้บริการที่แนะนำ
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    จับคู่จาก User Journey และ Profile ข้อมูลของคุณ
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700"
                >
                  พบ {totalHits} รายที่เหมาะสม
                </Badge>
              </div>

              {matchResults.map((result) => (
                <Card
                  key={result.id}
                  className="border-border/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Score */}
                      <div className="lg:w-32 bg-gradient-to-br from-primary to-primary/80 p-6 flex flex-col items-center justify-center text-white">
                        <div className="text-4xl font-bold">
                          {result.matchScore}
                        </div>
                        <div className="text-xs text-white/80 font-medium">
                          Match Score
                        </div>
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
                          </div>
                          <Button
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => setSelectedCompany(result)}
                          >
                            ดูรายละเอียด
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.expertise.map((exp) => (
                            <Badge
                              key={exp}
                              variant="outline"
                              className="text-xs"
                            >
                              {exp}
                            </Badge>
                          ))}
                        </div>

                        <div className="bg-muted/50 rounded-xl p-4">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            เหตุผลในการจับคู่
                          </h4>
                          <ul className="space-y-1">
                            {result.matchReasons.map((reason, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-foreground"
                              >
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-8 pb-4">
                  <div className="text-sm text-muted-foreground">
                    แสดงหน้า{" "}
                    <span className="font-medium text-foreground">
                      {currentPage}
                    </span>{" "}
                    จากทั้งหมด{" "}
                    <span className="font-medium text-foreground">
                      {totalPages}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => performSearch(1)}
                      disabled={currentPage === 1 || isSearching}
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        performSearch(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1 || isSearching}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="text-sm font-medium px-4">
                      {currentPage}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        performSearch(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages || isSearching}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
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
        </div>
      </section>

      {/* Company Detail Dialog */}
      <Dialog
        open={!!selectedCompany}
        onOpenChange={() => setSelectedCompany(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCompany && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedCompany.matchScore}
                  </div>
                  <div>
                    <DialogTitle className="text-xl flex items-center gap-2">
                      {selectedCompany.company}
                      {selectedCompany.verified && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-emerald-100 text-emerald-700"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </DialogTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> {selectedCompany.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{" "}
                        {selectedCompany.location}
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
                      <span className="text-lg font-bold">
                        {selectedCompany.avgRating}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">คะแนนเฉลี่ย</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-lg font-bold">
                        {selectedCompany.projectsCompleted}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      โครงการสำเร็จ
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1">
                      <Target className="w-4 h-4" />
                      <span className="text-lg font-bold">
                        {selectedCompany.matchScore}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                  </div>
                </div>

                {/* Description */}
                {selectedCompany.description && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      เกี่ยวกับบริษัท
                    </h4>
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
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    ความเชี่ยวชาญ
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.expertise.map((exp) => (
                      <Badge key={exp} variant="outline" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Services */}
                {selectedCompany.services && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      บริการที่ให้
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.services.map((service) => (
                        <Badge
                          key={service}
                          className="text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Match Reasons */}
                <div className="bg-emerald-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                    เหตุผลในการจับคู่
                  </h4>
                  <ul className="space-y-2">
                    {selectedCompany.matchReasons.map((reason, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-emerald-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                {selectedCompany.contact && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      ข้อมูลติดต่อ
                    </h4>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${selectedCompany.contact.email}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {selectedCompany.contact.email}
                      </a>
                      <a
                        href={`tel:${selectedCompany.contact.phone}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {selectedCompany.contact.phone}
                      </a>
                      <a
                        href={`https://${selectedCompany.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
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
