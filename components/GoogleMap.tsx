"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
// // import { useRouter } from "next/navigation";
// import useUserStore from "@/store/user";
// import useRouteListStore from "@/store/routeList";
// // import { usePathname } from "next/navigation";
import { Loader } from "@googlemaps/js-api-loader";

interface IGoogleMapProps {
  showMap: Boolean;
  closeMap: () => void;
  lat: number;
  lng: number;
}

type InitMapType = {
  showMap: Boolean;
  lat: number;
  lng: number;
};

export default function GoogleMap({
  showMap,
  closeMap,
  lat,
  lng,
}: IGoogleMapProps) {
  const [initMap, setInitMap] = useState<InitMapType>({
    showMap: false,
    lat: 0,
    lng: 0,
  });
  const loader = new Loader({
    apiKey: "AIzaSyCviXyqFGkEvyasGss4RE9ML8Y7_hAfKk8",
    version: "weekly",
  });

  loader.load().then(async () => {
    if (document.getElementById("map")) {
      const { Map } = await (window as any).google.maps.importLibrary("maps");
      const map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: initMap.lat, lng: initMap.lng },
        zoom: 15,
      });
      new (window as any).google.maps.Marker({
        position: { lat: initMap.lat, lng: initMap.lng },
        map,
        title: "Hello World!",
      });
    }
  });

  useEffect(() => {
    setInitMap({ showMap: showMap, lat: lat, lng: lng });
  }, [showMap]);
  return (
    <>
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=default"
        strategy="lazyOnload"
      />
      {showMap && (
        <div className="fixed top-0 left-0 right-0 w-full h-screen bg-white">
          <div className="flex justify-end p-5">
            <button onClick={closeMap}>x</button>
          </div>
          <div id="map" className="w-full h-full"></div>
        </div>
      )}
    </>
  );
}
