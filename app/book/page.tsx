"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import Search from "@/components/Search";
import HotelAvailableList from "@/components/HotelAvailableList";
import Loader from "@/components/Loader";

type queryUrlType = {
  room: number;
  adult: number;
  children: number;
  checkIn: string;
  checkOut: string;
  rate: string;
};

export default function Book() {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { userData, setUserData } = useUserStore((state) => state);
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const param = useSearchParams();
  const router = useRouter();
  const [queryUrl, setQueryUrl] = useState<queryUrlType>({
    room: 0,
    adult: 0,
    children: 0,
    checkIn: "",
    checkOut: "",
    rate: "",
  });

  useEffect(() => {
    // for (const [key, value] of searchParams.entries()) {
    //   console.log(`${key}, ${value}`);
    // }

    if (userData != null) {
      (async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-siloah": "siloah",
          },
          method: "POST",
          body: JSON.stringify({ token: userData.token }),
        };
        const result = await fetch(
          `${process.env.SERVER}/hotel/verifyToken`,
          config
        );
        const dt = await result.json();
        // console.log(dt);
        if (dt.status === "Error") {
          setUserData(null);
          // router.back();
          window.location.reload();
        }
      })();
    }
    // router.push("/search/?code=asdd&ab=aaa");
  }, []);

  useEffect(() => {
    setShowLoader(true);
    setQueryUrl((prev) => {
      prev = {
        ...queryUrl,
        room: parseInt(param.get("room")!),
        adult: parseInt(param.get("adult")!),
        children: parseInt(param.get("children")!),
        checkIn: param.get("checkIn")!,
        checkOut: param.get("checkOut")!,
        rate: param.get("rate")!,
      };
      runApi(prev.rate);
      return prev;
    });
  }, [param, lang, currency]);

  const runApi = (rate: string) => {
    (async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-siloah": "siloah",
        },
        method: "POST",
        body: JSON.stringify(rate),
      };
      try {
        const result = await fetch(
          `${process.env.SERVER}/hotel/hotelSearch/avail`,
          config
        );
        const dt = await result.json();
        console.log(dt);
      } catch (error) {
        console.log(error);
        alert("There is No Available Hotel");
        // router.push("/");
      }
      // if (dt.status === "Error") {
      //   setUserData(null);
      //   window.location.reload();
      // }
      setShowLoader(false);
    })();
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="mt-5 shadow-lg p-5">
        <Search />
      </div>

      <Loader show={showLoader} />
    </div>
  );
}
