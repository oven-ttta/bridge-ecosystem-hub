import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { 
    label: "เครือข่าย", 
    labelEn: "Partnership",
    href: "/partnership",
    children: [
      { label: "ค้นหาผู้ประกอบการ", href: "/partnership/directory" },
      { label: "Business Matching", href: "/partnership/matching" },
      { label: "สมัครเป็นสมาชิก", href: "/partnership/register" },
    ]
  },
  { 
    label: "ทุนสนับสนุน", 
    labelEn: "Grants",
    href: "/grants",
    children: [
      { label: "โครงการที่เปิดรับ", href: "/grants/open" },
      { label: "ยื่นข้อเสนอโครงการ", href: "/grants/apply" },
      { label: "ติดตามสถานะ", href: "/grants/status" },
    ]
  },
  { 
    label: "กิจกรรม", 
    labelEn: "Events",
    href: "/events",
  },
  { 
    label: "รายงาน", 
    labelEn: "Analytics",
    href: "/analytics",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");
  const location = useLocation();

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-xl text-foreground">BRIDGE</h1>
              <p className="text-[10px] text-muted-foreground -mt-1">Ecosystem Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.children ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href) 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {lang === "th" ? item.label : item.labelEn}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link to={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href) 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {lang === "th" ? item.label : item.labelEn}
                </Link>
              )
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{lang.toUpperCase()}</span>
            </button>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                เข้าสู่ระบบ
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                ลงทะเบียน
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href) 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {lang === "th" ? item.label : item.labelEn}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 mt-4 px-4">
                <Button variant="outline" size="sm" className="flex-1">
                  เข้าสู่ระบบ
                </Button>
                <Button size="sm" className="flex-1 bg-primary">
                  ลงทะเบียน
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
