// import useCurrencyStore from "@/store/currency";
import useLangStore from "@/store/lang";
import { useRef, useEffect } from "react";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import useDictionaryStore from "@/store/dictionary";

interface IHotelRoom {
  data: any | null;
}

export default function HotelRoomList({ data }: IHotelRoom) {
  // const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const animateRef = useRef<HTMLDivElement>(null);
  // const param = useSearchParams();
  const { dictionary } = useDictionaryStore((state) => state);

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
      {data !== null && (
        <div ref={animateRef} className="mt-8 flex flex-col gap-5 lg:p-0">
          {data.map((dt: any, index: number) => (
            <div
              key={index}
              className="w-full border border-teal-500 rounded p-2 lg:p-5 transform transition-all duration-700 ease-out scale-0"
            >
              <h2 className="text-lg">
                {lang === "TW"
                  ? dt.roomType !== undefined &&
                    dictionary.roomType.filter(
                      (dict) => dict.code === dt.roomType
                    )[0].tw
                  : dt.roomType !== undefined &&
                    dictionary.roomType.filter(
                      (dict) => dict.code === dt.roomType
                    )[0].en}
              </h2>
            </div>
          ))}
          {/* {JSON.stringify(data)} */}
        </div>
      )}
    </>
  );
}
