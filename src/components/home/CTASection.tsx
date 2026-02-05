import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-hero-pattern opacity-20" />
          
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              เข้าร่วมระบบนิเวศดิจิทัลของประเทศไทย
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 max-w-3xl mx-auto">
              พร้อมเชื่อมต่อกับโอกาสทางธุรกิจใหม่ๆ ในอุตสาหกรรม Big Data และ AI?
            </h2>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              ลงทะเบียนเป็นสมาชิก BRIDGE Platform วันนี้ เพื่อเข้าถึงเครือข่ายผู้ประกอบการ 
              ระบบจับคู่ธุรกิจ และโอกาสรับทุนสนับสนุนจากภาครัฐ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-accent-gradient text-base h-14 px-8 group">
                <Link href="/partnership/register">
                  สมัครสมาชิกฟรี
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white text-base h-14 px-8"
              >
                <Link href="/about">
                  เรียนรู้เพิ่มเติมเกี่ยวกับ สขญ.
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
