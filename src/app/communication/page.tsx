"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Send,
  FileText,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  Eye,
  Copy,
  ArrowRight,
  Inbox,
  TrendingUp,
  Calendar,
  Filter,
  Megaphone,
} from "lucide-react";

const campaigns = [
  {
    id: 1,
    name: "ประชาสัมพันธ์ทุน AI Innovation 2568",
    status: "sent",
    recipients: 342,
    openRate: 68,
    clickRate: 24,
    sentDate: "2 ก.พ. 2568",
    type: "grant",
  },
  {
    id: 2,
    name: "เชิญเข้าร่วม Big Data Conference 2025",
    status: "sent",
    recipients: 498,
    openRate: 72,
    clickRate: 35,
    sentDate: "28 ม.ค. 2568",
    type: "event",
  },
  {
    id: 3,
    name: "Newsletter ประจำเดือน มกราคม 2568",
    status: "sent",
    recipients: 512,
    openRate: 55,
    clickRate: 18,
    sentDate: "25 ม.ค. 2568",
    type: "newsletter",
  },
  {
    id: 4,
    name: "แจ้งผลการจับคู่ธุรกิจรอบ Q4/2567",
    status: "draft",
    recipients: 0,
    openRate: 0,
    clickRate: 0,
    sentDate: "-",
    type: "matching",
  },
  {
    id: 5,
    name: "ประชาสัมพันธ์ Workshop Data Governance",
    status: "scheduled",
    recipients: 280,
    openRate: 0,
    clickRate: 0,
    sentDate: "10 ก.พ. 2568",
    type: "event",
  },
];

const templates = [
  {
    id: 1,
    name: "ประชาสัมพันธ์ทุนสนับสนุน",
    category: "grant",
    lastUsed: "2 ก.พ. 2568",
  },
  {
    id: 2,
    name: "เชิญเข้าร่วมกิจกรรม",
    category: "event",
    lastUsed: "28 ม.ค. 2568",
  },
  {
    id: 3,
    name: "Newsletter ประจำเดือน",
    category: "newsletter",
    lastUsed: "25 ม.ค. 2568",
  },
  {
    id: 4,
    name: "แจ้งผลการจับคู่ธุรกิจ",
    category: "matching",
    lastUsed: "15 ม.ค. 2568",
  },
  {
    id: 5,
    name: "ต้อนรับสมาชิกใหม่",
    category: "welcome",
    lastUsed: "20 ม.ค. 2568",
  },
];

const audienceSegments = [
  {
    name: "ผู้ประกอบการทั้งหมด",
    count: 512,
    description: "สมาชิกทั้งหมดในเครือข่าย",
  },
  {
    name: "ผู้เชี่ยวชาญ AI/ML",
    count: 186,
    description: "ผู้ประกอบการที่มีความเชี่ยวชาญด้าน AI",
  },
  {
    name: "Big Data Analytics",
    count: 204,
    description: "ผู้ประกอบการด้านวิเคราะห์ข้อมูล",
  },
  {
    name: "Startup",
    count: 145,
    description: "วิสาหกิจเริ่มต้นในเครือข่าย",
  },
  {
    name: "ผู้รับทุนปัจจุบัน",
    count: 78,
    description: "ผู้ที่กำลังรับทุนสนับสนุนอยู่",
  },
];

const statusLabels: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  sent: { label: "ส่งแล้ว", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  draft: { label: "แบบร่าง", color: "bg-gray-100 text-gray-700", icon: FileText },
  scheduled: { label: "กำหนดส่ง", color: "bg-blue-100 text-blue-700", icon: Clock },
};

const typeLabels: Record<string, string> = {
  grant: "ทุนสนับสนุน",
  event: "กิจกรรม",
  newsletter: "Newsletter",
  matching: "จับคู่ธุรกิจ",
  welcome: "ต้อนรับ",
};

