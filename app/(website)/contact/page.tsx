"use client";
import React, { useEffect, useState } from "react";
import { Hotel } from "../../components/types";

function ContactHero() {
    return (
        <section className="hero" style={{ minHeight: "65vh", paddingBottom: 0 }}>
            <div className="hero-bg" style={{ backgroundImage: "url('/default-hotel.png')", opacity: 1, zIndex: 0 }} />
            <div className="hero-grad1" style={{ zIndex: 1 }} />
            <div className="hero-grad2" style={{ zIndex: 1 }} />
            
            <div className="hero-inner" style={{ paddingBottom: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="hero-content fade-in-up visible" style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
                    <div className="hero-eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>
                        <div className="eyebrow-line" style={{ width: 40 }} />
                        <span className="eyebrow-text" style={{ letterSpacing: "0.2em" }}>RESERVATIONS</span>
                        <div className="eyebrow-line" style={{ width: 40 }} />
                    </div>
                    <h1 className="hero-headline font-display" style={{ fontSize: "clamp(48px, 8vw, 84px)", lineHeight: 1.1 }}>
                        Get In <br/><em>Touch</em>
                    </h1>
                    <p className="fade-in-up visible" style={{ color: "var(--ivory-dim)", marginTop: 24, fontSize: 16, maxWidth: 600, margin: "24px auto 0", lineHeight: 1.8 }}>
                        Our dedicated hospitality team is available 24/7 to assist with your reservations and ensure your journey to Jaipur is seamless.
                    </p>
                </div>
            </div>
        </section>
    );
}
export default function ContactPage() {
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [formSent, setFormSent] = useState(false);

    useEffect(() => {
        fetch("/api/hotel-settings")
            .then(r => r.json())
            .then(d => { if (d.name) setHotel(d); })
            .catch(() => {});

        // Handle animations
        const fadeEls = document.querySelectorAll('.fade-in-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).style.transitionDelay = (i * 0.05) + 's';
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        fadeEls.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSent(true);
    };

    return (
        <div style={{ background: "var(--midnight)", minHeight: "100vh" }}>
            <ContactHero />
            
            <div style={{ paddingTop: 112, paddingBottom: 112 }}>
                <div className="max-w">
                    {/* Contact Content Grid */}
                <div className="contact-grid">
                    <div>
                        <div className="section-eyebrow fade-in-up">
                            <span className="line"></span>
                            <span>Direct Reach</span>
                        </div>
                        <h2 className="section-title fade-in-up" style={{ fontSize: 32, marginBottom: 28 }}>
                            Begin your<br /><em>journey here</em>
                        </h2>
                        <p className="fade-in-up" style={{ fontSize: 15, color: "var(--ivory-dim)", lineHeight: 1.8, maxWidth: 320, marginBottom: 48 }}>
                            From bespoke travel arrangements to specialized dietary requests, we are here to curate your perfect stay.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item fade-in-up">
                                <div className="contact-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.12.96.36 1.9.72 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.55-.55a2 2 0 012.11-.45c.91.36 1.85.6 2.81.72A2 2 0 0122 16.92z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="contact-lbl">Direct Line</span>
                                    <span className="contact-val">{hotel?.contactNumber || "+91 63678 50548"}</span>
                                </div>
                            </div>
                            <div className="contact-item fade-in-up">
                                <div className="contact-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="contact-lbl">Email Address</span>
                                    <span className="contact-val">{hotel?.email === "reservations@hotelluxora.com" ? "hello@hotelluxora.com" : (hotel?.email || "hello@hotelluxora.com")}</span>
                                </div>
                            </div>
                            <div className="contact-item fade-in-up">
                                <div className="contact-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="contact-lbl">Our Location</span>
                                    <span className="contact-val">{hotel?.address || "12 Palace Road, Jaipur, Rajasthan 302001"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fade-in-up">
                        <div className="form-card">
                            <div className="form-subtitle">Enquiry Form</div>
                            <div className="form-title font-display">Tell us about your visit</div>
                            {!formSent ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <input className="form-input" type="text" placeholder="Full Name" required />
                                        <input className="form-input" type="email" placeholder="Email Address" required />
                                    </div>
                                    <input className="form-input" type="tel" placeholder="Phone Number" style={{ marginBottom: 16, width: "100%", display: "block" }} />
                                    <textarea className="form-textarea" rows={6} placeholder="How can we assist you?" required style={{ marginBottom: 24, display: "block" }} />
                                    <button type="submit" className="btn-submit">
                                        Send Message
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22,2 15,22 11,13 2,9" />
                                        </svg>
                                    </button>
                                </form>
                            ) : (
                                <div style={{ padding: "60px 0", textAlign: "center" }}>
                                    <div className="success-icon" style={{ margin: "0 auto 24px" }}>
                                        <div className="success-diamond"></div>
                                    </div>
                                    <h3 className="success-title font-display">Thank You</h3>
                                    <p className="success-msg">Your enquiry has been received. Our team will reach out to you shortly.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}



