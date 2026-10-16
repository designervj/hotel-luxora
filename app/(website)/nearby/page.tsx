"use client";
import React, { useState, useEffect } from "react";
import NearbyMap from "../components/NearbyMap";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchNearbyPlaces } from "@/lib/store/slices/nearbySlice";

interface Attraction {
    name: string;
    timing: string;
    mapsUrl?: string;
}

interface Category {
    id: string;
    title: string;
    items: Attraction[];
}

const DEFAULT_CATEGORIES: Category[] = [
    {
        id: "airport",
        title: "AIRPORT",
        items: [
            { name: "Jaipur International Airport", timing: "20min", mapsUrl: "https://maps.google.com/?q=Jaipur+International+Airport" }
        ]
    },
    {
        id: "landmark",
        title: "LANDMARK",
        items: [
            { name: "D'Mart", timing: "3 min", mapsUrl: "https://maps.google.com/?q=DMart+Sitapura+Jaipur" },
            { name: "Sitapura Industrial Area", timing: "3 min", mapsUrl: "https://maps.google.com/?q=Sitapura+Industrial+Area+Jaipur" },
            { name: "Viva city mall", timing: "4 min", mapsUrl: "https://maps.google.com/?q=Viva+City+Mall+Jaipur" },
            { name: "Capital Mall", timing: "5 min", mapsUrl: "https://maps.google.com/?q=Capital+Mall+Jagatpura+Jaipur" },
            { name: "Akshay Patra Temple", timing: "5 min", mapsUrl: "https://maps.google.com/?q=Akshay+Patra+Temple+Jaipur" },
            { name: "Jagatpura Railway Station", timing: "8 min", mapsUrl: "https://maps.google.com/?q=Jagatpura+Railway+Station+Jaipur" }
        ]
    },
    {
        id: "schools",
        title: "School's & Colleges",
        items: [
            { name: "JECRC University", timing: "5 min", mapsUrl: "https://maps.google.com/?q=JECRC+University+Jaipur" },
            { name: "Poornima University", timing: "5 min", mapsUrl: "https://maps.google.com/?q=Poornima+University+Jaipur" },
            { name: "VIT University", timing: "5 min", mapsUrl: "https://maps.google.com/?q=VIT+University+Jaipur" },
            { name: "Gyan vihar University", timing: "4 min", mapsUrl: "https://maps.google.com/?q=Suresh+Gyan+Vihar+University+Jaipur" },
            { name: "Maharaja sawai bhawani Singh school", timing: "8 min", mapsUrl: "https://maps.google.com/?q=Maharaja+Sawai+Bhawani+Singh+School+Jaipur" },
            { name: "SRN International school", timing: "5 min", mapsUrl: "https://maps.google.com/?q=SRN+International+School+Jaipur" },
            { name: "Jaishree Periwal Global school", timing: "5 min", mapsUrl: "https://maps.google.com/?q=Jaishree+Periwal+Global+School+Jaipur" },
            { name: "Ryan International school", timing: "5 min", mapsUrl: "https://maps.google.com/?q=Ryan+International+School+Jagatpura+Jaipur" }
        ]
    },
    {
        id: "hospitals",
        title: "Hospitals",
        items: [
            { name: "Bombay hospital", timing: "3 min", mapsUrl: "https://maps.google.com/?q=Bombay+Hospital+Jaipur" },
            { name: "Jeevan rekha hospital", timing: "4 min", mapsUrl: "https://maps.google.com/?q=Jeevan+Rekha+Hospital+Jaipur" },
            { name: "Medical college hospital", timing: "5 min", mapsUrl: "https://maps.google.com/?q=SMS+Medical+College+Hospital+Jaipur" },
            { name: "Mahatma Gandhi hospital", timing: "5 min", mapsUrl: "https://maps.google.com/?q=Mahatma+Gandhi+Hospital+Jaipur" },
            { name: "Narayana multi speciality hospital", timing: "8 min", mapsUrl: "https://maps.google.com/?q=Narayana+Multispeciality+Hospital+Jaipur" }
        ]
    }
];

