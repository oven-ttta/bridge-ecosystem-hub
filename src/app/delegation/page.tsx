"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  Users,
  KeyRound,
  UserPlus,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  FileText,
  PenTool,
  Eye,
  Activity,
  UserCheck,
  Building2,
  CreditCard,
  ScrollText,
  ArrowRight,
  Search,
  MoreHorizontal,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";

// --- Mock Data ---
const subAccounts = [
  {
    id: 1,
    name: "สมชาย วิทยา",
    email: "somchai@company.co.th",
    role: "ผู้จัดการโครงการ",
    status: "active",
    lastActive: "5 นาทีที่แล้ว",
    idVerified: true,
    scopes: ["ยื่นข้อเสนอ", "ดูรายงาน"],
  },
  {
    id: 2,
    name: "สุนิสา แสงทอง",
    email: "sunisa@company.co.th",
    role: "เจ้าหน้าที่การเงิน",
    status: "active",
    lastActive: "2 ชั่วโมงที่แล้ว",
    idVerified: true,
    scopes: ["เบิกจ่าย", "ดูรายงาน", "ลงนามสัญญา"],
  },
  {
    id: 3,
    name: "วรพจน์ สมบูรณ์",
    email: "worapoj@company.co.th",
    role: "ที่ปรึกษา",
    status: "pending",
    lastActive: "ยังไม่เคยเข้าใช้งาน",
    idVerified: false,
    scopes: ["ดูรายงาน"],
  },
];

const delegations = [
  {
    id: 1,
    delegator: "บริษัท ดาต้าเฟิร์สท์ จำกัด",
    delegatee: "สมชาย วิทยา",
    delegateeId: "1-3456-78901-23-4",
    scopes: ["ยื่นข้อเสนอโครงการ", "ดูข้อมูลโครงการ", "แก้ไขข้อมูลบริษัท"],
    status: "approved",
    approvedBy: "ฝ่ายกฎหมาย",
    approvedDate: "10 ม.ค. 2568",
    expiryDate: "10 ม.ค. 2569",
    thaidVerified: true,
  },
  {
    id: 2,
    delegator: "บริษัท ดาต้าเฟิร์สท์ จำกัด",
    delegatee: "สุนิสา แสงทอง",
    delegateeId: "1-2345-67890-12-3",
    scopes: ["ลงนามสัญญาอิเล็กทรอนิกส์", "ยื่นคำขอเบิกจ่าย", "ดูรายงานการเงิน"],
    status: "approved",
    approvedBy: "ฝ่ายกฎหมาย",
    approvedDate: "15 ธ.ค. 2567",
    expiryDate: "15 ธ.ค. 2568",
    thaidVerified: true,
  },
  {
    id: 3,
    delegator: "บริษัท ดาต้าเฟิร์สท์ จำกัด",
    delegatee: "วรพจน์ สมบูรณ์",
    delegateeId: "3-4567-89012-34-5",
    scopes: ["ดูข้อมูลโครงการ"],
    status: "pending_legal",
    approvedBy: null,
    approvedDate: null,
    expiryDate: null,
    thaidVerified: false,
  },
];

const activityLogs = [
  { id: 1, timestamp: "2568-01-28 14:32:00", user: "สมชาย วิทยา", action: "ยื่นข้อเสนอโครงการ", detail: "โครงการพัฒนา AI Chatbot (PRJ-2568-045)", ip: "203.xxx.xxx.12", status: "success" },
  { id: 2, timestamp: "2568-01-28 10:15:00", user: "สุนิสา แสงทอง", action: "ลงนามสัญญาอิเล็กทรอนิกส์", detail: "สัญญาเลขที่ CTR-2568-012", ip: "203.xxx.xxx.15", status: "success" },
  { id: 3, timestamp: "2568-01-27 16:45:00", user: "สมชาย วิทยา", action: "พยายามเข้าถึงหน้าการเงิน", detail: "ไม่มีสิทธิ์เข้าถึง - ถูกบล็อก", ip: "203.xxx.xxx.12", status: "blocked" },
  { id: 4, timestamp: "2568-01-27 09:00:00", user: "ระบบ", action: "ตรวจสอบ THAID", detail: "ยืนยันตัวตน วรพจน์ สมบูรณ์ - รอผลจากกรมการปกครอง", ip: "-", status: "pending" },
  { id: 5, timestamp: "2568-01-26 11:20:00", user: "ฝ่ายกฎหมาย (Admin)", action: "อนุมัติการมอบสิทธิ์", detail: "อนุมัติ สุนิสา แสงทอง - สิทธิ์ลงนามสัญญา", ip: "10.xxx.xxx.5", status: "success" },
];

