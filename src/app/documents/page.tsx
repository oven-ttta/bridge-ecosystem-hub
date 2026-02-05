"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Upload,
  Download,
  Search,
  FolderOpen,
  Building2,
  Clock,
  Eye,
  Trash2,
  PenTool,
  FilePlus,
  FileCheck,
  Wallet,
  ScrollText,
  Shield,
  MoreHorizontal,
  Filter,
} from "lucide-react";

// --- Mock Data ---
const categories = [
  {
    id: "grants",
    label: "เอกสารสำหรับการให้ทุน",
    icon: Wallet,
    color: "bg-amber-100 text-amber-700",
    count: 8,
    description: "แบบฟอร์มและตัวอย่างเอกสารสำหรับการยื่นข้อเสนอโครงการ",
  },
  {
    id: "contracts",
    label: "เอกสารสำหรับการจัดการสัญญา",
    icon: PenTool,
    color: "bg-blue-100 text-blue-700",
    count: 5,
    description: "แม่แบบสัญญาอิเล็กทรอนิกส์และเอกสารประกอบสัญญา",
  },
  {
    id: "official",
    label: "หนังสือสำคัญ",
    icon: ScrollText,
    color: "bg-purple-100 text-purple-700",
    count: 6,
    description: "หนังสือมอบอำนาจ หนังสือรับรอง และเอกสารทางราชการ",
  },
  {
    id: "reports",
    label: "แบบรายงานผลโครงการ",
    icon: FileCheck,
    color: "bg-emerald-100 text-emerald-700",
    count: 4,
    description: "แบบฟอร์มรายงานความก้าวหน้าและรายงานปิดโครงการ",
  },
];

const documents = [
  {
    id: 1,
    name: "แบบข้อเสนอโครงการ (Proposal Template) - ทุน AI Innovation",
    category: "grants",
    organization: "ฝ่ายส่งเสริมนวัตกรรม",
    fileType: "DOCX",
    fileSize: "245 KB",
    version: "2.1",
    updatedDate: "15 ม.ค. 2568",
    updatedBy: "Admin",
    downloads: 234,
  },
  {
    id: 2,
    name: "แบบข้อเสนอโครงการ (Proposal Template) - ทุนวิจัย Big Data",
    category: "grants",
    organization: "ฝ่ายวิจัยและพัฒนา",
    fileType: "DOCX",
    fileSize: "312 KB",
    version: "1.5",
    updatedDate: "10 ม.ค. 2568",
    updatedBy: "Admin",
    downloads: 189,
  },
  {
    id: 3,
    name: "แบบฟอร์มงบประมาณโครงการ (Budget Form)",
    category: "grants",
    organization: "ฝ่ายบริหาร",
    fileType: "XLSX",
    fileSize: "89 KB",
    version: "3.0",
    updatedDate: "8 ม.ค. 2568",
    updatedBy: "Admin",
    downloads: 312,
  },
  {
    id: 4,
    name: "แม่แบบสัญญารับทุน (Grant Agreement Template)",
    category: "contracts",
    organization: "ฝ่ายกฎหมาย",
    fileType: "PDF",
    fileSize: "520 KB",
    version: "4.2",
    updatedDate: "5 ม.ค. 2568",
    updatedBy: "Legal Admin",
    downloads: 156,
  },
  {
    id: 5,
    name: "สัญญาจ้างที่ปรึกษา (Consulting Agreement)",
    category: "contracts",
    organization: "ฝ่ายกฎหมาย",
    fileType: "PDF",
    fileSize: "480 KB",
    version: "2.0",
    updatedDate: "3 ม.ค. 2568",
    updatedBy: "Legal Admin",
    downloads: 78,
  },
  {
    id: 6,
    name: "หนังสือมอบอำนาจ (Power of Attorney)",
    category: "official",
    organization: "ฝ่ายกฎหมาย",
    fileType: "PDF",
    fileSize: "156 KB",
    version: "1.3",
    updatedDate: "20 ธ.ค. 2567",
    updatedBy: "Legal Admin",
    downloads: 445,
  },
  {
    id: 7,
    name: "หนังสือรับรองนิติบุคคล (Company Certificate Request)",
    category: "official",
    organization: "ฝ่ายบริหาร",
    fileType: "PDF",
    fileSize: "120 KB",
    version: "1.0",
    updatedDate: "18 ธ.ค. 2567",
    updatedBy: "Admin",
    downloads: 267,
  },
  {
    id: 8,
    name: "แบบรายงานความก้าวหน้าโครงการ (Progress Report)",
    category: "reports",
    organization: "ฝ่ายติดตามโครงการ",
    fileType: "DOCX",
    fileSize: "198 KB",
    version: "2.0",
    updatedDate: "25 ธ.ค. 2567",
    updatedBy: "Admin",
    downloads: 178,
  },
  {
    id: 9,
    name: "แบบรายงานปิดโครงการ (Project Closing Report)",
    category: "reports",
    organization: "ฝ่ายติดตามโครงการ",
    fileType: "DOCX",
    fileSize: "256 KB",
    version: "1.8",
    updatedDate: "22 ธ.ค. 2567",
    updatedBy: "Admin",
    downloads: 92,
  },
];