export default function CommunicationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCampaigns = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalSent = campaigns.filter((c) => c.status === "sent").reduce((a, c) => a + c.recipients, 0);
  const avgOpenRate = Math.round(
    campaigns.filter((c) => c.status === "sent").reduce((a, c) => a + c.openRate, 0) /
      campaigns.filter((c) => c.status === "sent").length
  );

  return (
    <main className="min-h-[calc(100vh-80px)] py-12 px-4 pt-28">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <Badge className="mb-3 bg-cyan-100 text-cyan-700 hover:bg-cyan-100">
              <Megaphone className="w-3.5 h-3.5 mr-1.5" />
              Communication Hub
            </Badge>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              ระบบสื่อสารและประชาสัมพันธ์
            </h1>
            <p className="text-muted-foreground">
              จัดการแคมเปญ Email Marketing และสื่อสารไปยังเครือข่ายพันธมิตร
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            สร้างแคมเปญใหม่
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-muted-foreground">ส่งแล้วทั้งหมด</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{totalSent.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-muted-foreground">อัตราเปิดอ่าน</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{avgOpenRate}%</div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-muted-foreground">อัตราคลิก (เฉลี่ย)</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(
                campaigns.filter((c) => c.status === "sent").reduce((a, c) => a + c.clickRate, 0) /
                  campaigns.filter((c) => c.status === "sent").length
              )}
              %
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-muted-foreground">สมาชิกเครือข่าย</span>
            </div>
            <div className="text-2xl font-bold text-foreground">512</div>
          </div>
        </div>

        <Tabs defaultValue="campaigns">
          <TabsList className="mb-6">
            <TabsTrigger value="campaigns" className="gap-2">
              <Mail className="w-4 h-4" />
              แคมเปญ
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <FileText className="w-4 h-4" />
              เทมเพลต
            </TabsTrigger>
            <TabsTrigger value="audience" className="gap-2">
              <Users className="w-4 h-4" />
              กลุ่มเป้าหมาย
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              สถิติ
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาแคมเปญ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] h-11">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="sent">ส่งแล้ว</SelectItem>
                  <SelectItem value="draft">แบบร่าง</SelectItem>
                  <SelectItem value="scheduled">กำหนดส่ง</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {filteredCampaigns.map((campaign) => {
                const statusInfo = statusLabels[campaign.status];
                return (
                  <div
                    key={campaign.id}
                    className="bg-card rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={statusInfo.color}>
                            <statusInfo.icon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[campaign.type]}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {campaign.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {campaign.sentDate}
                          </span>
                          {campaign.recipients > 0 && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {campaign.recipients} ผู้รับ
                            </span>
                          )}
                        </div>
                      </div>

                      {campaign.status === "sent" && (
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {campaign.openRate}%
                            </div>
                            <div className="text-xs text-muted-foreground">เปิดอ่าน</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {campaign.clickRate}%
                            </div>
                            <div className="text-xs text-muted-foreground">คลิก</div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            ดูรายงาน
                          </Button>
                        </div>
                      )}

                      {campaign.status === "draft" && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            แก้ไข
                          </Button>
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            ส่ง
                          </Button>
                        </div>
                      )}

                      {campaign.status === "scheduled" && (
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            กำหนดส่ง {campaign.sentDate}
                          </div>
                          <Button variant="outline" size="sm">
                            แก้ไข
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-card rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-32 bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <Badge variant="outline" className="mb-2 text-xs">
                    {typeLabels[template.category] || template.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    ใช้ล่าสุด: {template.lastUsed}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Copy className="w-3.5 h-3.5" />
                      ใช้เทมเพลต
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="bg-muted/30 rounded-xl p-5 border-2 border-dashed border-border flex flex-col items-center justify-center text-center min-h-[250px] hover:border-primary/30 transition-colors cursor-pointer">
                <Plus className="w-8 h-8 text-muted-foreground mb-3" />
                <p className="font-medium text-foreground mb-1">สร้างเทมเพลตใหม่</p>
                <p className="text-xs text-muted-foreground">
                  ออกแบบเทมเพลตอีเมลตามต้องการ
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience">
            <div className="space-y-4">
              {audienceSegments.map((segment) => (
                <div
                  key={segment.name}
                  className="bg-card rounded-xl p-5 border border-border/50 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{segment.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {segment.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">
                        {segment.count}
                      </div>
                      <div className="text-xs text-muted-foreground">สมาชิก</div>
                    </div>
                    <Button variant="outline" size="sm">
                      ส่งอีเมล
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="bg-card rounded-xl p-8 border border-border/50 text-center">
              <BarChart3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                สถิติแคมเปญ
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                ดูรายงานสรุปผลการส่งอีเมล อัตราเปิดอ่าน อัตราคลิก
                และพฤติกรรมผู้รับอย่างละเอียด
              </p>
              <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">{totalSent.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">อีเมลที่ส่ง</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">{avgOpenRate}%</div>
                  <div className="text-xs text-muted-foreground">เปิดอ่านเฉลี่ย</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      campaigns.filter((c) => c.status === "sent").reduce((a, c) => a + c.clickRate, 0) /
                        campaigns.filter((c) => c.status === "sent").length
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">คลิกเฉลี่ย</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
