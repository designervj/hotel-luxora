"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VelourHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hotel, setHotel] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        fetch("/api/hotel-settings").then(r => r.json()).then(d => { if (d.name) setHotel(d); }).catch(() => {});
        fetch("/api/auth/me").then(r => r.json()).then(d => { if (d.authenticated) setUser(d.user); }).catch(() => {});
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        setDropdownOpen(false);
    };

    // Close drawer on route change / Escape
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Nearby", href: "/nearby" },
        { label: "Contact", href: "/contact" },
    ];

    const phone = hotel?.phone || "+91 63678 50548";
    const phoneTel = hotel?.phone || "+916367850548";
    const email = hotel?.email === "reservations@hotelluxora.com" ? "hello@hotelluxora.com" : (hotel?.email || "hello@hotelluxora.com");

    return (
        <>
            {/* Top Bar */}
            <div className="vh-topbar" style={{ background: "var(--gold-gradient)", color: "#01141A", padding: "8px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: "600", letterSpacing: "0.05em", zIndex: 1001, position: "absolute", top: 0, left: 0, right: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <a href={`tel:${phoneTel}`} style={{ color: "#01141A", textDecoration: "none" }}>{phone}</a>
                </div>
                
                <div style={{ flex: 1, margin: "0 40px", overflow: "hidden", whiteSpace: "nowrap" }}>
                    <marquee scrollamount="5" style={{ display: "block" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/></svg>
                            <span>Welcome to Hotel Luxora</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/></svg>
                            <span>Experience the pinnacle of luxury and comfort. Book directly with us for exclusive offers and the best rates!</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/></svg>
                        </div>
                    </marquee>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <a href={`mailto:${email}`} style={{ color: "#01141A", textDecoration: "none" }}>{email}</a>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .vh-topbar {
                        display: none !important;
                    }
                    .vh-header {
                        top: 0 !important;
                    }
                }
            `}</style>

            <header className={`vh-header${scrolled ? " scrolled" : ""}`}>
                <div className="vh-container">

                    {/* Logo */}
                    <Link href="/" className="vh-logo">
                        <img src="/luxora-white-logo.svg" alt="Hotel Luxora" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="vh-nav">
                        {navLinks.map(l => (
                            <Link key={l.href} href={l.href} className="vh-nav-link">{l.label}</Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="vh-actions">
                        {/* <a href={`tel:${phoneTel}`} className="vh-phone-link">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.12.96.36 1.9.72 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.55-.55a2 2 0 012.11-.45c.91.36 1.85.6 2.81.72A2 2 0 0122 16.92z" />
                            </svg>
                            <span>{phone}</span>
                        </a> */}
                        <Link href="/book" className="vh-btn-book">
                            Book Now
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </Link>
                        {user ? (
                            <div className="vh-user-menu">
                                <button className="vh-user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <div className="vh-user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</div>
                                    <span>{user.name || "User"}</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="vh-dropdown">
                                        {user.role === "admin" ? (
                                            <>
                                                <Link href="/admin" className="vh-dropdown-item" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>Admin Panel</Link>
                                                <button className="vh-dropdown-item" onClick={handleLogout}>Sign Out</button>
                                            </>
                                        ) : (
                                            <>
                                                <Link href="/my-bookings" className="vh-dropdown-item" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>My Bookings</Link>
                                                <button className="vh-dropdown-item" onClick={handleLogout}>Logout</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/sign-in" className="vh-nav-link" style={{ background: "none", border: "none", cursor: "pointer", padding: "0 10px", textDecoration: "none", display: "inline-block", fontSize: "11px", letterSpacing: "0.1em" }}>
                                SIGN IN
                            </Link>
                        )}

                        {/* Hamburger — shown on mobile via CSS */}
                        <button className="vh-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Overlay */}
            {mobileOpen && (
                <div className="vh-mobile-menu" onClick={() => setMobileOpen(false)}>
                    <div className="vh-mobile-drawer" onClick={e => e.stopPropagation()}>

                        {/* Drawer Header */}
                        <div className="vh-drawer-top">
                            <Link href="/" className="vh-drawer-logo" onClick={() => setMobileOpen(false)}>
                                <img src="/luxora-white-logo.svg" alt="Hotel Luxora" />
                            </Link>
                            <button className="vh-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="vh-drawer-nav">
                            {navLinks.map(l => (
                                <Link key={l.href} href={l.href} className="vh-drawer-link" onClick={() => setMobileOpen(false)}>
                                    {l.label}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    {user.role === "admin" ? (
                                        <>
                                            <Link href="/admin" className="vh-drawer-link" style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", width: "100%", textDecoration: "none", display: "block" }} onClick={() => setMobileOpen(false)}>
                                                ADMIN PANEL
                                            </Link>
                                            <button className="vh-drawer-link" style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", width: "100%" }} onClick={() => { handleLogout(); setMobileOpen(false); }}>
                                                SIGN OUT
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/my-bookings" className="vh-drawer-link" style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", width: "100%", textDecoration: "none", display: "block" }} onClick={() => setMobileOpen(false)}>
                                                MY BOOKINGS
                                            </Link>
                                            <button className="vh-drawer-link" style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", width: "100%" }} onClick={() => { handleLogout(); setMobileOpen(false); }}>
                                                LOGOUT
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Link href="/sign-in" className="vh-drawer-link" style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", width: "100%", textDecoration: "none", display: "block" }} onClick={() => setMobileOpen(false)}>
                                    SIGN IN
                                </Link>
                            )}
                        </nav>

                        {/* Book Now CTA */}
                        <Link href="/book" className="vh-drawer-book" onClick={() => setMobileOpen(false)}>
                            Book Now
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </Link>

                        {/* Phone */}
                        <a href={`tel:${phoneTel}`} className="vh-drawer-phone">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.12.96.36 1.9.72 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.55-.55a2 2 0 012.11-.45c.91.36 1.85.6 2.81.72A2 2 0 0122 16.92z" />
                            </svg>
                            {phone}
                        </a>
                    </div>
                </div>
            )}

        </>
    );
}
