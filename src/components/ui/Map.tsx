import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cn } from '@/lib/utils';

// Custom icon using the CSS we added to index.css
const customIcon = new L.DivIcon({
    className: 'custom-map-marker',
    html: `<div class="marker-pulse"></div><div class="marker-pin"></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 48], // Tip of the pin (approx 28px from center)
    popupAnchor: [0, -48] // Popup above the pin
});

interface MapProps {
    className?: string;
}

export default function Map({ className }: MapProps) {
    const [isMounted, setIsMounted] = useState(false);
    const position: [number, number] = [18.678455, 73.8203]; // Luxury Square, Chikhali (User Provided Correction)

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className={cn("w-full h-full bg-secondary/30 flex items-center justify-center", className)}>
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className={cn("w-full h-full relative z-0", className)}>
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
                // Ensure proper z-indexing so it doesn't overlap header/menus
                style={{ zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={position} icon={customIcon}>
                    <Popup className="font-serif">
                        <div className="text-center p-1">
                            <h3 className="font-bold text-base mb-0.5 text-primary">Real Abodes</h3>
                            <p className="text-xs text-muted-foreground">Luxury Square, Chikhali</p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Helper text/overlay if needed */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-sm text-xs text-muted-foreground z-[1000] pointer-events-none">
                Click marker for details
            </div>
        </div>
    );
}
