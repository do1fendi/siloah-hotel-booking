"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useLangStore from "@/store/lang";
import Search from "@/components/Search";
// import Loader from "@/components/Loader"

type querySearchType = {
  city: string;
  room: number;
  adult: number;
  children: number;
  checkIn: string;
  checkOut: string;
  lang: string;
};

export default function Home() {
  const { userData, setUserData } = useUserStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const param = useSearchParams();
  const [querySearch, setQuerySearch] = useState<querySearchType>({
    city: "",
    room: 0,
    adult: 0,
    children: 0,
    checkIn: "",
    checkOut: "",
    lang: "TW",
  });

  useEffect(() => {
    setQuerySearch({
      ...querySearch,
      city: param.get("city")!,
      room: parseInt(param.get("room")!),
      adult: parseInt(param.get("adult")!),
      children: parseInt(param.get("children")!),
      checkIn: param.get("checkIn")!,
      checkOut: param.get("checkOut")!,
      lang: lang,
    });
  }, [param, lang]);

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-siloah": "siloah",
        },
        method: "POST",
        body: JSON.stringify(querySearch),
      };
      const result = await fetch(
        `${process.env.SERVER}/hotel/hotelSearch/avail`,
        config
      );
      const dt = await result.json();
      console.log(dt);
      // if (dt.status === "Error") {
      //   setUserData(null);
      //   window.location.reload();
      // }
    })();
  }, [param]);

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="mt-5 shadow-lg p-5">
        <Search />
      </div>
      {/* {JSON.stringify(querySearch)} */}
    </div>
  );
}
