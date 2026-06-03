"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMapPin, FiPhone, FiMail, FiArrowRight } from "react-icons/fi";

export default function VelourFooter() {
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    fetch("/api/hotel-settings").then(r => r.json()).then(d => { if (d.name) setHotel(d); }).catch(() => { });
  }, []);

  return (
    <footer style={{ borderTop: "2px solid rgba(213,168,87,0.15)", background: "#01141A", paddingTop: "80px", paddingBottom: "30px", position: "relative", overflow: "hidden" }}>
      {/* Background Watermark */}
      <div style={{ position: "absolute", bottom: "-100px", right: "-100px", opacity: 0.02, pointerEvents: "none" }}>
        <img src="/luxora-white-logo.svg" alt="" style={{ width: "600px", height: "auto" }} />
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.2fr 1.5fr", gap: "60px", marginBottom: "60px" }}>

          {/* COLUMN 1: Logo & Description */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <img src="/luxora-white-logo.svg" alt="HOTEL LUXORA" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ fontSize: "14px", color: "var(--ivory-dim)", lineHeight: "1.8", marginBottom: "32px", paddingRight: "20px" }}>
              Experience the pinnacle of luxury and comfort at {hotel?.name || 'Hotel Luxora'}. Discover elegant suites, exquisite dining, and world-class hospitality in the heart of the city.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { name: "Facebook", icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
                { name: "Instagram", icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                { name: "Twitter", icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg> }
              ].map(social => (
                <a key={social.name} href="#" title={social.name} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", textDecoration: "none", transition: "all 0.3s ease", border: "1px solid rgba(213,168,87,0.3)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#01141A"; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Explore */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--ivory)", fontWeight: "400", marginBottom: "24px" }}>Explore</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {["About Us", "Our Rooms", "Fine Dining", "Weddings & Events", "Gallery"].map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, '-').replace('&', 'and')}`} style={{ fontSize: "14px", color: "var(--ivory-dim)", textDecoration: "none", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: "8px" }} onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.transform = "translateX(4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ivory-dim)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", display: "inline-block" }}></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Contact Details */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--ivory)", fontWeight: "400", marginBottom: "24px" }}>Contact Us</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", fontSize: "14px", color: "var(--ivory-dim)", lineHeight: "1.6" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(213,168,87,0.05)", border: "1px solid rgba(213,168,87,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FiMapPin style={{ color: "var(--gold)" }} size={14} />
                </div>
                <span style={{ paddingTop: "6px" }}>{hotel?.address || 'Commercial Complex, C-50, Sanganer, Jaipur 302022'}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "14px", color: "var(--ivory-dim)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(213,168,87,0.05)", border: "1px solid rgba(213,168,87,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FiPhone style={{ color: "var(--gold)" }} size={14} />
                </div>
                <span>{hotel?.phone || '+91 63678 50548'}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "14px", color: "var(--ivory-dim)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(213,168,87,0.05)", border: "1px solid rgba(213,168,87,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FiMail style={{ color: "var(--gold)" }} size={14} />
                </div>
                <span>{hotel?.email || 'reservations@hotelluxora.com'}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Newsletter */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--ivory)", fontWeight: "400", marginBottom: "24px" }}>Newsletter</div>
            <p style={{ fontSize: "14px", color: "var(--ivory-dim)", lineHeight: "1.6", marginBottom: "20px" }}>
              Subscribe to our newsletter to receive exclusive offers and the latest news about our luxury experiences.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="email" placeholder="Your email address" style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(213,168,87,0.2)", color: "var(--ivory)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.currentTarget.style.borderColor = "var(--gold)"} onBlur={(e) => e.currentTarget.style.borderColor = "rgba(213,168,87,0.2)"} required />
              <button type="submit" style={{ width: "100%", padding: "14px 16px", background: "var(--gold-gradient)", color: "#01141A", border: "none", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Subscribe <FiArrowRight />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bar */}
        <div style={{ borderTop: "1px solid rgba(213,168,87,0.15)", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(200,196,184,0.6)", letterSpacing: "0.05em" }}>
              © {new Date().getFullYear()} {hotel?.name || 'Hotel Luxora'}. All rights reserved.
            </span>
            <span style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "0.05em", opacity: 0.9 }}>
              Crafted by Codified Web Solutions
            </span>
          </div>
          <div id="footer-legal-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <Link href="/privacy-policy" style={{ fontSize: "12px", color: "rgba(200,192,176,0.6)", textDecoration: "none", transition: "color 0.3s ease", letterSpacing: "0.05em" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(200,192,176,0.6)"}>
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" style={{ fontSize: "12px", color: "rgba(200,192,176,0.6)", textDecoration: "none", transition: "color 0.3s ease", letterSpacing: "0.05em" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(200,192,176,0.6)"}>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Styles embedded */}
      <style>{`
        @media (max-width: 1024px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </footer>
  );
}

