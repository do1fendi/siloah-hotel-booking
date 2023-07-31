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

type querySearchType = {
  city: string;
  room: number;
  adult: number;
  children: number;
  childAges: string;
  checkIn: string;
  checkOut: string;
  currency: string;
  lang: string;
};

export default function Home() {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { userData, setUserData } = useUserStore((state) => state);
  const [hotelAvailableData, setHotelAvailableData] = useState<any | null>(
    null
  );
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const param = useSearchParams();
  const router = useRouter();
  const [querySearch, setQuerySearch] = useState<querySearchType>({
    city: "",
    room: 0,
    adult: 0,
    children: 0,
    childAges: "",
    checkIn: "",
    checkOut: "",
    currency: "",
    lang: "",
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
    setQuerySearch((prev) => {
      prev = {
        ...querySearch,
        city: param.get("city")!,
        room: parseInt(param.get("room")!),
        adult: parseInt(param.get("adult")!),
        children: parseInt(param.get("children")!),
        childAges: param.get("childAges")!,
        checkIn: param.get("checkIn")!,
        checkOut: param.get("checkOut")!,
        currency: currency,
        lang: lang,
      };
      router.replace(
        `/search/?city=${prev.city}&checkIn=${prev.checkIn}&checkOut=${prev.checkOut}&room=${prev.room}&adult=${prev.adult}&children=${prev.children}&childAges=${prev.childAges}&lang=${lang}&currency=${currency}`
      );
      runApi(prev);

      return prev;
    });
  }, [param, lang, currency]);

  // useEffect(() => {
  //   setShowLoader(true);
  //   runApi({
  //     city: param.get("city")!,
  //     room: parseInt(param.get("room")!),
  //     adult: parseInt(param.get("adult")!),
  //     children: parseInt(param.get("children")!),
  //     childAges: param.get("childAges")!,
  //     checkIn: param.get("checkIn")!,
  //     checkOut: param.get("checkOut")!,
  //     currency: param.get("currency")!,
  //     lang: param.get("lang")!,
  //   });
  // }, []);

  const runApi = (dt: querySearchType) => {
    setShowLoader(true);
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
      <div className="mt-5 shadow shadow-luxgreen p-5">
        <Search />
      </div>
      <HotelAvailableList data={hotelAvailableData} />
      <Loader show={showLoader} />
    </div>
  );
}
