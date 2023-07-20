import useCurrencyStore from "@/store/currency";
import useLangStore from "@/store/lang";
import useDictionaryStore from "@/store/dictionary";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GoogleMap from "./GoogleMap";
import { FaLocationDot } from "react-icons/fa6";

interface IHotelAvailable {
  data: any | null;
}

type initMapType = {
  showMap: boolean;
  lat: number;
  lng: number;
};

export default function HotelAvailableList({ data }: IHotelAvailable) {
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const { dictionary } = useDictionaryStore((state) => state);
  const animateRef = useRef<HTMLDivElement>(null);
  const param = useSearchParams();
  const [initMap, setInitMap] = useState<initMapType>({
    showMap: false,
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (data! != null && animateRef.current) {
      for (const child of animateRef.current.children) {
        child.classList.remove("scale-0");
        child.classList.add("scale-100");
      }
    }
  }, [data]);

  const onShowMap = (lat: number, lng: number) => {
    setInitMap({ showMap: true, lat, lng });
  };

  return (
    <>
      {data &&
        data !== null &&
        data.GetHotelAvailRS &&
        data.GetHotelAvailRS.HotelAvailInfos && (
          <div ref={animateRef} className="mt-8 flex flex-col gap-5 p-2 lg:p-0">
            {data.GetHotelAvailRS.HotelAvailInfos.HotelAvailInfo.filter((filtered:any) => filtered.HotelRateInfo).map(
              (dt: any, i: number) => (
                <div
                  className="w-full border border-luxgreen hover:shadow-lg shadow-luxgreen p-2 lg:p-5 transform transition-all duration-700 ease-out scale-0"
                  key={dt.HotelInfo.HotelCode}
                >
                  <div>
                    <p className="flex flex-col items-start">
                      <span className="text-xl font-bold">
                        {dt.HotelInfo.HotelName}{" "}
                        <button
                          onClick={() =>
                            onShowMap(
                              parseFloat(dt.HotelInfo.LocationInfo.Latitude),
                              parseFloat(dt.HotelInfo.LocationInfo.Longitude)
                            )
                          }
                        >
                          <FaLocationDot size={16} className="text-orange-500 scale-10 hover:scale-125"/>
                        </button>
                      </span>
                      {dt.HotelInfo.PropertyQualityInfo &&
                        dt.HotelInfo.PropertyQualityInfo.PropertyQuality && (
                          <span className="bg-teal-500 text-gray-100 rounded-lg text-xs lg:text-sm px-2 py-[2px]">
                            {lang === "TW"
                              ? dictionary.propertyQuality.filter(
                                  (dict) =>
                                    dict.code ===
                                    dt.HotelInfo.PropertyQualityInfo
                                      .PropertyQuality[0].Code
                                )[0].tw
                              : dictionary.propertyQuality.filter(
                                  (dict) =>
                                    dict.code ===
                                    dt.HotelInfo.PropertyQualityInfo
                                      .PropertyQuality[0].Code
                                )[0].en}
                          </span>
                        )}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-sm capitalize">
                      {dt.HotelRateInfo && dt.HotelRateInfo.Rooms
                        ? dt.HotelRateInfo.Rooms.Room[0].RatePlans.RatePlan[0].RatePlanName.toString().toLowerCase()
                        : ""}
                    </p>
                    <p className="min-w-[80px]">
                      {currency === "TWD" ? "NT$ " : "$ "}
                      <span>
                        {dt.HotelRateInfo &&
                        dt.HotelRateInfo.RateInfos.ConvertedRateInfo.length > 0
                          ? dt.HotelRateInfo.RateInfos.ConvertedRateInfo[0].AmountAfterTax.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          : dt.HotelRateInfo &&
                            dt.HotelRateInfo.RateInfos.RateInfo &&
                            dt.HotelRateInfo.RateInfos.RateInfo[0].AmountAfterTax.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      target="_blank"
                      href={{
                        pathname: "/hotel",
                        query: {
                          searchCode: dt.HotelInfo.HotelCode,
                          room: parseInt(param.get("room")!),
                          adult: parseInt(param.get("adult")!),
                          children: parseInt(param.get("children")!),
                          childAges: param.get("childAges")!,
                          checkIn: param.get("checkIn")!,
                          checkOut: param.get("checkOut")!,
                          currency: currency,
                          lang: lang,
                        },
                      }}
                    >
                      <button className="bg-luxorange hover:bg-orange-500 text-gray-100 mt-5 text-md px-3 py-[2px] rounded">
                        {lang === "TW"
                          ? "查看客房供應情況 >"
                          : "See avaibility >"}
                      </button>
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      <GoogleMap
        showMap={initMap.showMap}
        lat={initMap.lat}
        lng={initMap.lng}
        closeMap={() => setInitMap({ ...initMap, showMap: false })}
      />
    </>
  );
}
