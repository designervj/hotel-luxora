import React from "react";
import { Metadata } from "next";
import VelourHeader from "./components/VelourHeader";
import VelourFooter from "./components/VelourFooter";
import "./velour.css";

export const metadata: Metadata = {
    title: "HOTEL LUXORA | Premium Luxury Stay in Sitapura, Jaipur",
    description: "Experience the timeless grandeur of Rajasthani hospitality at Hotel Luxora. A premium boutique hotel offering exceptional comfort and personalized service in the heart of Sitapura, Jaipur.",
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="velour">
            <VelourHeader />
            <main>{children}</main>
            <VelourFooter />
        </div>
    );
}
