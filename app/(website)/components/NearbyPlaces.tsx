"use client";
import React, { useEffect } from "react";
import { NearbyPlace } from "../../components/types";
import { FaMapMarkerAlt, FaPlane, FaHospital, FaUniversity, FaBuilding, FaRoad } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchNearbyPlaces } from "@/lib/store/slices/nearbySlice";

const ICON_MAP: Record<string, React.ReactNode> = {
  "JAIPUR INTERNATIONAL AIRPORT": <FaPlane />,
  "MAHATMA GANDHI HOSPITAL": <FaHospital />,
  "BOMBAY HOSPITAL": <FaHospital />,
  "JECC JAIPUR": <FaBuilding />,
  "AKSHAYA PATRA TEMPLE": <FaUniversity />,
  "CHATRALA CIRCLE": <FaRoad />,
  "INDIA GATE": <FaBuilding />,
};

export default function NearbyPlaces() {
  const dispatch = useAppDispatch();
  const allPlaces = useAppSelector((state) => state.nearby.places);
  const loading = useAppSelector((state) => state.nearby.loading);

  useEffect(() => {
    dispatch(fetchNearbyPlaces());
  }, [dispatch]);

  const places = allPlaces.slice(0, 4);

  if (loading && places.length === 0) return null;
  if (places.length === 0) return null;

  return (
    <div className="nearby-section fade-in-up visible">
      <div className="nearby-grid">
        {places.map((place) => (
          <div key={place.id} className="nearby-card">
            <div className="nearby-icon">
              {ICON_MAP[place.name.toUpperCase()] || <FaMapMarkerAlt />}
            </div>
            <div className="nearby-info">
              <h4 className="nearby-name">{place.name}</h4>
              <p className="nearby-dist">{place.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
