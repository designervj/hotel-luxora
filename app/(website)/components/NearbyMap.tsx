"use client";
import React from "react";
import type { NearbyPlace } from "../../components/types";

interface NearbyMapProps {
    places: NearbyPlace[];
    selectedPlaceId?: string;
    embedUrl?: string;
    selectedPlaceName?: string;
    selectedPlaceMapsUrl?: string;
}

const hotelLocation = {
    lat: 26.7769,
    lng: 75.8123,
    name: "Hotel Luxora",
    address: "Hotel Luxora Suites, 4th Floor, Dogma Business Hub, Near Capital High Street Mall, Mahal Road, Jagatpura, Jaipur, Rajasthan 302017"
};

export default function NearbyMap({
    places,
    selectedPlaceId,
    embedUrl,
    selectedPlaceName,
    selectedPlaceMapsUrl,
}: NearbyMapProps) {
    // If custom embedUrl passed use it, else compute from selectedPlaceId or fallback to hotel
    const selectedPlace = places.find(x => x.id === selectedPlaceId);
    const targetLat = selectedPlace && typeof selectedPlace.lat === "number" ? selectedPlace.lat : hotelLocation.lat;
    const targetLng = selectedPlace && typeof selectedPlace.lng === "number" ? selectedPlace.lng : hotelLocation.lng;

    const finalEmbedUrl = embedUrl ||
        `https://maps.google.com/maps?q=${targetLat},${targetLng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    const isCustomPlace = !!selectedPlaceName;
    const cardName = isCustomPlace ? selectedPlaceName : hotelLocation.name;
    const directionsUrl = isCustomPlace && selectedPlaceMapsUrl
        ? selectedPlaceMapsUrl
        : `https://www.google.com/maps/dir/?api=1&destination=${hotelLocation.lat},${hotelLocation.lng}`;

    return (
        <div style={{ width: "100%", height: "100%", background: "#1a1a1a", position: "relative" }}>
            <iframe
                key={finalEmbedUrl}
                src={finalEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={cardName || "Map"}
            ></iframe>
            
            {/* Location Card */}
            <div style={{
                position: "absolute",
                top: 20,
                left: 20,
                width: "280px",
                background: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                zIndex: 10,
                color: "#202124",
                transition: "all 0.3s ease"
            }}>
                {/* Back to hotel button when a place is selected */}
                {isCustomPlace && (
                    <div style={{ fontSize: "11px", color: "#1a73e8", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        Nearby Location
                    </div>
                )}

                <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: isCustomPlace ? "4px" : "4px", lineHeight: 1.3 }}>
                    {cardName}
                </div>
                
                {!isCustomPlace && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#d93025" }}>4.9</span>
                        <div style={{ display: "flex", gap: "1px" }}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < 4 ? "#fbbc04" : "url(#partialStar)"}>
                                    <defs>
                                        <linearGradient id="partialStar">
                                            <stop offset="90%" stopColor="#fbbc04" />
                                            <stop offset="90%" stopColor="#dadce0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ fontSize: "13px", color: "#5f6368", lineHeight: "1.4", marginBottom: "20px" }}>
                    {isCustomPlace
                        ? `Near Hotel Luxora, Jagatpura, Jaipur`
                        : hotelLocation.address}
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                    <a 
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            flex: 1,
                            background: "#1a73e8",
                            color: "#ffffff",
                            padding: "10px 0",
                            borderRadius: "4px",
                            fontSize: "13px",
                            fontWeight: 500,
                            textAlign: "center",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px"
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                        </svg>
                        {isCustomPlace ? "Get Directions" : "Get Directions"}
                    </a>
                    
                    <a 
                        href={isCustomPlace && selectedPlaceMapsUrl ? selectedPlaceMapsUrl : `https://www.google.com/maps/search/?api=1&query=${hotelLocation.lat},${hotelLocation.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            width: "40px",
                            height: "40px",
                            border: "1px solid #dadce0",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#1a73e8",
                            textDecoration: "none"
                        }}
                        title="Open in Maps"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
