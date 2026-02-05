import { ArrowRight, Users, Briefcase, Calendar, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { label: "ผู้ประกอบการ", value: "500+", icon: Users },
  { label: "โครงการที่สนับสนุน", value: "120+", icon: Briefcase },
  { label: "กิจกรรม/ปี", value: "50+", icon: Calendar },
  { label: "มูลค่าทุน (ล้านบาท)", value: "200+", icon: BarChart3 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      {/* Floating shapes */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-white/10 rounded-2xl rotate-12 animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 border border-accent/30 rounded-xl -rotate-12 animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Big Data Institute (BDI) Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            BRIDGE
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-white/80 mt-3">
              The Ecosystem Platform
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            ศูนย์กลางเชื่อมโยงผู้ประกอบการด้านเทคโนโลยี Big Data และ AI 
            <br className="hidden md:block" />
            พร้อมระบบสนับสนุนทุนและกิจกรรมส่งเสริมอุตสาหกรรมดิจิทัลของประเทศไทย
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="btn-accent-gradient text-base h-14 px-8 group">
              <Link href="/partnership/register">
                เข้าร่วมเครือข่าย
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white text-base h-14 px-8">
              <Link href="/partnership">
                ค้นหาผู้ประกอบการ
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center group hover:bg-white/20 transition-all duration-300"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
