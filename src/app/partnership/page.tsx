"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Building2,
  ExternalLink,
  Users,
  Briefcase,
} from "lucide-react";

const mockCompanies = [
  {
    id: 1,
    name: "DataFirst Analytics",
    type: "Large Enterprise",
    location: "กรุงเทพมหานคร",
    expertise: ["Data Analytics", "Machine Learning", "Cloud Solutions"],
    services: ["Consulting", "Platform Development", "Training"],
    employees: "50-100",
    verified: true,
  },
  {
    id: 2,
    name: "AI Vision Lab",
    type: "SME",
    location: "เชียงใหม่",
    expertise: ["Computer Vision", "Deep Learning", "IoT"],
    services: ["Product Development", "Research", "Integration"],
    employees: "10-50",
    verified: true,
  },
  {
    id: 3,
    name: "BigData Solutions",
    type: "Startup",
    location: "ชลบุรี",
    expertise: ["Big Data", "Data Engineering", "ETL"],
    services: ["Data Pipeline", "Analytics Platform"],
    employees: "5-10",
    verified: false,
  },
  {
    id: 4,
    name: "Cloud AI Thailand",
    type: "Large Enterprise",
    location: "กรุงเทพมหานคร",
    expertise: ["Cloud Infrastructure", "AI/ML Ops", "DevOps"],
    services: ["Cloud Migration", "MLOps", "Managed Services"],
    employees: "100+",
    verified: true,
  },
  {
    id: 5,
    name: "SmartFactory Tech",
    type: "SME",
    location: "ระยอง",
    expertise: ["Industrial IoT", "Predictive Maintenance", "AI"],
    services: ["Smart Manufacturing", "Consulting"],
    employees: "20-50",
    verified: true,
  },
  {
    id: 6,
    name: "NLP Innovations",
    type: "Startup",
    location: "กรุงเทพมหานคร",
    expertise: ["NLP", "Chatbot", "Text Analytics"],
    services: ["Chatbot Development", "API Services"],
    employees: "5-10",
    verified: false,
  },
];

export default function PartnershipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.expertise.some((e) =>
        e.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesType = !filterType || company.type === filterType;
    const matchesLocation =
      !filterLocation || company.location === filterLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Partnership Directory
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              ค้นหาผู้ประกอบการ
            </h1>
            <p className="text-lg text-muted-foreground">
              เชื่อมต่อกับผู้ประกอบการด้าน Big Data และ AI กว่า 500
              รายในเครือข่าย BRIDGE
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border/50 sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อบริษัท, ความเชี่ยวชาญ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[160px] h-12">
                  <Building2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="ประเภทธุรกิจ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="SME">SME</SelectItem>
                  <SelectItem value="Large Enterprise">
                    Large Enterprise
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-[160px] h-12">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="ที่ตั้ง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="กรุงเทพมหานคร">กรุงเทพมหานคร</SelectItem>
                  <SelectItem value="เชียงใหม่">เชียงใหม่</SelectItem>
                  <SelectItem value="ชลบุรี">ชลบุรี</SelectItem>
                  <SelectItem value="ระยอง">ระยอง</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              พบ{" "}
              <span className="font-semibold text-foreground">
                {filteredCompanies.length}
              </span>{" "}
              ผู้ประกอบการ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="group bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  {company.verified && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-emerald-100 text-emerald-700"
                    >
                      Verified
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {company.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{company.location}</span>
                  <span className="opacity-50">&bull;</span>
                  <span>{company.type}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.expertise.slice(0, 3).map((exp) => (
                    <Badge key={exp} variant="outline" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{company.employees} พนักงาน</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    ดูโปรไฟล์
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
