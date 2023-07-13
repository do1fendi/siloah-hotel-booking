// import useCurrencyStore from "@/store/currency";
import useLangStore from "@/store/lang";
import { useRef, useEffect, useState } from "react";
import useCurrencyStore from "@/store/currency";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import useDictionaryStore from "@/store/dictionary";

interface IHotelRoom {
  data: any | null;
}

type expandType = boolean[];

export default function HotelRoomList({ data }: IHotelRoom) {
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const animateRef = useRef<HTMLDivElement>(null);
  // const param = useSearchParams();
  const { dictionary } = useDictionaryStore((state) => state);
  const [expand, setExpand] = useState<expandType | null>(null);

  useEffect(() => {
    if (data! != null && animateRef.current) {
      for (const child of animateRef.current.children) {
        child.classList.remove("scale-0");
        child.classList.add("scale-100");
      }
    }
    // console.log(expand);
    // expand init
    if (data! != null && animateRef.current) {
      const tmpExpand: any = [];
      for (let i = 0; i < animateRef.current.children.length; i++)
        tmpExpand[i] = false;

      // setExpand((prev) => {
      //   prev = tmpExpand;
      //   console.log(prev);
      //   return prev;
      // });
    }
  }, [data]);

  // const onExpand = (ind: number) => {
  //   animateRef!.current!.children[ind].classList.remove("h-1/2");
  //   const tmpExpand = expand?.map((exp, i) => (i === ind ? true : exp));

  //   setExpand((prev) => {
  //     prev = tmpExpand!;
  //     console.log("expand", prev);
  //     return prev;
  //   });
  // };

  return (
    <>
      {data !== null && (
        <div ref={animateRef} className="mt-8 flex flex-col gap-5 lg:p-0">
          {data.map((dt: any, index: number) => (
            <div
              key={index}
              className="relative w-full shadow shadow-teal-500 p-2 lg:p-5 transform transition-all duration-700 ease-out scale-0"
            >
              <h2 className="text-lg font-bold uppercase text-teal-600 underline">
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

              <div className="flex flex-col gap-5 mt-5">
                {dt.roomList.slice(0,4).map((rm: any, i: number) => (
                  <div
                    className="rounded p-2 bg-gray-100 flex flex-col lg:flex-row justify-between gap-5"
                    key={i}
                  >
                    <div className="w-full">
                      <p>
                        {rm.RoomDescription.Name} - {rm.RoomViewDescription}
                      </p>
                    </div>
                    <div className="bg-white p-2">
                      <p className="text-right text-pink-700 w-full lg:w-[120px]">
                        <span className="text-xs">
                          {currency === "TWD" ? "NT$ " : "$ "}
                        </span>
                        <span className="text-2xl">
                          {rm.AmountAfterTax.toString().replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </span>
                      </p>
                      <button className="w-full bg-orange-500 hover:bg-orange-400 text-gray-100 text-sm p-2">{lang==="TW"?"預訂":"Reserve"}</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="absolute -bottom-3 right-8">
                {" "}
                <button onClick={() => onExpand(index)}>Press</button>
              </div> */}
            </div>
          ))}
          {/* {JSON.stringify(data)} */}
        </div>
      )}
    </>
  );
}
