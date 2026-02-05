"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Shield,
  CheckCircle,
  Users,
  Briefcase,
  Sparkles,
  Upload,
} from "lucide-react";

const steps = [
  { id: 1, label: "ข้อมูลผู้ติดต่อ", icon: User },
  { id: 2, label: "ข้อมูลองค์กร", icon: Building2 },
  { id: 3, label: "ความเชี่ยวชาญ", icon: Briefcase },
  { id: 4, label: "เอกสารยืนยัน", icon: FileText },
];

const expertiseOptions = [
  "Big Data Analytics",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Engineering",
  "Cloud Computing",
  "IoT & Sensor Data",
  "Natural Language Processing",
  "Computer Vision",
  "Cybersecurity",
  "Blockchain & DLT",
  "Data Visualization",
  "Business Intelligence",
];

const businessTypes = [
  "บริษัทจำกัด",
  "บริษัทมหาชนจำกัด",
  "ห้างหุ้นส่วนจำกัด",
  "วิสาหกิจเริ่มต้น (Startup)",
  "สถาบันการศึกษา",
  "หน่วยงานภาครัฐ",
  "องค์กรไม่แสวงหากำไร",
];

const benefits = [
  { icon: Users, text: "เข้าถึงเครือข่ายผู้ประกอบการกว่า 500 ราย" },
  { icon: Sparkles, text: "ระบบ AI จับคู่ธุรกิจอัตโนมัติ" },
  { icon: Shield, text: "โอกาสรับทุนสนับสนุนจากภาครัฐ" },
  { icon: Globe, text: "แสดงโปรไฟล์ธุรกิจบนแพลตฟอร์ม" },
];

export default function PartnershipRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPdpa, setAcceptPdpa] = useState(false);

  const toggleExpertise = (item: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle registration
  };

  return (
    <main className="min-h-[calc(100vh-80px)] py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10 pt-20">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            BRIDGE Partnership Network
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            เข้าร่วมเครือข่าย BRIDGE
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ลงทะเบียนเพื่อเป็นส่วนหนึ่งของระบบนิเวศ Big Data และ AI ของประเทศไทย
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">
                สิทธิประโยชน์สมาชิก
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground pt-1.5">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  มีบัญชีอยู่แล้ว?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        currentStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`hidden sm:block text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-3 ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border/50 shadow-xl p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Contact Info */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        ข้อมูลผู้ติดต่อ
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        กรอกข้อมูลผู้ติดต่อหลักขององค์กร
                      </p>
                    </div>
                    <Separator />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>ชื่อ</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input placeholder="ชื่อจริง" className="pl-10 h-11" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>นามสกุล</Label>
                        <Input placeholder="นามสกุล" className="h-11" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>ตำแหน่ง</Label>
                      <Input placeholder="เช่น CEO, CTO, ผู้จัดการฝ่าย IT" className="h-11" />
                    </div>

                    <div className="space-y-2">
                      <Label>อีเมล</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@company.co.th"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>เบอร์โทรศัพท์</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="0xx-xxx-xxxx"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Organization Info */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        ข้อมูลองค์กร
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        กรอกข้อมูลบริษัทหรือองค์กรของคุณ
                      </p>
                    </div>
                    <Separator />

                    <div className="space-y-2">
                      <Label>ชื่อองค์กร (ภาษาไทย)</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="บริษัท ตัวอย่าง จำกัด"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>ชื่อองค์กร (ภาษาอังกฤษ)</Label>
                      <Input placeholder="Example Co., Ltd." className="h-11" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>เลขทะเบียนนิติบุคคล</Label>
                        <Input placeholder="เลข 13 หลัก" className="h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label>ประเภทองค์กร</Label>
                        <Select>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>ที่อยู่</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="ที่อยู่สำนักงาน"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>เว็บไซต์</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="url"
                          placeholder="https://www.example.co.th"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>จำนวนพนักงาน</Label>
                        <Select>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="เลือก" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 คน</SelectItem>
                            <SelectItem value="11-50">11-50 คน</SelectItem>
                            <SelectItem value="51-200">51-200 คน</SelectItem>
                            <SelectItem value="201-500">201-500 คน</SelectItem>
                            <SelectItem value="500+">มากกว่า 500 คน</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>รายได้ต่อปี</Label>
                        <Select>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="เลือก" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-5m">ต่ำกว่า 5 ล้านบาท</SelectItem>
                            <SelectItem value="5-20m">5-20 ล้านบาท</SelectItem>
                            <SelectItem value="20-100m">20-100 ล้านบาท</SelectItem>
                            <SelectItem value="100-500m">100-500 ล้านบาท</SelectItem>
                            <SelectItem value="over-500m">มากกว่า 500 ล้านบาท</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Expertise */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        ความเชี่ยวชาญและบริการ
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        เลือกด้านเทคโนโลยีที่องค์กรมีความเชี่ยวชาญ (เลือกได้หลายรายการ)
                      </p>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {expertiseOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleExpertise(item)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left ${
                            selectedExpertise.includes(item)
                              ? "bg-primary/10 border-primary/30 text-primary"
                              : "bg-card border-border/50 text-muted-foreground hover:border-primary/20 hover:bg-muted/50"
                          }`}
                        >
                          {selectedExpertise.includes(item) && (
                            <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />
                          )}
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label>คำอธิบายบริการ (ภาษาไทย)</Label>
                      <textarea
                        className="w-full min-h-[100px] rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="อธิบายบริการหรือผลิตภัณฑ์หลักขององค์กร..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>ผลงานที่ผ่านมา (Portfolio)</Label>
                      <textarea
                        className="w-full min-h-[80px] rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="อธิบายโครงการสำคัญที่ผ่านมา (ถ้ามี)..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Documents & Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        เอกสารยืนยันและข้อตกลง
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        อัปโหลดเอกสารยืนยันตัวตนและยอมรับข้อตกลง
                      </p>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          หนังสือรับรองบริษัท (DBD)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, JPG หรือ PNG ขนาดไม่เกิน 10MB
                        </p>
                      </div>

                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          โลโก้องค์กร
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG หรือ SVG ขนาดไม่เกิน 5MB
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) =>
                            setAcceptTerms(checked as boolean)
                          }
                        />
                        <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                          ข้าพเจ้ายอมรับ{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            เงื่อนไขการใช้งาน
                          </Link>{" "}
                          ของ BRIDGE Platform
                        </Label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="pdpa"
                          checked={acceptPdpa}
                          onCheckedChange={(checked) =>
                            setAcceptPdpa(checked as boolean)
                          }
                        />
                        <Label htmlFor="pdpa" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                          ข้าพเจ้ายินยอมให้เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล ตาม{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            นโยบายความเป็นส่วนตัว
                          </Link>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep((s) => s - 1)}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      ย้อนกลับ
                    </Button>
                  ) : (
                    <Button variant="outline" asChild>
                      <Link href="/partnership">ยกเลิก</Link>
                    </Button>
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep((s) => s + 1)}
                      className="gap-2"
                    >
                      ถัดไป
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 gap-2"
                      disabled={!acceptTerms || !acceptPdpa}
                    >
                      ส่งใบสมัคร
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
