"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  ArrowRight,
  ArrowLeftRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Plug,
  FileText,
  CreditCard,
  Building2,
  Send,
  Download,
  Activity,
  Server,
  Zap,
  BarChart3,
  ScrollText,
  Timer,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// --- Mock Data ---
const apiConnections = [
  {
    id: "esaraban",
    name: "E-Saraban (ระบบสารบรรณอิเล็กทรอนิกส์)",
    description: "เชื่อมต่อสำหรับส่งประกาศผลผู้ได้รับทุน และออกเลขหนังสือราชการอัตโนมัติ",
    status: "connected",
    lastSync: "5 นาทีที่แล้ว",
    apiVersion: "v2.1",
    endpoint: "https://esaraban.bdi.or.th/api/v2",
    uptime: "99.8%",
    requestsToday: 47,
  },
  {
    id: "odoo-erp",
    name: "ERP / Odoo (ระบบบริหารจัดการทรัพยากรองค์กร)",
    description: "เชื่อมต่อ Bi-directional สำหรับ Vendor Profile, ตั้งเบิก (RQ/EX), และสถานะการจ่ายเงิน",
    status: "connected",
    lastSync: "2 นาทีที่แล้ว",
    apiVersion: "v16.0",
    endpoint: "https://odoo.bdi.or.th/api/v16",
    uptime: "99.5%",
    requestsToday: 128,
  },
];

const eSarabanLogs = [
  { id: 1, timestamp: "2568-01-28 14:30:00", action: "ประกาศผลผู้ได้รับทุน", documentNo: "สขญ. 0032/2568", grantTitle: "ทุนพัฒนา AI สำหรับ SMEs", recipients: 12, status: "success" },
  { id: 2, timestamp: "2568-01-28 11:00:00", action: "ออกเลขหนังสือราชการ", documentNo: "สขญ. 0031/2568", grantTitle: "หนังสือแจ้งอนุมัติทุน - PRJ-045", recipients: 1, status: "success" },
  { id: 3, timestamp: "2568-01-27 16:15:00", action: "ประกาศผลผู้ได้รับทุน", documentNo: "สขญ. 0030/2568", grantTitle: "ทุนวิจัย Big Data Analytics", recipients: 8, status: "success" },
  { id: 4, timestamp: "2568-01-27 10:30:00", action: "ออกเลขหนังสือราชการ", documentNo: "-", grantTitle: "หนังสือเชิญร่วมงาน Conference", recipients: 0, status: "failed" },
];

const odooSyncLogs = [
  {
    id: 1,
    timestamp: "2568-01-28 14:28:00",
    direction: "bridge_to_odoo",
    action: "สร้าง Vendor Profile",
    detail: "บริษัท NLP Innovations จำกัด (VEN-2568-089)",
    status: "success",
  },
  {
    id: 2,
    timestamp: "2568-01-28 13:45:00",
    direction: "bridge_to_odoo",
    action: "สร้างรายการตั้งเบิก (RQ)",
    detail: "RQ-2568-156 จำนวน ฿500,000 - โครงการ PRJ-045",
    status: "success",
  },
  {
    id: 3,
    timestamp: "2568-01-28 12:00:00",
    direction: "odoo_to_bridge",
    action: "อัปเดต Payment Status",
    detail: "EX-2568-078 สถานะ: จ่ายแล้ว ฿1,200,000 - โครงการ PRJ-032",
    status: "success",
  },
  {
    id: 4,
    timestamp: "2568-01-28 11:30:00",
    direction: "bridge_to_odoo",
    action: "สร้างรายการเบิกจ่าย (EX)",
    detail: "EX-2568-092 จำนวน ฿800,000 - โครงการ PRJ-041",
    status: "success",
  },
  {
    id: 5,
    timestamp: "2568-01-28 09:00:00",
    direction: "odoo_to_bridge",
    action: "Scheduled Sync - Payment Status",
    detail: "อัปเดต 15 รายการ (12 จ่ายแล้ว, 3 รอดำเนินการ)",
    status: "success",
  },
  {
    id: 6,
    timestamp: "2568-01-27 21:00:00",
    direction: "odoo_to_bridge",
    action: "Scheduled Sync - Payment Status",
    detail: "อัปเดต 8 รายการ - Timeout",
    status: "failed",
  },
];

const disbursementRequests = [
  { id: "RQ-2568-156", project: "PRJ-045 พัฒนา AI Chatbot", amount: "500,000", status: "pending_odoo", sentDate: "28 ม.ค. 2568" },
  { id: "RQ-2568-145", project: "PRJ-041 Data Analytics Platform", amount: "800,000", status: "approved", sentDate: "25 ม.ค. 2568" },
  { id: "EX-2568-078", project: "PRJ-032 Cloud Migration", amount: "1,200,000", status: "paid", sentDate: "20 ม.ค. 2568", paidDate: "28 ม.ค. 2568" },
  { id: "RQ-2568-130", project: "PRJ-038 IoT Factory", amount: "350,000", status: "rejected", sentDate: "18 ม.ค. 2568" },
];

