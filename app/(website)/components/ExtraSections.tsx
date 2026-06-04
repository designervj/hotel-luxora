'use client';

import React from 'react';
import Link from 'next/link';

export function AmenitiesSection() {
  const amenities = [
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, 
      title: "Luxury Suites", desc: "Spacious, elegantly designed rooms for maximum comfort." 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>, 
      title: "Fine Dining", desc: "Exquisite culinary experiences crafted by expert chefs." 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6 0 1.2-.2 1.6-.6C4.1 4.9 4.8 4.4 5.6 4.4c.8 0 1.5.5 1.9 1 .4.5 1.1.7 1.7.7s1.2-.2 1.6-.6c.5-.5 1.2-1 2-1s1.5.5 1.9 1c.4.5 1.1.7 1.7.7s1.2-.2 1.6-.6c.5-.5 1.2-1 2-1s1.5.5 1.9 1c.4.4 1 .6 1.6.6"/><path d="M2 12c.6 0 1.2-.2 1.6-.6C4.1 10.9 4.8 10.4 5.6 10.4c.8 0 1.5.5 1.9 1 .4.5 1.1.7 1.7.7s1.2-.2 1.6-.6c.5-.5 1.2-1 2-1s1.5.5 1.9 1c.4.5 1.1.7 1.7.7s1.2-.2 1.6-.6c.5-.5 1.2-1 2-1s1.5.5 1.9 1c.4.4 1 .6 1.6.6"/><path d="M2 18c.6 0 1.2-.2 1.6-.6C4.1 16.9 4.8 16.4 5.6 16.4c.8 0 1.5.5 1.9 1 .4.5 1.1.7 1.7.7s1.2-.2 1.6-.6c.5-.5 1.2-1 2-1s1.5.5 1.9 1c.4.5 1.1.7 1.7.7s1.2-.2 1.6-.6c.5-.5 1.2-1 2-1s1.5.5 1.9 1c.4.4 1 .6 1.6.6"/></svg>, 
      title: "Infinity Pool", desc: "Relax and unwind in our temperature-controlled pool." 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 18a6 6 0 0 0 0-12v12z"/></svg>, 
      title: "Wellness Spa", desc: "Rejuvenating treatments and holistic therapies." 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 22h4"/><path d="M14 18c0-2.2-2-4-2-4s-2 1.8-2 4"/><path d="M21 16.5C21 12 18 8 12 8S3 12 3 16.5c0 1.4.6 2.6 1.5 3.5h15c.9-.9 1.5-2.1 1.5-3.5Z"/><path d="M12 2v2"/><path d="M12 6v2"/></svg>, 
      title: "24/7 Concierge", desc: "Personalized assistance for all your needs." 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H8.3a2 2 0 0 0-1.6.8L4 11l-5.16.86a1 1 0 0 0-.84.99V16h3"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>, 
      title: "Valet Parking", desc: "Complimentary secure parking for all our guests." 
    },
  ];

  return (
    <section id="amenities" style={{ padding: "112px 0", background: "#051E26", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}></div>
      <div className="max-w" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--gold)" }}></div>
            <span style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "0.35em", textTransform: "uppercase" }}>The Luxora Standard</span>
            <div style={{ width: "32px", height: "1px", background: "var(--gold)" }}></div>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 64px)", color: "var(--ivory)", fontWeight: 300, lineHeight: 1.1 }}>
            Premium <em>Amenities</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          {amenities.map((item, idx) => (
            <div key={idx} style={{ padding: "40px 32px", background: "#01141A", border: "1px solid rgba(213,168,87,0.15)", textAlign: "center", transition: "transform 0.3s" }} 
                 onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                 onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>{item.icon}</div>
              <h3 style={{ fontSize: "18px", color: "var(--ivory)", fontWeight: 500, marginBottom: "12px" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--ivory-dim)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}></div>
    </section>
  );
}

export function PromoSection() {
  return (
    <section id="promo" style={{ padding: "112px 0", background: "#01141A", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "url('https://images.unsplash.com/photo-1566404791732-26150b0cd07f?auto=format&fit=crop&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent, #01141A 80%)" }}></div>
      
      <div className="max-w" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "8px 24px", border: "1px solid var(--gold)", color: "var(--gold)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "32px" }}>
          Special Offer
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 80px)", color: "var(--ivory)", fontWeight: 300, lineHeight: 1.1, marginBottom: "24px" }}>
          Couple Friendly <em>Stays</em>
        </h2>
        <p style={{ fontSize: "16px", color: "var(--ivory-dim)", lineHeight: 1.8, marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px auto" }}>
          Experience premium luxury at an affordable price. Book our exclusive couple package and enjoy a romantic getaway with complimentary breakfast, welcome drinks, and late checkout. Starts at ₹999*.
        </p>
        <Link href="/rooms" style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "18px 40px", background: "var(--gold-gradient)", color: "#01141A", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
          Book Now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6" /></svg>
        </Link>
      </div>
    </section>
  );
}

export function DiningSection() {
  return (
    <section id="dining" style={{ padding: "112px 0", background: "#051E26", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}></div>
      <div className="max-w" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "-20px", left: "-20px", bottom: "20px", right: "20px", border: "1px solid rgba(213,168,87,0.3)" }}></div>
            <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80" alt="Fine Dining" style={{ width: "100%", height: "600px", objectFit: "cover", position: "relative", zIndex: 2 }} onError={(e) => { e.currentTarget.src = "/default-hotel.png"; e.currentTarget.onerror = null; }} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "1px", background: "var(--gold)" }}></div>
              <span style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "0.35em", textTransform: "uppercase" }}>Culinary Journey</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", color: "var(--ivory)", fontWeight: 300, lineHeight: 1.1, marginBottom: "32px" }}>
              A Taste of <em>Elegance</em>
            </h2>
            <p style={{ fontSize: "15px", color: "var(--ivory-dim)", lineHeight: 1.8, marginBottom: "24px" }}>
              Discover a world of flavors at our signature restaurant. Our master chefs curate exquisite menus blending local traditions with international cuisine, using only the freshest seasonal ingredients.
            </p>
            <p style={{ fontSize: "15px", color: "var(--ivory-dim)", lineHeight: 1.8, marginBottom: "40px" }}>
              Whether you are looking for a romantic candlelit dinner, a casual business lunch, or relaxing evening cocktails at our rooftop lounge, we offer the perfect ambiance for every occasion.
            </p>
            <Link href="/dining" style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "16px 32px", border: "1px solid var(--gold)", color: "var(--gold)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
              Explore Menus
            </Link>
          </div>

        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}></div>
    </section>
  );
}

