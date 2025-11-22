"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import AOS from "aos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaRoute, FaMapMarkedAlt, FaListUl } from "react-icons/fa";

export default function Alpes2026() {
    const mapRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }, []);

    const initMap = async () => {
        console.log("initMap called (Async pattern)");
        if (!mapRef.current) {
            console.error("Map ref is null");
            return;
        }

        try {
            // Wait for the Google Maps API to be available
            // When using loading=async, we might need to wait for the global 'google' object
            // But usually, the onLoad callback from next/script handles this timing.
            // Using importLibrary is the modern way to ensure modules are loaded.

            console.log("Importing libraries...");
            const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
            const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

            console.log("Libraries imported. Creating map...");
            const map = new Map(mapRef.current, {
                zoom: 6,
                center: { lat: 45.6306, lng: 8.7281 },
                mapTypeId: "roadmap",
                styles: [
                    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
                    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
                    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
                    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
                    { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
                    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
                    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
                    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
                    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
                    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
                    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
                    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
                    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
                ],
            });

            const directionsService = new DirectionsService();
            const directionsRenderer = new DirectionsRenderer({
                map: map,
                polylineOptions: {
                    strokeColor: "#d4af37",
                    strokeWeight: 5,
                },
                suppressMarkers: true,
            });

            const waypoints = [
                { location: { lat: 46.2381, lng: 6.1089 }, stopover: true }, // Genebra
                { location: { lat: 43.9517, lng: 6.5071 }, stopover: true }, // Saint-André
                { location: { lat: 44.3335, lng: 5.7549 }, stopover: true }, // Laragne
                { location: { lat: 46.7403, lng: 13.1716 }, stopover: true }, // Greifenburg
                { location: { lat: 47.6719, lng: 12.4085 }, stopover: true }, // Kössen
                { location: { lat: 47.5717, lng: 10.7498 }, stopover: true }, // Tegelberg
                { location: { lat: 45.7936, lng: 11.7402 }, stopover: true }, // Bassano
            ];

            const origin = { lat: 45.6306, lng: 8.7281 }; // Malpensa
            const destination = { lat: 45.6306, lng: 8.7281 }; // Malpensa

            const request = {
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            };

            console.log("Requesting route...");
            directionsService.route(request, function (result, status) {
                console.log("Route status:", status);
                if (status === google.maps.DirectionsStatus.OK && result && result.routes && result.routes[0] && result.routes[0].legs) {
                    directionsRenderer.setDirections(result);

                    const locations = [
                        { lat: 45.6306, lng: 8.7281, name: "Aeroporto Internacional de Milão Malpensa", label: "A" },
                        { lat: 46.2381, lng: 6.1089, name: "Aeroporto Internacional de Genebra", label: "B" },
                        { lat: 43.9517, lng: 6.5071, name: "Saint-André-les-Alpes", label: "C" },
                        { lat: 44.3335, lng: 5.7549, name: "Laragne - Montagne de Chabre", label: "D" },
                        { lat: 46.7403, lng: 13.1716, name: "Greifenburg - Emberger Alm", label: "E" },
                        { lat: 47.6719, lng: 12.4085, name: "Kössen - Unterberghorn", label: "F" },
                        { lat: 47.5717, lng: 10.7498, name: "Tegelberg - Füssen", label: "G" },
                        { lat: 45.7936, lng: 11.7402, name: "Bassano - Monte Grappa", label: "H" },
                    ];

                    locations.forEach((location) => {
                        const marker = new Marker({
                            position: { lat: location.lat, lng: location.lng },
                            map: map,
                            title: location.name,
                            label: {
                                text: location.label,
                                color: "black",
                                fontWeight: "bold",
                            },
                        });
                        markersRef.current.push(marker);

                        const infoWindow = new google.maps.InfoWindow({
                            content: `<div style="color: black; padding: 5px;"><strong>${location.name}</strong></div>`,
                        });

                        marker.addListener("click", () => {
                            infoWindow.open(map, marker);
                        });
                    });

                    const totalDistance = result.routes[0].legs.reduce((total, leg) => total + (leg.distance?.value || 0), 0) / 1000;
                    const totalTime = Math.round(result.routes[0].legs.reduce((total, leg) => total + (leg.duration?.value || 0), 0) / 3600);

                    const infoDiv = document.getElementById("route-info");
                    if (infoDiv) {
                        infoDiv.innerHTML = `<p><strong>Distância Total:</strong> ${totalDistance.toFixed(1)} km</p>
                                   <p><strong>Tempo Estimado (Dirigindo):</strong> ${totalTime} horas</p>`;
                    }
                } else {
                    console.error("Directions request failed:", status);
                }
            });
        } catch (error) {
            console.error("Error initializing map:", error);
        }
    };

    const focusOnLocation = (index: number) => {
        if (markersRef.current[index]) {
            const marker = markersRef.current[index];
            const map = marker.getMap() as google.maps.Map;
            if (map) {
                const position = marker.getPosition();
                if (position) {
                    map.setCenter(position);
                    map.setZoom(10);
                    google.maps.event.trigger(marker, "click");
                }
            }
        }
    };

    return (
        <>
            <Header />
            <Script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5iBI5SCLnJ4Aw-yUSs-NDG5AkMJwcVJA&loading=async&v=weekly"
                onLoad={() => initMap()}
            />

            <main className="main-content">
                <section className="content-section" data-aos="fade-up">
                    <h2 className="section-title">
                        <FaRoute className="mr-2 icon" /> Roteiro de Viagem
                    </h2>
                    <p className="section-description">
                        Explore o trajeto de carro pelos Alpes Europeus, começando e terminando no Aeroporto Internacional de Milão Malpensa (Itália).
                    </p>
                </section>

                <section className="content-section" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="section-title">
                        <FaMapMarkedAlt className="mr-2 icon" /> Pontos do Trajeto
                    </h2>
                    <div className="map-section">
                        <div className="sidebar">
                            <h3>
                                <FaListUl className="inline mr-2 icon" /> Paradas
                            </h3>
                            <ul>
                                {[
                                    { label: "A", name: "Aeroporto Internacional de Milão Malpensa" },
                                    { label: "B", name: "Aeroporto Internacional de Genebra" },
                                    { label: "C", name: "Saint-André-les-Alpes" },
                                    { label: "D", name: "Laragne - Montagne de Chabre" },
                                    { label: "E", name: "Greifenburg - Emberger Alm" },
                                    { label: "F", name: "Kössen - Unterberghorn" },
                                    { label: "G", name: "Tegelberg - Füssen" },
                                    { label: "H", name: "Bassano - Monte Grappa" },
                                    { label: "I", name: "Aeroporto Internacional de Milão Malpensa" },
                                ].map((stop, index) => (
                                    <li key={index} data-label={stop.label} onClick={() => focusOnLocation(index)}>
                                        {stop.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="map-container-wrapper">
                            <div id="info" className="info-box">
                                <h3 className="info-title">Resumo</h3>
                                <p className="mb-2">Conectando pontos icônicos para parapente nos Alpes.</p>
                                <div id="route-info"></div>
                            </div>
                            <div ref={mapRef} id="map" style={{ height: "600px", width: "100%", borderRadius: "12px" }}></div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
        .main-content {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .content-section {
            margin-bottom: 3rem;
        }
        .section-title {
            font-size: 2rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            color: var(--accent-gold);
        }
        :global(.icon) {
            margin-right: 0.5rem;
        }
        .map-section {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        .sidebar {
          background: var(--glass-bg);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid var(--glass-border);
          height: fit-content;
        }

        .sidebar h3 {
          color: var(--accent-gold);
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .sidebar ul {
          list-style: none;
        }

        .sidebar li {
          padding: 1rem;
          margin-bottom: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          padding-left: 3rem;
        }

        .sidebar li:hover {
          background: rgba(212, 175, 55, 0.1);
          transform: translateX(5px);
        }

        .sidebar li::before {
          content: attr(data-label);
          background: var(--accent-gold);
          color: #000;
          font-weight: 700;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          position: absolute;
          left: 10px;
        }

        .map-container-wrapper {
            width: 100%;
        }

        .info-box {
            margin-bottom: 1rem;
            padding: 1rem;
            background: rgba(42, 107, 255, 0.1);
            border-left: 4px solid #2A6BFF;
            border-radius: 0.25rem;
        }
        .info-title {
            color: #2A6BFF;
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
            font-weight: bold;
        }
        
        .section-description {
            font-size: 1.125rem;
            line-height: 1.75;
            color: var(--text-dim);
        }

        @media (max-width: 768px) {
          .map-section {
            grid-template-columns: 1fr;
          }
          #map {
            height: 400px !important;
          }
        }
      `}</style>
        </>
    );
}
