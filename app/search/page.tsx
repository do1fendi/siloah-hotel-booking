"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import Search from "@/components/Search";
import HotelAvailableList from "@/components/HotelAvailableList";
// import Loader from "@/components/Loader"

type querySearchType = {
  city: string;
  room: number;
  adult: number;
  children: number;
  childAge: string;
  checkIn: string;
  checkOut: string;
  currency: string;

  lang: string;
};

export default function Home() {
  const { userData, setUserData } = useUserStore((state) => state);
  const [hotelAvailableData, setHotelAvailableData] = useState<any | null>(
    null
  );
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const param = useSearchParams();
  const [querySearch, setQuerySearch] = useState<querySearchType>({
    city: "",
    room: 0,
    adult: 0,
    children: 0,
    childAge: "",
    checkIn: "",
    checkOut: "",
    currency: currency,
    lang: "TW",
  });

  useEffect(() => {
    setQuerySearch((prev) => {
      prev = {
        ...querySearch,
        city: param.get("city")!,
        room: parseInt(param.get("room")!),
        adult: parseInt(param.get("adult")!),
        children: parseInt(param.get("children")!),
        checkIn: param.get("checkIn")!,
        checkOut: param.get("checkOut")!,
        lang: lang,
      };
      runApi(prev);
      return prev;
    });
  }, [param, lang]);

  const runApi = (dt: querySearchType) => {
    (async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-siloah": "siloah",
        },
        method: "POST",
        body: JSON.stringify(dt),
      };
      try {
        const result = await fetch(
          `${process.env.SERVER}/hotel/hotelSearch/avail`,
          config
        );
        const dt = await result.json();
        console.log(dt);
        setHotelAvailableData(dt.data);
      } catch (error) {
        console.log(error);
      }
      // if (dt.status === "Error") {
      //   setUserData(null);
      //   window.location.reload();
      // }
    })();
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="mt-5 shadow-lg p-5">
        <Search />
      </div>
      <HotelAvailableList data={hotelAvailableData} />
    </div>
  );
}