const scheduledTasks = [
  { id: 1, name: "Payment Status Sync (Odoo → Bridge)", schedule: "ทุก 3 ชั่วโมง", lastRun: "12:00 วันนี้", nextRun: "15:00 วันนี้", status: "active" },
  { id: 2, name: "Vendor Profile Sync", schedule: "ทุก 6 ชั่วโมง", lastRun: "06:00 วันนี้", nextRun: "12:00 วันนี้", status: "active" },
  { id: 3, name: "E-Saraban Document Number Sync", schedule: "ทุก 1 ชั่วโมง", lastRun: "14:00 วันนี้", nextRun: "15:00 วันนี้", status: "active" },
  { id: 4, name: "Full Data Reconciliation", schedule: "ทุกวัน 02:00", lastRun: "02:00 วันนี้", nextRun: "02:00 พรุ่งนี้", status: "active" },
];

export default function IntegrationsPage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-violet-50 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700">
              <Plug className="w-3 h-3 mr-1" />
              API Integration Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              ระบบเชื่อมต่อ API
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              เชื่อมต่อ E-Saraban และ ERP/Odoo แบบ Bi-directional Synchronization
            </p>
            <p className="text-muted-foreground">
              รองรับการส่งข้อมูล Vendor Profile, Disbursement Request, Project Closing
              และรับ Payment Status อัตโนมัติ
            </p>
          </div>
        </div>
      </section>

      {/* API Status Overview */}
      <section className="py-10 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {apiConnections.map((api) => (
              <Card key={api.id} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Server className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{api.name}</h3>
                        <p className="text-xs text-muted-foreground">{api.endpoint}</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      <CheckCircle className="w-3 h-3 mr-1" /> เชื่อมต่อแล้ว
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{api.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="text-lg font-bold text-foreground">{api.uptime}</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="text-lg font-bold text-foreground">{api.requestsToday}</div>
                      <div className="text-xs text-muted-foreground">Requests วันนี้</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="text-lg font-bold text-foreground">{api.apiVersion}</div>
                      <div className="text-xs text-muted-foreground">API Version</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="esaraban" className="space-y-8">
            <TabsList className="bg-muted/50 p-1 flex-wrap">
              <TabsTrigger value="esaraban">
                <FileText className="w-4 h-4 mr-2" />
                E-Saraban
              </TabsTrigger>
              <TabsTrigger value="odoo">
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                ERP / Odoo
              </TabsTrigger>
              <TabsTrigger value="disbursement">
                <CreditCard className="w-4 h-4 mr-2" />
                Disbursement
              </TabsTrigger>
              <TabsTrigger value="scheduled">
                <Timer className="w-4 h-4 mr-2" />
                Scheduled Tasks
              </TabsTrigger>
            </TabsList>

            {/* E-Saraban */}
            <TabsContent value="esaraban" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">E-Saraban Integration</h2>
                  <p className="text-sm text-muted-foreground">ประกาศผลผู้ได้รับทุน และออกเลขหนังสือราชการอัตโนมัติ</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  ส่งเอกสารใหม่
                </Button>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50 bg-gradient-to-br from-blue-50/50 to-transparent">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <ScrollText className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-foreground">ประกาศผลผู้ได้รับทุน</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">ส่งข้อมูลประกาศผลไปยัง E-Saraban พร้อมออกเลขที่หนังสือราชการอัตโนมัติ</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-gradient-to-br from-emerald-50/50 to-transparent">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-semibold text-foreground">ออกเลขหนังสืออัตโนมัติ</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">ระบบขอเลขที่หนังสือจาก E-Saraban โดยอัตโนมัติเมื่อสร้างเอกสารราชการ</p>
                  </CardContent>
                </Card>
              </div>

              {/* Logs */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">รายการส่งเอกสารล่าสุด</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>เวลา</TableHead>
                        <TableHead>กิจกรรม</TableHead>
                        <TableHead>เลขที่หนังสือ</TableHead>
                        <TableHead>รายละเอียด</TableHead>
                        <TableHead>ผู้รับ</TableHead>
                        <TableHead>สถานะ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eSarabanLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                          <TableCell className="text-sm font-medium">{log.action}</TableCell>
                          <TableCell className="text-sm font-mono">{log.documentNo}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{log.grantTitle}</TableCell>
                          <TableCell className="text-sm">{log.recipients} ราย</TableCell>
                          <TableCell>
                            <Badge className={log.status === "success" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}>
                              {log.status === "success" ? "สำเร็จ" : "ล้มเหลว"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Odoo ERP */}
            <TabsContent value="odoo" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">ERP / Odoo Bi-directional Sync</h2>
                  <p className="text-sm text-muted-foreground">การเชื่อมต่อข้อมูลแบบสองทิศทางกับ Odoo</p>
                </div>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Force Sync
                </Button>
              </div>

              {/* Sync Direction Features */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                      Bridge → Odoo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm text-foreground">สร้าง Vendor Profile</p>
                        <p className="text-xs text-muted-foreground">ส่งข้อมูลผู้ประกอบการเพื่อสร้าง Vendor ใน Odoo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm text-foreground">สร้างรายการตั้งเบิก (RQ/EX)</p>
                        <p className="text-xs text-muted-foreground">ส่ง Disbursement Request และ Payment Execution</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm text-foreground">ส่งข้อมูลปิดโครงการ</p>
                        <p className="text-xs text-muted-foreground">Project Closing Data เพื่อปิดบัญชีใน Odoo</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Download className="w-5 h-5 text-emerald-600" />
                      Odoo → Bridge
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-sm text-foreground">Payment Status Update</p>
                        <p className="text-xs text-muted-foreground">รับสถานะการจ่ายเงินจาก Odoo แบบ Scheduled Task</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <BarChart3 className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-sm text-foreground">Financial Reconciliation</p>
                        <p className="text-xs text-muted-foreground">เปรียบเทียบข้อมูลทางการเงินระหว่าง Bridge กับ Odoo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <RefreshCw className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-sm text-foreground">Vendor Data Sync</p>
                        <p className="text-xs text-muted-foreground">Sync ข้อมูล Vendor ที่อัปเดตจาก Odoo</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sync Logs */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Sync Logs</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>เวลา</TableHead>
                        <TableHead>ทิศทาง</TableHead>
                        <TableHead>กิจกรรม</TableHead>
                        <TableHead>รายละเอียด</TableHead>
                        <TableHead>สถานะ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {odooSyncLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                          <TableCell>
                            <Badge className={
                              log.direction === "bridge_to_odoo"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-emerald-100 text-emerald-700"
                            }>
                              {log.direction === "bridge_to_odoo" ? (
                                <><ArrowUp className="w-3 h-3 mr-1" /> Bridge → Odoo</>
                              ) : (
                                <><ArrowDown className="w-3 h-3 mr-1" /> Odoo → Bridge</>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm font-medium">{log.action}</TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">{log.detail}</TableCell>
                          <TableCell>
                            <Badge className={log.status === "success" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}>
                              {log.status === "success" ? "สำเร็จ" : "ล้มเหลว"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disbursement */}
            <TabsContent value="disbursement" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Disbursement Tracking</h2>
                <p className="text-sm text-muted-foreground">ติดตามสถานะคำขอเบิกจ่ายที่ส่งไปยัง Odoo</p>
              </div>

              <div className="grid sm:grid-cols-4 gap-4">
                <Card className="border-border/50 bg-amber-50/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-amber-600">3</div>
                    <div className="text-xs text-muted-foreground">รอดำเนินการ</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-blue-50/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-xs text-muted-foreground">อนุมัติแล้ว</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-emerald-50/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-600">24</div>
                    <div className="text-xs text-muted-foreground">จ่ายแล้ว</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-red-50/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-xs text-muted-foreground">ปฏิเสธ</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/50">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>เลขที่คำขอ</TableHead>
                        <TableHead>โครงการ</TableHead>
                        <TableHead>จำนวน (บาท)</TableHead>
                        <TableHead>วันที่ส่ง</TableHead>
                        <TableHead>วันที่จ่าย</TableHead>
                        <TableHead>สถานะ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {disbursementRequests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-mono text-sm font-medium">{req.id}</TableCell>
                          <TableCell className="text-sm">{req.project}</TableCell>
                          <TableCell className="text-sm font-medium">฿{req.amount}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{req.sentDate}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{"paidDate" in req ? req.paidDate : "-"}</TableCell>
                          <TableCell>
                            <Badge className={
                              req.status === "paid" ? "bg-emerald-100 text-emerald-700" :
                              req.status === "approved" ? "bg-blue-100 text-blue-700" :
                              req.status === "rejected" ? "bg-red-100 text-red-700" :
                              "bg-amber-100 text-amber-700"
                            }>
                              {req.status === "paid" ? "จ่ายแล้ว" :
                               req.status === "approved" ? "อนุมัติ" :
                               req.status === "rejected" ? "ปฏิเสธ" :
                               "รอ Odoo"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scheduled Tasks */}
            <TabsContent value="scheduled" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Scheduled Tasks</h2>
                <p className="text-sm text-muted-foreground">งานอัตโนมัติที่ทำงานตามตารางเวลา</p>
              </div>

              <div className="grid gap-4">
                {scheduledTasks.map((task) => (
                  <Card key={task.id} className="border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Timer className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground text-sm">{task.name}</h3>
                            <p className="text-xs text-muted-foreground">กำหนดเวลา: {task.schedule}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">รันล่าสุด</p>
                            <p className="font-medium text-foreground">{task.lastRun}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">รันถัดไป</p>
                            <p className="font-medium text-foreground">{task.nextRun}</p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700">
                            <CheckCircle className="w-3 h-3 mr-1" /> Active
                          </Badge>
                        </div>
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