export function EventsSection() {
  return (
    <section id="events" style={{ padding: "112px 0", background: "#01141A", position: "relative" }}>
      <div className="max-w" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
        
        <div style={{ marginBottom: "64px" }}>
          <span style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "0.35em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>Memorable Occasions</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", color: "var(--ivory)", fontWeight: 300, lineHeight: 1.1 }}>
            Weddings & <em>Events</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { title: "Grand Weddings", img: "https://images.unsplash.com/photo-1583089892943-e02e5bbce8f4?auto=format&fit=crop&q=80" },
            { title: "Corporate Meetings", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80" },
            { title: "Private Parties", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80" }
          ].map((item, idx) => (
            <div key={idx} style={{ position: "relative", height: "400px", overflow: "hidden", cursor: "pointer", group: "true" }}>
              <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }} onError={(e) => { e.currentTarget.src = "/default-hotel.png"; e.currentTarget.onerror = null; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #01141A 0%, transparent 70%)" }}></div>
              <div style={{ position: "absolute", bottom: "32px", left: "32px", right: "32px", textAlign: "left" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "var(--ivory)", fontWeight: 300, marginBottom: "8px" }}>{item.title}</h3>
                <div style={{ width: "40px", height: "2px", background: "var(--gold)", transition: "width 0.3s" }}></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
