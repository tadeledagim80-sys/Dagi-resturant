import { useState, useEffect } from "react";
import { MapPin, Navigation, Info } from "lucide-react";

interface MapPickerProps {
  onLocationSelected: (location: { lat: number; lng: number }, address: string) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function MapPicker({ onLocationSelected, initialLocation }: MapPickerProps) {
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>(
    initialLocation || { lat: 9.0300, lng: 38.7400 } // Addis Ababa default coordinates for DAGI Restaurant
  );
  const [address, setAddress] = useState("DAGI Luxury HQ, Bole Road, Addis Ababa");
  const [isLocating, setIsLocating] = useState(false);
  const [locatingError, setLocatingError] = useState<string | null>(null);

  // Address reverse geocoding mock / real
  const handleAddressLookup = (lat: number, lng: number) => {
    // Generate an elegant address based on coordinates for Addis Ababa context
    const boleBeauties = [
      "Bole Road, Premium Square Block C",
      "Megenagna Avenue, Royal Tower, Floor 1",
      "Kazanchis Business Quarter, Prime Tower 12",
      "Sarbet Luxury Residential Zone, Villa 4",
      "Piassa Historical District, Golden Crown Suite",
      "CMC Luxury Villas Estate, Block A",
    ];
    const index = Math.abs(Math.floor(lat * 1000 + lng * 1000)) % boleBeauties.length;
    const generatedAddress = `${boleBeauties[index]} (Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)})`;
    setAddress(generatedAddress);
    onLocationSelected({ lat, lng }, generatedAddress);
  };

  // Trigger browser Geolocation
  const handleGetGeolocation = () => {
    if (!navigator.geolocation) {
      setLocatingError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocatingError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(newCoords);
        handleAddressLookup(newCoords.lat, newCoords.lng);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation Error: ", error);
        setLocatingError("Could not detect location. Please select on the map manually.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Setup default location on mount
  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
    } else {
      handleAddressLookup(markerPosition.lat, markerPosition.lng);
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Geolocation Trigger & Address Display */}
      <div className="bg-dagi-black border border-gold/15 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="flex-grow min-w-0">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-gold">Selected Delivery Point</h5>
            <p className="text-sm text-gray-300 mt-1 truncate" id="delivery-address-text">
              {address}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGetGeolocation}
          disabled={isLocating}
          className="px-4 py-2 bg-gradient-to-r from-gold-dark to-gold hover:from-dagi-red hover:to-dagi-red text-dagi-black hover:text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer disabled:opacity-50"
          id="geolocation-btn"
        >
          <Navigation className={`w-3.5 h-3.5 ${isLocating ? "animate-spin" : ""}`} />
          <span>{isLocating ? "Locating..." : "Use My Location"}</span>
        </button>
      </div>

      {locatingError && (
        <p className="text-[11px] text-dagi-red-light font-medium">{locatingError}</p>
      )}

      {/* Map Frame Container */}
      <div className="relative h-64 rounded-2xl overflow-hidden border border-gold/20 shadow-inner bg-dagi-gray-dark flex flex-col items-center justify-center">
        {/* Mock Premium Delivery Grid Map with interactive plot coordinates */}
        <div className="absolute inset-0 bg-dagi-black flex flex-col justify-between p-4">
          {/* Elegant Background Radar Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <div className="absolute w-56 h-56 rounded-full border border-gold animate-pulse"></div>
            <div className="absolute w-40 h-40 rounded-full border border-dagi-red"></div>
            <div className="absolute w-20 h-20 rounded-full border border-gold"></div>
            <div className="w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>

          {/* Simulated Interactive Map Elements */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="bg-dagi-gray-dark/95 border border-gold/20 rounded-xl p-2.5 shadow-md max-w-[220px]">
                <div className="flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Interactive Delivery Grid</span>
                </div>
                <p className="text-[9px] text-gray-400 mt-1 leading-relaxed">
                  Interactive DAGI Delivery coordinates loaded. Tap anywhere on the radar zone to position your exact delivery dispatch pointer.
                </p>
              </div>

              <div className="bg-dagi-gray-dark/90 border border-gold/15 px-2.5 py-1 rounded-lg text-[9px] text-gray-300 font-mono">
                LAT: {markerPosition.lat.toFixed(4)} | LNG: {markerPosition.lng.toFixed(4)}
              </div>
            </div>

            {/* Grid clicks trigger manual relocation */}
            <div 
              className="absolute inset-0 cursor-crosshair z-0" 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Convert click percentage to pseudo-coordinates around Addis Ababa
                const pctX = x / rect.width;
                const pctY = y / rect.height;
                
                const targetLat = 9.03 + (0.5 - pctY) * 0.05;
                const targetLng = 38.74 + (pctX - 0.5) * 0.05;
                
                const clickedCoords = { lat: targetLat, lng: targetLng };
                setMarkerPosition(clickedCoords);
                handleAddressLookup(targetLat, targetLng);
              }}
            ></div>

            {/* Pin representation */}
            <div 
              className="absolute z-20 flex flex-col items-center pointer-events-none transition-all duration-300"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -100%)"
              }}
            >
              <MapPin className="w-8 h-8 text-dagi-red fill-dagi-red animate-bounce" />
              <div className="w-2.5 h-1 bg-black/60 rounded-full blur-[2px] mt-1"></div>
            </div>

            {/* Instruction footnote */}
            <div className="mt-auto self-center z-10">
              <span className="text-[9px] text-gold/80 font-bold uppercase tracking-widest bg-dagi-gray-dark/90 px-3 py-1 rounded-full border border-gold/10">
                Click anywhere to set dispatcher destination
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