// Google Maps URL from lat/lng
function mapsUrlFromCoords(lat?: number, lng?: number, name?: string): string {
    if (lat && lng) return `https://maps.google.com/?q=${lat},${lng}`;
    if (name) return `https://maps.google.com/?q=${encodeURIComponent(name + " Jaipur")}`;
    return "https://maps.google.com/?q=Hotel+Luxora+Jaipur";
}

function embedUrlFromCoords(lat?: number, lng?: number): string {
    const defLat = 26.7769, defLng = 75.8123;
    const tLat = lat || defLat;
    const tLng = lng || defLng;
    return `https://maps.google.com/maps?q=${tLat},${tLng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

interface SelectedPlace {
    name: string;
    lat?: number;
    lng?: number;
    mapsUrl?: string;
    embedUrl: string;
}

export default function NearbyPage() {
    const dispatch = useAppDispatch();
    const dbPlaces = useAppSelector((state) => state.nearby.places);
    const [activeCategory, setActiveCategory] = useState<string>("featured");
    const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);

    useEffect(() => {
        dispatch(fetchNearbyPlaces());
    }, [dispatch]);

    const categories: Category[] = [
        ...(dbPlaces.length > 0 ? [{
            id: "featured",
            title: "HOTEL HIGHLIGHTS",
            items: dbPlaces.map((p: any) => ({
                name: p.name,
                timing: p.distance || "Few mins",
                lat: p.lat,
                lng: p.lng,
                mapsUrl: mapsUrlFromCoords(p.lat, p.lng, p.name)
            }))
        }] : []),
        ...DEFAULT_CATEGORIES
    ];

    // Ensure valid active category
    const currentActive = categories.some(c => c.id === activeCategory)
        ? activeCategory
        : categories[0]?.id || "airport";

    return (
        <div style={{ 
            background: "var(--midnight)", 
            minHeight: "100vh", 
            paddingTop: "160px", 
            paddingBottom: "112px",
            fontFamily: "var(--font-primary)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Background Branding Text */}
            <div style={{ 
                position: "absolute", 
                top: 100, 
                left: "50%", 
                transform: "translateX(-50%)", 
                fontSize: "clamp(60px, 15vw, 180px)", 
                fontWeight: 900, 
                color: "rgba(212,168,87,0.03)", 
                whiteSpace: "nowrap", 
                zIndex: 0,
                pointerEvents: "none",
                textTransform: "uppercase"
            }}>
                Nearby Attractions
            </div>

            <div className="max-w" style={{ position: "relative", zIndex: 1 }}>
                {/* Header Section */}
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <div className="section-eyebrow fade-in-up visible" style={{ justifyContent: "center" }}>
                        <span className="line"></span>
                        <span>Local Discoveries</span>
                        <span className="line"></span>
                    </div>
                    <h1 className="section-title fade-in-up visible" style={{ fontSize: "clamp(32px, 6vw, 64px)", textTransform: "uppercase", marginBottom: 24 }}>
                        Nearby <em>Attractions</em>
                    </h1>
                    <p className="fade-in-up visible" style={{ fontSize: "16px", color: "var(--ivory-dim)", lineHeight: 1.8, maxWidth: "800px", margin: "0 auto" }}>
                        Stay close to everything that matters. Hotel Luxora is ideally situated near major landmarks, hospitals, shopping areas, and transport hubs, ensuring comfort, convenience, and easy connectivity throughout your visit.
                    </p>
                </div>

                <div className="nearby-page-grid" style={{ 
                    display: "grid", 
                    alignItems: "start" 
                }}>
                    {/* Left: Accordion */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {categories.map((cat) => {
                            const isActive = currentActive === cat.id;
                            return (
                                <div 
                                    key={cat.id}
                                    onMouseEnter={() => setActiveCategory(cat.id)}
                                    style={{
                                        background: isActive ? "var(--gold)" : "rgba(255,255,255,0.03)",
                                        border: isActive ? "1px solid var(--gold)" : "1px solid rgba(212,168,87,0.1)",
                                        borderRadius: "2px",
                                        padding: isActive ? "32px 40px" : "24px 40px",
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        cursor: "default",
                                        color: isActive ? "var(--midnight)" : "var(--ivory)"
                                    }}
                                >
                                    <div style={{ 
                                        display: "flex", 
                                        justifyContent: "space-between", 
                                        alignItems: "center",
                                        marginBottom: isActive ? "24px" : "0"
                                    }}>
                                        <h2 style={{ 
                                            margin: 0, 
                                            fontSize: "13px", 
                                            fontWeight: 700, 
                                            letterSpacing: "0.15em",
                                            textTransform: "uppercase"
                                        }}>
                                            {cat.title}
                                        </h2>
                                        {!isActive && (
                                            <div style={{ 
                                                width: "20px", 
                                                height: "20px", 
                                                display: "flex", 
                                                alignItems: "center", 
                                                justifyContent: "center",
                                                color: "var(--gold)",
                                                opacity: 0.6
                                            }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {isActive && (
                                        <ul style={{ 
                                            listStyle: "none", 
                                            padding: 0, 
                                            margin: 0,
                                            animation: "fadeIn 0.5s ease-out"
                                        }}>
                                            {cat.items.map((item: any, idx: number) => {
                                                const isSelected =
                                                    selectedPlace?.name === item.name;
                                                return (
                                                <li key={idx} style={{ 
                                                    marginBottom: "14px", 
                                                    fontSize: "14px", 
                                                    display: "flex",
                                                    alignItems: "start",
                                                    lineHeight: "1.6"
                                                }}>
                                                    <span style={{ 
                                                        marginRight: "16px", 
                                                        marginTop: "10px", 
                                                        width: "30px", 
                                                        height: "1px", 
                                                        background: "var(--midnight)", 
                                                        opacity: 0.3, 
                                                        flexShrink: 0 
                                                    }} />
                                                    <span style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                                        <button
                                                            onClick={() => {
                                                                const lat = item.lat;
                                                                const lng = item.lng;
                                                                setSelectedPlace({
                                                                    name: item.name,
                                                                    lat,
                                                                    lng,
                                                                    mapsUrl: item.mapsUrl,
                                                                    embedUrl: embedUrlFromCoords(lat, lng)
                                                                });
                                                            }}
                                                            style={{
                                                                fontWeight: 700,
                                                                color: isSelected ? "var(--gold)" : "inherit",
                                                                background: "none",
                                                                border: "none",
                                                                padding: 0,
                                                                cursor: "pointer",
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "5px",
                                                                borderBottom: isSelected ? "1px solid var(--gold)" : "1px solid rgba(0,0,0,0.2)",
                                                                paddingBottom: "1px",
                                                                fontSize: "inherit",
                                                                fontFamily: "inherit",
                                                                letterSpacing: "inherit",
                                                                transition: "all 0.2s",
                                                            }}
                                                        >
                                                            {/* Map Pin SVG */}
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: isSelected ? 1 : 0.4, flexShrink: 0 }}>
                                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                            </svg>
                                                            {item.name}
                                                        </button>
                                                        <span style={{ opacity: 0.7 }}>— {item.timing}</span>
                                                    </span>
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Map */}
                    <div className="fade-in-up visible" style={{ 
                        position: "sticky", 
                        top: "160px",
                        height: "650px", 
                        borderRadius: "2px", 
                        overflow: "hidden",
                        border: "1px solid rgba(212,168,87,0.2)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                    }}>
                        <NearbyMap
                            places={dbPlaces}
                            embedUrl={selectedPlace?.embedUrl}
                            selectedPlaceName={selectedPlace?.name}
                            selectedPlaceMapsUrl={selectedPlace?.mapsUrl}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .nearby-page-grid {
                    grid-template-columns: 1.2fr 1fr;
                    gap: 60px;
                }

                @media (max-width: 1024px) {
                    .nearby-page-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                    div[style*="position: sticky"] {
                        position: relative !important;
                        top: 0 !important;
                        margin-top: 48px;
                        height: 500px !important;
                    }
                }
            `}</style>
        </div>
    );
}


