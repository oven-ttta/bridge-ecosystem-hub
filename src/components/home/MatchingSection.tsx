import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Building2, 
  Target, 
  TrendingUp, 
  MapPin,
  CheckCircle2 
} from "lucide-react";

const matchingBenefits = [
  "วิเคราะห์ความต้องการเทคโนโลยีเชิงลึก",
  "จับคู่ผู้ให้บริการตามความเชี่ยวชาญ",
  "ประเมินศักยภาพและความพร้อม",
  "ติดตามผลและมูลค่าทางธุรกิจ",
];

const demandCategories = [
  { label: "AI/ML Solutions", count: 45 },
  { label: "Data Analytics", count: 38 },
  { label: "Cloud Infrastructure", count: 32 },
  { label: "IoT & Sensors", count: 28 },
];

export function MatchingSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Smart Business Matching
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              จับคู่ธุรกิจ
              <span className="gradient-accent-text"> อัจฉริยะ</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              ระบบวิเคราะห์ Demand และ Supply ด้านเทคโนโลยี Big Data, AI และดิจิทัล 
              โดยใช้เกณฑ์ประเมินความสามารถในการต่อยอดเทคโนโลยี ศักยภาพทางธุรกิจ 
              และมิติอื่นๆ เพื่อสร้างโอกาสทางธุรกิจที่แท้จริง
            </p>
            
            <ul className="space-y-4 mb-8">
              {matchingBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
                <Link to="/partnership/matching">
                  เริ่มจับคู่ธุรกิจ
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/partnership">
                  ดูผู้ประกอบการทั้งหมด
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border/50 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Demand Analysis
                </h3>
                <span className="text-sm text-muted-foreground">Live Data</span>
              </div>
              
              {/* Demand Bars */}
              <div className="space-y-4 mb-8">
                {demandCategories.map((cat, index) => (
                  <div key={cat.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground font-medium">{cat.label}</span>
                      <span className="text-muted-foreground">{cat.count} requests</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
                        style={{ width: `${(cat.count / 50) * 100}%`, animationDelay: `${index * 0.2}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map Preview */}
              <div className="bg-muted/50 rounded-2xl p-6 border border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Geographic Distribution</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["กรุงเทพฯ", "เชียงใหม่", "ชลบุรี", "ภูเก็ต", "ขอนแก่น"].map((region) => (
                    <span key={region} className="px-3 py-1.5 bg-background rounded-full text-xs text-muted-foreground border border-border/50">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-accent/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float z-20">
              <Building2 className="w-6 h-6 text-accent-foreground mb-2" />
              <div className="text-2xl font-bold text-accent-foreground">143</div>
              <div className="text-xs text-accent-foreground/80">Matches Made</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-primary/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float z-20" style={{ animationDelay: "1s" }}>
              <TrendingUp className="w-6 h-6 text-primary-foreground mb-2" />
              <div className="text-2xl font-bold text-primary-foreground">฿24M</div>
              <div className="text-xs text-primary-foreground/80">Business Value</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
