"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import AOS from "aos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaRoute, FaMapMarkedAlt, FaListUl } from "react-icons/fa";

export default function Alpes2026() {
    const mapRef = useRef<HTMLDivElement>(null);
    // Use 'any' for markers array to avoid TypeScript issues with AdvancedMarkerElement types if not fully updated
    const markersRef = useRef<any[]>([]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }, []);

    const initMap = () => {
        console.log("initMap called - Route Update v2");
        if (!mapRef.current) {
            console.error("Map ref is null");
            return;
        }

        if (typeof google === "undefined" || !google.maps) {
            console.error("Google Maps API not loaded yet");
            return;
        }

        try {
            console.log("Creating map instance...");
            const map = new google.maps.Map(mapRef.current, {
                zoom: 6,
                center: { lat: 45.6306, lng: 8.7281 },
                mapId: "a70c3e6549f5f3877cc8a060", // User provided Map ID
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: false,
            });

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                polylineOptions: {
                    strokeColor: "#d4af37",
                    strokeWeight: 5,
                },
                suppressMarkers: true,
            });

            const waypoints = [
                { location: { lat: 45.7936, lng: 11.7402 }, stopover: true }, // Bassano
                { location: { lat: 46.7403, lng: 13.1716 }, stopover: true }, // Greifenburg
                { location: { lat: 47.6719, lng: 12.4085 }, stopover: true }, // Kössen
                { location: { lat: 47.5717, lng: 10.7498 }, stopover: true }, // Tegelberg
                { location: { lat: 44.3335, lng: 5.7549 }, stopover: true }, // Laragne
                { location: { lat: 43.9517, lng: 6.5071 }, stopover: true }, // Saint-André
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
                        { lat: 45.7936, lng: 11.7402, name: "Bassano - Monte Grappa", label: "B" },
                        { lat: 46.7403, lng: 13.1716, name: "Greifenburg - Emberger Alm", label: "C" },
                        { lat: 47.6719, lng: 12.4085, name: "Kössen - Unterberghorn", label: "D" },
                        { lat: 47.5717, lng: 10.7498, name: "Tegelberg - Füssen", label: "E" },
                        { lat: 44.3335, lng: 5.7549, name: "Laragne - Montagne de Chabre", label: "F" },
                        { lat: 43.9517, lng: 6.5071, name: "Saint-André-les-Alpes", label: "G" },
                    ];

                    // Clear existing markers
                    markersRef.current = [];

                    locations.forEach((location) => {
                        // Check if AdvancedMarkerElement is available
                        if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
                            const pin = new google.maps.marker.PinElement({
                                glyphText: location.label, // Updated from glyph to glyphText
                                background: "#d4af37",
                                borderColor: "#000000",
                                glyphColor: "#000000",
                            } as any);

                            const marker = new google.maps.marker.AdvancedMarkerElement({
                                position: { lat: location.lat, lng: location.lng },
                                map: map,
                                title: location.name,
                                content: pin.element,
                            });
                            markersRef.current.push(marker);

                            const infoWindow = new google.maps.InfoWindow({
                                content: `<div style="color: black; padding: 5px;"><strong>${location.name}</strong></div>`,
                            });

                            marker.addListener("click", () => {
                                infoWindow.open(map, marker);
                            });
                        } else {
                            // Fallback to legacy Marker if AdvancedMarkerElement is not loaded
                            console.warn("AdvancedMarkerElement not found, falling back to legacy Marker");
                            const marker = new google.maps.Marker({
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
                        }
                    });

                    // Alternative Locations (Blue Markers)
                    // Alternative Locations (Blue Markers)
                    const alternativeLocations = [
                        { lat: 45.782167, lng: 10.817833, name: "Pouso Monte Baldo - Malcesine", label: "Garda" },
                        { lat: 46.4766, lng: 11.7435, name: "Pouso Col Rodella - Campitello", label: "Dolomitas" },
                        { lat: 46.686409, lng: 7.859877, name: "Pouso Interlaken - Höhematte", label: "Interlaken" },
                        { lat: 45.780833, lng: 6.221944, name: "Pouso Annecy - Doussard", label: "Annecy" },
                    ];

                    alternativeLocations.forEach((location) => {
                        if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
                            // Create a container for Pin + Label
                            const container = document.createElement("div");
                            container.style.display = "flex";
                            container.style.alignItems = "center";
                            container.style.gap = "5px";
                            container.style.cursor = "pointer";

                            const pin = new google.maps.marker.PinElement({
                                glyph: "", // No text inside the pin
                                background: "#2A6BFF", // Blue
                                borderColor: "#000000",
                                glyphColor: "#FFFFFF",
                                scale: 0.8,
                            } as any);

                            const labelSpan = document.createElement("span");
                            labelSpan.textContent = location.label;
                            labelSpan.style.color = "#2A6BFF";
                            labelSpan.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                            labelSpan.style.padding = "2px 6px";
                            labelSpan.style.borderRadius = "4px";
                            labelSpan.style.fontSize = "12px";
                            labelSpan.style.fontWeight = "bold";
                            labelSpan.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                            labelSpan.style.border = "1px solid #2A6BFF";

                            container.appendChild(pin.element);
                            container.appendChild(labelSpan);

                            const marker = new google.maps.marker.AdvancedMarkerElement({
                                position: { lat: location.lat, lng: location.lng },
                                map: map,
                                title: location.name,
                                content: container,
                            });
                            markersRef.current.push(marker);

                            const infoWindow = new google.maps.InfoWindow({
                                content: `<div style="color: black; padding: 5px;"><strong>${location.name}</strong><br/><span style="color: #2A6BFF;">Pouso Alternativo</span></div>`,
                            });

                            marker.addListener("click", () => {
                                infoWindow.open(map, marker);
                            });
                        } else {
                            // Fallback for legacy marker (no side label support easily, just standard marker)
                            const marker = new google.maps.Marker({
                                position: { lat: location.lat, lng: location.lng },
                                map: map,
                                title: location.name,
                                label: {
                                    text: location.label[0], // Just first letter for legacy
                                    color: "white",
                                    fontWeight: "bold",
                                },
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 10,
                                    fillColor: "#2A6BFF",
                                    fillOpacity: 1,
                                    strokeWeight: 1,
                                    strokeColor: "white",
                                },
                            });
                            markersRef.current.push(marker);

                            const infoWindow = new google.maps.InfoWindow({
                                content: `<div style="color: black; padding: 5px;"><strong>${location.name}</strong><br/><span style="color: #2A6BFF;">Pouso Alternativo</span></div>`,
                            });

                            marker.addListener("click", () => {
                                infoWindow.open(map, marker);
                            });
                        }
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
            // Handle both AdvancedMarkerElement (map property) and legacy Marker (getMap() method)
            let map: google.maps.Map | null | undefined;
            let position: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined;

            if ('map' in marker) {
                // AdvancedMarkerElement
                map = marker.map as google.maps.Map;
                position = marker.position;
            } else {
                // Legacy Marker
                map = marker.getMap();
                position = marker.getPosition();
            }

            if (map && position) {
                map.setCenter(position);
                map.setZoom(10);
                google.maps.event.trigger(marker, "click");
            }
        }
    };

    return (
        <>
            <Header />
            {/* Added libraries=marker to load the marker library synchronously */}
            <Script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5iBI5SCLnJ4Aw-yUSs-NDG5AkMJwcVJA&libraries=marker&v=weekly"
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
                                    { label: "B", name: "Bassano - Monte Grappa" },
                                    { label: "C", name: "Greifenburg - Emberger Alm" },
                                    { label: "D", name: "Kössen - Unterberghorn" },
                                    { label: "E", name: "Tegelberg - Füssen" },
                                    { label: "F", name: "Laragne - Montagne de Chabre" },
                                    { label: "G", name: "Saint-André-les-Alpes" },
                                    { label: "A", name: "Aeroporto Internacional de Milão Malpensa" },
                                ].map((stop, index) => (
                                    <li key={index} data-label={stop.label} onClick={() => focusOnLocation(index === 7 ? 0 : index)}>
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
