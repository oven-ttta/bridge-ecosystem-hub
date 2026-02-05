import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">
                  B
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">BRIDGE</h3>
                <p className="text-xs text-primary-foreground/60">
                  Ecosystem Platform
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              แพลตฟอร์มศูนย์กลางข้อมูลผู้ประกอบการ
              ด้านเทคโนโลยีข้อมูลขนาดใหญ่และปัญญาประดิษฐ์ของประเทศไทย
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              บริการ
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/partnership"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  ค้นหาผู้ประกอบการ
                </Link>
              </li>
              <li>
                <Link
                  href="/partnership/matching"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Business Matching
                </Link>
              </li>
              <li>
                <Link
                  href="/grants"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  ทุนสนับสนุน
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  กิจกรรมและอบรม
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              แหล่งข้อมูล
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/documents"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  แม่แบบเอกสาร
                </Link>
              </li>
              <li>
                <Link
                  href="/delegation"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  การมอบสิทธิ์
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  API Integration
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Dashboard & รายงาน
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              ติดต่อเรา
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน)
                  <br />
                  กรุงเทพมหานคร 10330
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  02-xxx-xxxx
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  contact@bdi.or.th
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            &copy; 2568 สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน) สงวนลิขสิทธิ์
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors"
            >
              เงื่อนไขการใช้งาน
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