const legalPendingApprovals = [
  {
    id: 1,
    company: "บริษัท ดาต้าเฟิร์สท์ จำกัด",
    delegatee: "วรพจน์ สมบูรณ์",
    requestedScopes: ["ดูข้อมูลโครงการ"],
    requestDate: "25 ม.ค. 2568",
    documents: ["หนังสือมอบอำนาจ.pdf", "สำเนาบัตรประชาชน.pdf"],
    thaidStatus: "pending",
    riskLevel: "low",
  },
  {
    id: 2,
    company: "บริษัท คลาวด์ เอไอ จำกัด",
    delegatee: "นริศ พงษ์ปัญญา",
    requestedScopes: ["ลงนามสัญญาอิเล็กทรอนิกส์", "ยื่นคำขอเบิกจ่าย"],
    requestDate: "27 ม.ค. 2568",
    documents: ["หนังสือมอบอำนาจ.pdf", "สำเนาบัตรประชาชน.pdf", "หนังสือรับรองบริษัท.pdf"],
    thaidStatus: "verified",
    riskLevel: "high",
  },
];

const scopeOptions = [
  { id: "proposal", label: "ยื่นข้อเสนอโครงการ", icon: FileText, description: "สร้างและยื่นข้อเสนอโครงการเพื่อขอทุน" },
  { id: "sign", label: "ลงนามสัญญาอิเล็กทรอนิกส์", icon: PenTool, description: "ลงนามสัญญาแทนนิติบุคคล (ต้องยืนยัน THAID)" },
  { id: "disburse", label: "ยื่นคำขอเบิกจ่าย", icon: CreditCard, description: "ยื่นคำขอเบิกเงินสนับสนุนโครงการ" },
  { id: "view", label: "ดูข้อมูลโครงการ", icon: Eye, description: "เข้าถึงข้อมูลโครงการและรายงานแบบอ่านอย่างเดียว" },
  { id: "edit", label: "แก้ไขข้อมูลบริษัท", icon: Building2, description: "แก้ไขข้อมูลโปรไฟล์และข้อมูลนิติบุคคล" },
  { id: "finance", label: "ดูรายงานการเงิน", icon: ScrollText, description: "เข้าถึงรายงานการเงินและข้อมูลการเบิกจ่าย" },
];

