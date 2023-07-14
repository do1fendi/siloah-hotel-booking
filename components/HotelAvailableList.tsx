import useCurrencyStore from "@/store/currency";
import useLangStore from "@/store/lang";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface IHotelAvailable {
  data: any | null;
}

export default function HotelAvailableList({ data }: IHotelAvailable) {
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const animateRef = useRef<HTMLDivElement>(null);
  const param = useSearchParams();

  useEffect(() => {
    if (data! != null && animateRef.current) {
      for (const child of animateRef.current.children) {
        child.classList.remove("scale-0");
        child.classList.add("scale-100");
      }
    }
  }, [data]);

  return (
    <>
      {data !== null &&
        data.GetHotelAvailRS &&
        data.GetHotelAvailRS.HotelAvailInfos && (
          <div ref={animateRef} className="mt-8 flex flex-col gap-5 p-2 lg:p-0">
            {data.GetHotelAvailRS.HotelAvailInfos.HotelAvailInfo.map(
              (dt: any, i: number) => (
                <div
                  className="w-full border border-teal-500 rounded p-5 transform transition-all duration-700 ease-out scale-0"
                  key={dt.HotelInfo.HotelCode}
                >
                  <div>
                    <p className="text-xl font-bold">
                      {dt.HotelInfo.HotelName}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-sm">
                      {dt.HotelRateInfo.Rooms
                        ? dt.HotelRateInfo.Rooms.Room[0].RatePlans.RatePlan[0]
                            .RatePlanName
                        : ""}
                    </p>
                    <p>
                      {currency === "TWD" ? "NT$ " : "$ "}
                      <span>
                        {dt.HotelRateInfo.RateInfos.ConvertedRateInfo.length > 0
                          ? dt.HotelRateInfo.RateInfos.ConvertedRateInfo[0].AmountAfterTax.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          : dt.HotelRateInfo.RateInfos.RateInfo &&
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
                      <button className="bg-teal-500 hover:bg-teal-400 text-gray-100 mt-5 text-md px-3 py-[2px] rounded">
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
    </>
  );
}
