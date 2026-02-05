"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  ArrowRight,
  CheckCircle2,
  Shield,
  Fingerprint,
  MapPin,
} from "lucide-react";

const benefits = [
  "เข้าถึงเครือข่ายผู้ประกอบการกว่า 500 ราย",
  "ระบบจับคู่ธุรกิจอัจฉริยะ (Smart Matching)",
  "ยื่นข้อเสนอขอทุนสนับสนุนออนไลน์",
  "เข้าร่วม Workshop และ Conference",
  "Dashboard วิเคราะห์ข้อมูลเชิงลึก",
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPdpa, setAcceptPdpa] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // TODO: handle register
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
      <div className="absolute top-10 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-[1000px] relative z-10 pt-10">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: Benefits */}
          <div className="lg:col-span-2 hidden lg:block">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-primary-foreground font-bold text-xl">B</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">BRIDGE</h1>
                <p className="text-xs text-muted-foreground -mt-0.5">Ecosystem Platform</p>
              </div>
            </Link>

            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              เข้าร่วมระบบนิเวศ
              <span className="gradient-text block">Big Data & AI</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              ลงทะเบียนเพื่อเข้าถึงทุกบริการของ BRIDGE Platform
              ศูนย์กลางเชื่อมโยงผู้ประกอบการด้านเทคโนโลยีของประเทศไทย
            </p>

            <ul className="space-y-4">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-foreground font-medium mb-1">
                มีผู้ประกอบการกว่า 500+ ราย
              </p>
              <p className="text-xs text-muted-foreground">
                ที่ไว้วางใจใช้งาน BRIDGE Platform ในการเชื่อมต่อธุรกิจ
              </p>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div className="lg:col-span-3">
            {/* Mobile header */}
            <div className="text-center mb-6 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg">B</span>
                </div>
                <span className="font-display font-bold text-xl text-foreground">BRIDGE</span>
              </Link>
            </div>

            {/* Steps indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                step === 1 ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
                ข้อมูลบัญชี
              </div>
              <div className="h-px flex-1 bg-border" />
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-xs">2</span>
                ข้อมูลองค์กร
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 shadow-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {step === 1 ? "สร้างบัญชีผู้ใช้งาน" : "ข้อมูลองค์กร / นิติบุคคล"}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {step === 1
                  ? "กรอกข้อมูลพื้นฐานเพื่อสร้างบัญชีผู้ใช้งาน"
                  : "กรอกข้อมูลองค์กรเพื่อเข้าร่วมเครือข่าย"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 ? (
                  <>
                    {/* Name */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">ชื่อ</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="ชื่อ"
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">นามสกุล</Label>
                        <Input
                          id="lastName"
                          placeholder="นามสกุล"
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="regEmail">อีเมล</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="regEmail"
                          type="email"
                          placeholder="you@company.co.th"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="08X-XXX-XXXX"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">รหัสผ่าน</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="regPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="อย่างน้อย 8 ตัวอักษร"
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-1 flex-1 rounded-full bg-muted" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ต้องมีอย่างน้อย 8 ตัวอักษร ตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="กรอกรหัสผ่านอีกครั้ง"
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName">ชื่อบริษัท / องค์กร</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          placeholder="บริษัท ... จำกัด"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Tax ID */}
                    <div className="space-y-2">
                      <Label htmlFor="taxId">เลขประจำตัวผู้เสียภาษี</Label>
                      <Input
                        id="taxId"
                        placeholder="X-XXXX-XXXXX-XX-X"
                        className="h-12"
                        required
                      />
                    </div>

                    {/* Business Type & Size */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>ประเภทธุรกิจ</Label>
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup</SelectItem>
                            <SelectItem value="sme">SME</SelectItem>
                            <SelectItem value="large">Large Enterprise</SelectItem>
                            <SelectItem value="gov">หน่วยงานภาครัฐ</SelectItem>
                            <SelectItem value="edu">สถาบันการศึกษา</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>จำนวนพนักงาน</Label>
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="เลือกขนาด" />
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
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">ที่ตั้ง</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="จังหวัด"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Expertise */}
                    <div className="space-y-2">
                      <Label>ความเชี่ยวชาญ</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="เลือกความเชี่ยวชาญหลัก" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-ml">AI / Machine Learning</SelectItem>
                          <SelectItem value="data-analytics">Data Analytics</SelectItem>
                          <SelectItem value="cloud">Cloud Infrastructure</SelectItem>
                          <SelectItem value="iot">IoT & Sensors</SelectItem>
                          <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                          <SelectItem value="bigdata">Big Data Engineering</SelectItem>
                          <SelectItem value="blockchain">Blockchain</SelectItem>
                          <SelectItem value="other">อื่น ๆ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Terms */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(v) => setAcceptTerms(v as boolean)}
                          className="mt-0.5"
                        />
                        <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                          ข้าพเจ้ายอมรับ{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            เงื่อนไขการใช้งาน
                          </Link>{" "}
                          ของ BRIDGE Platform
                        </Label>
                      </div>
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="pdpa"
                          checked={acceptPdpa}
                          onCheckedChange={(v) => setAcceptPdpa(v as boolean)}
                          className="mt-0.5"
                        />
                        <Label htmlFor="pdpa" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                          ข้าพเจ้ายินยอมให้เก็บและใช้ข้อมูลตาม{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            นโยบายความเป็นส่วนตัว (PDPA)
                          </Link>
                        </Label>
                      </div>
                    </div>
                  </>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  {step === 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 px-6"
                      onClick={() => setStep(1)}
                    >
                      ย้อนกลับ
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-base font-medium group"
                    disabled={step === 2 && (!acceptTerms || !acceptPdpa)}
                  >
                    {step === 1 ? "ถัดไป" : "ลงทะเบียน"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>

              {step === 1 && (
                <>
                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                      หรือลงทะเบียนด้วย
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 gap-2">
                      <Fingerprint className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">THAID</span>
                    </Button>
                    <Button variant="outline" className="h-12 gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Digital ID</span>
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              มีบัญชีอยู่แล้ว?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
