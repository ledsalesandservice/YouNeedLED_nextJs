/*
 * Header — YouNeedLED
 * "Shield & Signal" design: Clean top bar with license info, main nav with dropdowns
 * Blue brand bar + white nav bar pattern matching original site
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SITE, NAV_ITEMS } from "@/lib/siteData";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="bg-[#0e319a] text-white text-sm">
        <div className="container flex items-center justify-between py-2 gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-medium">15+ Years in Business</span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span className="hidden sm:inline">{SITE.license}</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hidden md:inline">24/7 Support Available</span>
            <span className="hidden md:inline text-white/60">|</span>
            <span>Serving Tri-State Area</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#0e319a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-[#0e319a] leading-tight">You Need L.E.D.</div>
              <div className="text-xs text-slate-500 leading-tight">Professional Technology Services</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#0e319a] transition-colors rounded-md hover:bg-slate-50">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {dropdownOpen === item.label && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                            location === child.href ? "text-[#0e319a] font-semibold bg-blue-50/50" : "text-slate-700"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location === item.href
                      ? "text-[#0e319a] bg-blue-50/60"
                      : "text-slate-700 hover:text-[#0e319a] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneTel}
              className="hidden md:flex items-center gap-2 text-[#0e319a] font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-[#f97015] text-white text-sm font-semibold rounded-lg hover:bg-[#e86510] transition-colors shadow-sm"
            >
              Request Quote
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="container py-4 space-y-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen === item.label && (
                      <div className="ml-4 space-y-1 mt-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-slate-600 hover:text-[#0e319a] hover:bg-slate-50 rounded-md"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-[#0e319a] hover:bg-slate-50 rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-slate-200 mt-3">
                <a href={SITE.phoneTel} className="flex items-center gap-2 px-3 py-2.5 text-[#0e319a] font-semibold text-sm">
                  <Phone className="w-4 h-4" />
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