export default function DelegationPage() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);

  const toggleScope = (scopeId: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId)
        ? prev.filter((s) => s !== scopeId)
        : [...prev, scopeId]
    );
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-700">
              <Shield className="w-3 h-3 mr-1" />
              Delegation Management System
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              ระบบบริหารจัดการสิทธิ์และการมอบอำนาจ
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              จัดการบัญชีผู้ใช้งานย่อย (Sub-account) และมอบสิทธิ์ดำเนินการแทนนิติบุคคล
            </p>
            <p className="text-muted-foreground">
              พร้อมระบบยืนยันตัวตน THAID และการอนุมัติจากฝ่ายกฎหมาย
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="sub-accounts" className="space-y-8">
            <TabsList className="bg-muted/50 p-1 flex-wrap">
              <TabsTrigger value="sub-accounts">
                <Users className="w-4 h-4 mr-2" />
                บัญชีผู้ใช้ย่อย
              </TabsTrigger>
              <TabsTrigger value="delegations">
                <KeyRound className="w-4 h-4 mr-2" />
                การมอบสิทธิ์
              </TabsTrigger>
              <TabsTrigger value="create">
                <UserPlus className="w-4 h-4 mr-2" />
                สร้างการมอบสิทธิ์
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Activity className="w-4 h-4 mr-2" />
                Activity Log
              </TabsTrigger>
              <TabsTrigger value="legal">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Legal Admin
              </TabsTrigger>
            </TabsList>

            {/* Sub-Accounts */}
            <TabsContent value="sub-accounts" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">บัญชีผู้ใช้งานย่อย</h2>
                  <p className="text-sm text-muted-foreground">จัดการบัญชีผู้ใช้งานที่ได้รับมอบสิทธิ์ในนามนิติบุคคล</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  เพิ่มบัญชีผู้ใช้
                </Button>
              </div>

              <div className="grid gap-4">
                {subAccounts.map((account) => (
                  <Card key={account.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{account.name}</h3>
                              {account.idVerified ? (
                                <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                  <Fingerprint className="w-3 h-3 mr-1" /> THAID ยืนยันแล้ว
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                                  <Clock className="w-3 h-3 mr-1" /> รอยืนยัน THAID
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{account.email} &bull; {account.role}</p>
                            <p className="text-xs text-muted-foreground mt-1">เข้าใช้งานล่าสุด: {account.lastActive}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                            {account.scopes.map((scope) => (
                              <Badge key={scope} variant="outline" className="text-xs">{scope}</Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Delegations */}
            <TabsContent value="delegations" className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">รายการมอบสิทธิ์ทั้งหมด</h2>
              <div className="grid gap-4">
                {delegations.map((d) => (
                  <Card key={d.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{d.delegatee}</h3>
                            <Badge className={
                              d.status === "approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }>
                              {d.status === "approved" ? (
                                <><CheckCircle className="w-3 h-3 mr-1" /> อนุมัติแล้ว</>
                              ) : (
                                <><Clock className="w-3 h-3 mr-1" /> รอฝ่ายกฎหมายอนุมัติ</>
                              )}
                            </Badge>
                            {d.thaidVerified && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                <Fingerprint className="w-3 h-3 mr-1" /> THAID
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            มอบอำนาจโดย: {d.delegator}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {d.scopes.map((scope) => (
                              <Badge key={scope} variant="outline" className="text-xs">{scope}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {d.approvedDate && <p>อนุมัติ: {d.approvedDate}</p>}
                          {d.expiryDate && <p>หมดอายุ: {d.expiryDate}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Create Delegation */}
            <TabsContent value="create" className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">สร้างการมอบสิทธิ์ใหม่</h2>
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  {/* Delegatee Info */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">ข้อมูลผู้รับมอบอำนาจ</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">ชื่อ-นามสกุล</label>
                        <Input placeholder="กรอกชื่อ-นามสกุล" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">อีเมล</label>
                        <Input placeholder="email@company.co.th" type="email" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">เลขบัตรประชาชน (สำหรับตรวจสอบ THAID)</label>
                        <Input placeholder="X-XXXX-XXXXX-XX-X" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">ตำแหน่ง/บทบาท</label>
                        <Input placeholder="เช่น ผู้จัดการโครงการ" />
                      </div>
                    </div>
                  </div>

                  {/* Scope Selection */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">ขอบเขตการมอบอำนาจ (Scope of Authorization)</h3>
                    <p className="text-sm text-muted-foreground mb-4">เลือกสิทธิ์ที่ต้องการมอบให้ผู้รับมอบอำนาจ</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {scopeOptions.map((scope) => (
                        <div
                          key={scope.id}
                          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedScopes.includes(scope.id)
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/30"
                          }`}
                          onClick={() => toggleScope(scope.id)}
                        >
                          <Checkbox
                            checked={selectedScopes.includes(scope.id)}
                            onCheckedChange={() => toggleScope(scope.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <scope.icon className="w-4 h-4 text-primary" />
                              <span className="font-medium text-foreground text-sm">{scope.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{scope.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Identity Verification Note */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Fingerprint className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 text-sm">การยืนยันตัวตน (Identity Verification)</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          เลขบัตรประชาชนจะถูกตรวจสอบกับฐานข้อมูลกรมการปกครอง (THAID)
                          ก่อนที่สิทธิ์จะถูกเปิดใช้งาน โดยเฉพาะสิทธิ์ลงนามสัญญาอิเล็กทรอนิกส์
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Legal Note */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900 text-sm">การอนุมัติจากฝ่ายกฎหมาย</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          การมอบสิทธิ์จะต้องผ่านการตรวจสอบเอกสารและอนุมัติจากเจ้าหน้าที่ฝ่ายกฎหมาย (Legal Admin) ก่อนสิทธิ์จะถูกเปิดใช้งาน
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90">
                      ส่งคำขอมอบสิทธิ์
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline">ยกเลิก</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Log */}
            <TabsContent value="activity" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Activity Log</h2>
                  <p className="text-sm text-muted-foreground">บันทึกกิจกรรมของผู้ใช้งานทั้งหมดในระบบ</p>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="ค้นหากิจกรรม..." className="pl-9 h-10" />
                </div>
              </div>

              <Card className="border-border/50">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>เวลา</TableHead>
                        <TableHead>ผู้ใช้งาน</TableHead>
                        <TableHead>กิจกรรม</TableHead>
                        <TableHead>รายละเอียด</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>สถานะ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                          <TableCell className="font-medium text-sm">{log.user}</TableCell>
                          <TableCell className="text-sm">{log.action}</TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[250px] truncate">{log.detail}</TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">{log.ip}</TableCell>
                          <TableCell>
                            <Badge className={
                              log.status === "success" ? "bg-emerald-100 text-emerald-700" :
                              log.status === "blocked" ? "bg-red-100 text-red-700" :
                              "bg-amber-100 text-amber-700"
                            }>
                              {log.status === "success" ? "สำเร็จ" : log.status === "blocked" ? "ถูกบล็อก" : "รอดำเนินการ"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legal Admin */}
            <TabsContent value="legal" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Legal Admin - ตรวจสอบและอนุมัติ</h2>
                <p className="text-sm text-muted-foreground">ตรวจสอบเอกสารและอนุมัติการมอบสิทธิ์ (Delegation Approval)</p>
              </div>

              {legalPendingApprovals.map((item) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{item.delegatee}</h3>
                          <Badge className={
                            item.riskLevel === "high"
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-700"
                          }>
                            {item.riskLevel === "high" ? (
                              <><AlertTriangle className="w-3 h-3 mr-1" /> ความเสี่ยงสูง</>
                            ) : (
                              "ความเสี่ยงต่ำ"
                            )}
                          </Badge>
                          <Badge className={
                            item.thaidStatus === "verified"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                          }>
                            <Fingerprint className="w-3 h-3 mr-1" />
                            {item.thaidStatus === "verified" ? "THAID ยืนยันแล้ว" : "รอยืนยัน THAID"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          จาก: {item.company} &bull; ยื่นเมื่อ: {item.requestDate}
                        </p>
                        <div className="mb-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">สิทธิ์ที่ร้องขอ:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.requestedScopes.map((scope) => (
                              <Badge key={scope} variant="outline" className="text-xs">{scope}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">เอกสารแนบ:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.documents.map((doc) => (
                              <span key={doc} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-foreground">
                                <FileText className="w-3 h-3" /> {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          อนุมัติ
                        </Button>
                        <Button variant="destructive">
                          <XCircle className="w-4 h-4 mr-2" />
                          ปฏิเสธ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