const fileTypeColors: Record<string, string> = {
  DOCX: "bg-blue-100 text-blue-700",
  XLSX: "bg-emerald-100 text-emerald-700",
  PDF: "bg-red-100 text-red-700",
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterOrg, setFilterOrg] = useState("all");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    const matchesOrg = filterOrg === "all" || doc.organization === filterOrg;
    return matchesSearch && matchesCategory && matchesOrg;
  });

  const organizations = [...new Set(documents.map((d) => d.organization))];

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-sky-50 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-700">
              <FileText className="w-3 h-3 mr-1" />
              Document Template Management
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              ระบบจัดการแม่แบบเอกสาร
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              ดาวน์โหลดแม่แบบเอกสาร แบบฟอร์ม และตัวอย่างข้อเสนอโครงการ แยกตามหน่วยงานและประเภททุน
            </p>
            <p className="text-muted-foreground">
              จัดการโดยผู้ดูแลระบบ (Admin) เพื่อให้ผู้สมัครดาวน์โหลดไปใช้งานได้ถูกต้อง
            </p>
          </div>
        </div>
      </section>

      {/* Category Overview */}
      <section className="py-10 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(filterCategory === cat.id ? "all" : cat.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                  filterCategory === cat.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border/50 hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{cat.count} ไฟล์</Badge>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{cat.label}</h3>
                <p className="text-xs text-muted-foreground">{cat.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Document List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="list" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="list">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  รายการเอกสาร
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <Shield className="w-4 h-4 mr-2" />
                  จัดการ (Admin)
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาเอกสาร..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 w-64"
                  />
                </div>
                <Select value={filterOrg} onValueChange={setFilterOrg}>
                  <SelectTrigger className="w-[200px] h-10">
                    <Building2 className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="หน่วยงาน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    {organizations.map((org) => (
                      <SelectItem key={org} value={org}>{org}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Document List View */}
            <TabsContent value="list" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                พบ <span className="font-semibold text-foreground">{filteredDocuments.length}</span> เอกสาร
              </p>

              <div className="grid gap-3">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="border-border/50 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* File Type Icon */}
                        <div className={`w-12 h-14 rounded-lg ${fileTypeColors[doc.fileType] || "bg-gray-100 text-gray-700"} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                          {doc.fileType}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm mb-1 truncate">{doc.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {doc.organization}</span>
                            <span>&bull;</span>
                            <span>v{doc.version}</span>
                            <span>&bull;</span>
                            <span>{doc.fileSize}</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.updatedDate}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">{doc.downloads} ดาวน์โหลด</span>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" /> ดูตัวอย่าง
                          </Button>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Download className="w-4 h-4 mr-1" /> ดาวน์โหลด
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Admin View */}
            <TabsContent value="admin" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">จัดการแม่แบบเอกสาร</h2>
                  <p className="text-sm text-muted-foreground">อัปโหลด แก้ไข และจัดการไฟล์แม่แบบ</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <FilePlus className="w-4 h-4 mr-2" />
                  อัปโหลดเอกสารใหม่
                </Button>
              </div>

              {/* Upload Zone */}
              <Card className="border-border/50 border-dashed">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">อัปโหลดแม่แบบเอกสาร</h3>
                    <p className="text-sm text-muted-foreground mb-4">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์ (DOCX, XLSX, PDF สูงสุด 10MB)</p>
                    <Button variant="outline">เลือกไฟล์</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Table */}
              <Card className="border-border/50">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ชื่อเอกสาร</TableHead>
                        <TableHead>หมวดหมู่</TableHead>
                        <TableHead>หน่วยงาน</TableHead>
                        <TableHead>เวอร์ชัน</TableHead>
                        <TableHead>อัปเดตล่าสุด</TableHead>
                        <TableHead>ดาวน์โหลด</TableHead>
                        <TableHead className="text-right">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={`${fileTypeColors[doc.fileType]} text-xs`}>{doc.fileType}</Badge>
                              <span className="font-medium text-sm max-w-[300px] truncate">{doc.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {categories.find((c) => c.id === doc.category)?.label || doc.category}
                          </TableCell>
                          <TableCell className="text-sm">{doc.organization}</TableCell>
                          <TableCell className="text-sm">v{doc.version}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{doc.updatedDate}</TableCell>
                          <TableCell className="text-sm">{doc.downloads}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-1 justify-end">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <PenTool className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
