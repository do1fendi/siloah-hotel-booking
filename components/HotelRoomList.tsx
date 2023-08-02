"use client";
// import useCurrencyStore from "@/store/currency";
import useLangStore from "@/store/lang";
import { useRef, useEffect, useState } from "react";
import useCurrencyStore from "@/store/currency";
// import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import useDictionaryStore from "@/store/dictionary";
import { MdBed } from "react-icons/md";
import Link from "next/link";
import useCartStore from "@/store/cart";
import { decode } from "js-base64";

interface IHotelRoom {
  data: any | null;
}
type queryParam = {
  room: number;
  adult: number;
  children: number;
  checkIn: string;
  checkOut: string;
  rateKey: string;
  lang: string;
};

type expandType = boolean[];

export default function HotelRoomList({ data }: IHotelRoom) {
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const animateRef = useRef<HTMLDivElement>(null);
  const param = useSearchParams();
  const { dictionary } = useDictionaryStore((state) => state);
  const [expand, setExpand] = useState<expandType | null>(null);
  const router = useRouter();
  const { cartData, setCartData } = useCartStore();
  const [queryParam, setQueryParam] = useState<queryParam>({
    room: 0,
    adult: 0,
    children: 0,
    checkIn: "",
    checkOut: "",
    rateKey: "",
    lang: "",
  });

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

  useEffect(() => {
    setQueryParam({
      room: parseInt(param.get("room")!),
      adult: parseInt(param.get("adult")!),
      children: parseInt(param.get("children")!),
      checkIn: param.get("checkIn")!,
      checkOut: param.get("checkOut")!,
      rateKey: "",
      lang: param.get("lang")!,
    });
  }, [param]);

  // const onExpand = (ind: number) => {
  //   animateRef!.current!.children[ind].classList.remove("h-1/2");
  //   const tmpExpand = expand?.map((exp, i) => (i === ind ? true : exp));

  //   setExpand((prev) => {
  //     prev = tmpExpand!;
  //     console.log("expand", prev);
  //     return prev;
  //   });
  // };

  const goBooking = (rateKey: string) => {
    const ret = btoa(JSON.stringify({ ...queryParam, rateKey: rateKey }));
    return ret;
  };

  type cartData = {
    hotelName: string;
    roomType: string;
    ratePlanName: string;
    rateKey: string;
    price: number;
    checkIn: string;
    checkOut: string;
    selected: boolean;
    noOfRoom: number;
  };
  const addToCart = (dt: cartData) => {
    // set cart, if cartData not null use spread operator to add new data otherwise without spread operator
    console.log("cart", dt);
    if (cartData !== "") {
      setCartData(
        JSON.stringify([
          ...JSON.parse(decode(cartData)),
          {
            hotelName: dt.hotelName,
            roomType: dt.roomType,
            ratePlanName: dt.ratePlanName,
            rateKey: dt.rateKey,
            price: dt.price,
            checkIn: dt.checkIn,
            checkOut: dt.checkOut,
            selected: dt.selected,
            noOfRoom: dt.noOfRoom,
          },
        ])
      );
    } else {
      setCartData(
        JSON.stringify([
          {
            hotelName: dt.hotelName,
            roomType: dt.roomType,
            ratePlanName: dt.ratePlanName,
            rateKey: dt.rateKey,
            price: dt.price,
            checkIn: dt.checkIn,
            checkOut: dt.checkOut,
            selected: dt.selected,
            noOfRoom: dt.noOfRoom,
          },
        ])
      );
    }
  };

  return (
    <>
      {data !== null && (
        <div ref={animateRef} className="flex flex-col gap-5 lg:p-0">
          {data.map((dt: any, index: number) => (
            <div
              key={index}
              className="relative w-full shadow shadow-luxgreen p-2 lg:p-5 transform transition-all duration-700 ease-out scale-0"
            >
              <h2 className="text-lg font-bold uppercase text-luxgreen">
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
              {/* Room List */}
              <div className="flex flex-col gap-5 mt-5">
                {dt.roomList.slice(0, 4).map((rm: any, i: number) => (
                  <div
                    className="rounded p-2 bg-gray-100 flex flex-col lg:flex-row justify-between gap-5 shadow"
                    key={i}
                  >
                    <div className="w-full flex flex-col gap-2">
                      <p className="capitalize flex flex-col lg:flex-row justify-start items-start lg:items-center lg:gap-2">
                        <span className="font-semibold capitalize">
                          {rm.RoomDescription.Name.toLowerCase()}
                        </span>{" "}
                        {/* {rm.RoomViewDescription && (
                          <span className="bg-teal-500 text-gray-100 rounded-lg text-xs px-2 py-[2px]">
                            {rm.RoomViewDescription}
                          </span>
                        )} */}
                        {rm.RoomViewCode && (
                          <span className="bg-teal-500 text-gray-100 rounded-lg text-xs px-2 py-[2px]">
                            {lang === "TW"
                              ? dictionary.roomView.filter(
                                  (dc: any) => dc.code === rm.RoomViewCode
                                )[0].tw
                              : dictionary.roomView.filter(
                                  (dc: any) => dc.code === rm.RoomViewCode
                                )[0].en}
                          </span>
                        )}
                      </p>

                      {rm.BedTypeOptions &&
                        rm.BedTypeOptions.BedTypes &&
                        rm.BedTypeOptions.BedTypes[0].BedType && (
                          <p className="flex gap-2 items-center text-sm">
                            <MdBed size={16} />
                            <span>
                              {rm.BedTypeOptions.BedTypes[0].BedType[0].Count}{" "}
                              {""}
                              {lang === "TW"
                                ? dictionary.bedType.filter(
                                    (e) =>
                                      e.code ===
                                      rm.BedTypeOptions.BedTypes[0].BedType[0]
                                        .Code
                                  )[0].tw
                                : dictionary.bedType.filter(
                                    (e) =>
                                      e.code ===
                                      rm.BedTypeOptions.BedTypes[0].BedType[0]
                                        .Code
                                  )[0].en}
                            </span>
                          </p>
                        )}
                      <p className="text-sm flex gap-2">
                        {rm.RatePlans.RatePlan &&
                          rm.RatePlans.RatePlan[0].MealsIncluded &&
                          rm.RatePlans.RatePlan[0].MealsIncluded
                            .MealPlanCode && (
                            <span className="border border-gray-300 px-2 py-[3px]">
                              {lang === "TW"
                                ? dictionary.mealPlan.filter(
                                    (meal: any) =>
                                      meal.code ==
                                      rm.RatePlans.RatePlan[0].MealsIncluded
                                        .MealPlanCode
                                  )[0].tw
                                : dictionary.mealPlan.filter(
                                    (meal: any) =>
                                      meal.code ==
                                      rm.RatePlans.RatePlan[0].MealsIncluded
                                        .MealPlanCode
                                  )[0].en}
                            </span>
                          )}
                        {rm.RatePlans.RatePlan &&
                          rm.RatePlans.RatePlan[0].RatePlanInclusions &&
                          rm.RatePlans.RatePlan[0].RatePlanInclusions
                            .RatePlanInclusion && (
                            <span className="border border-gray-300 px-2 py-[3px]">
                              {lang === "TW"
                                ? dictionary.rateType.filter(
                                    (rate: any) =>
                                      rate.code ==
                                      rm.RatePlans.RatePlan[0]
                                        .RatePlanInclusions.RatePlanInclusion[0]
                                        .Code
                                  )[0].tw
                                : dictionary.rateType.filter(
                                    (rate: any) =>
                                      rate.code ==
                                      rm.RatePlans.RatePlan[0]
                                        .RatePlanInclusions.RatePlanInclusion[0]
                                        .Code
                                  )[0].en}
                            </span>
                          )}
                      </p>
                      {rm.RatePlans.RatePlan &&
                        rm.RatePlans.RatePlan[0].AvailableQuantity &&
                        rm.RatePlans.RatePlan[0].AvailableQuantity < 2 && (
                          <p className="text-xs">
                            <span className="text-pink-700">
                              {lang === "TW" ? "本站上僅剩" : "Only"}{" "}
                              {rm.RatePlans.RatePlan[0].AvailableQuantity}{" "}
                              {lang === "TW" ? "間房" : "Room left"}
                            </span>
                          </p>
                        )}
                    </div>
                    <div className="bg-white p-2">
                      <p className="text-right text-sm">
                        {lang === "TW" ? "總價" : "Total price"}
                      </p>
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
                      <Link
                        href={{
                          pathname: "/book",
                          query: { id: goBooking(rm.RateKey) },
                        }}
                      >
                        <button className="w-full bg-luxorange hover:bg-orange-500 text-gray-100 text-sm p-2">
                          {lang === "TW" ? "預訂" : "Reserve"}
                        </button>
                      </Link>
                      <button
                        className="w-full border border-luxorange hover:bg-luxorange hover:text-gray-100 text-gray-600 text-sm p-2 mt-2"
                        onClick={() =>
                          addToCart({
                            hotelName: rm.HotelName,
                            roomType: rm.RoomType,
                            ratePlanName: rm.RoomDescription.Name,
                            rateKey: rm.RateKey,
                            price: parseFloat(rm.AmountAfterTax),
                            checkIn: queryParam.checkIn,
                            checkOut: queryParam.checkOut,
                            selected: false,
                            noOfRoom:
                            rm.RatePlans.RatePlan[0].LimitedAvailability || rm.RatePlans.RatePlan[0].AvailableQuantity >
                              queryParam.room
                                ? queryParam.room
                                : rm.RatePlans.RatePlan[0].AvailableQuantity,
                          })
                        }
                      >
                        {lang === "TW" ? "加入購物車" : "Add to cart"}
                      </button>
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
          {/* {decode(cartData)} */}
        </div>
      )}
    </>
  );
}
