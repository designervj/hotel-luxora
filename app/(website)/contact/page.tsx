"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchHotelSettings } from "@/lib/store/slices/hotelSlice";

function ContactHero() {
    return (
        <section style={{
            position: "relative",
            padding: "160px 0 100px",
            background: "linear-gradient(rgba(1, 20, 26, 0.7), rgba(1, 20, 26, 0.9)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottom: "1px solid rgba(212, 168, 87, 0.15)"
        }}>
            <div className="max-w">
                <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
                    <div className="section-eyebrow" style={{ justifyContent: "center" }}>
                        <span className="line" />
                        <span>Concierge & Inquiries</span>
                        <span className="line" />
                    </div>
                    <h1 className="section-title font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: 20 }}>
                        We Await Your Presence
                    </h1>
                    <p style={{ color: "var(--ivory-dim)", fontSize: 16, lineHeight: 1.8 }}>
                        Our dedicated hospitality team is available 24/7 to assist with your reservations and ensure your journey to Jaipur is seamless.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const hotel = useAppSelector((state) => state.hotel.data);
    const [formSent, setFormSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    useEffect(() => {
        dispatch(fetchHotelSettings());

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
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormSent(true);
            } else {
                const data = await res.json().catch(() => ({}));
                setErrorMsg(data.error || "Failed to send message. Please try again.");
            }
        } catch {
            setErrorMsg("An unexpected error occurred. Please contact us via phone.");
        } finally {
            setSubmitting(false);
        }
    };

    const phoneNumber = hotel?.contactNumber || hotel?.phone || "+91 63767 64803";
    const hotelEmail = hotel?.email === "reservations@hotelluxora.com" ? "hello@hotelluxora.com" : (hotel?.email || "hello@hotelluxora.com");

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
                                        <span className="contact-val">
                                            <a href={`tel:${phoneNumber}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                {phoneNumber}
                                            </a>
                                        </span>
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
                                        <span className="contact-val">
                                            <a href={`mailto:${hotelEmail}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                {hotelEmail}
                                            </a>
                                        </span>
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
                                        <span className="contact-val">{hotel?.address || "Hotel Luxora Suites, 4th Floor, Dogma Business Hub, Near Capital High Street Mall, Mahal Road, Jagatpura, Jaipur, Rajasthan 302017"}</span>
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
                                            <input
                                                className="form-input"
                                                type="text"
                                                placeholder="Full Name"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                            <input
                                                className="form-input"
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <input
                                            className="form-input"
                                            type="tel"
                                            placeholder="Phone Number (+91 63767 64803)"
                                            style={{ marginBottom: 16, width: "100%", display: "block" }}
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        <textarea
                                            className="form-textarea"
                                            rows={6}
                                            placeholder="How can we assist you?"
                                            required
                                            style={{ marginBottom: 24, display: "block" }}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        />

                                        {errorMsg && (
                                            <div style={{ color: "#ff6b6b", fontSize: "13px", marginBottom: "16px" }}>
                                                {errorMsg}
                                            </div>
                                        )}

                                        <button type="submit" className="btn-submit" disabled={submitting}>
                                            {submitting ? "Sending..." : "Send Message"}
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
