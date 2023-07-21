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
import useCheckTimeStore from "@/store/checkTime";

type queryUrlType = {
  room: number;
  adult: number;
  children: number;
  checkIn: string;
  checkOut: string;
  rateKey: string;
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
    rateKey: "",
  });
  const { checkInTime, checkOutTime } = useCheckTimeStore((state) => state);

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

    try {
      const query = JSON.parse(atob(param.get("id")!));
      // console.log(query)
      setQueryUrl((prev) => {
        prev = {
          ...queryUrl,
          room: parseInt(query.room),
          adult: parseInt(query.adult),
          children: parseInt(query.children),
          checkIn: query.checkIn,
          checkOut: query.checkOut,
          rateKey: query.rateKey,
        };
        runApi(prev.rateKey);
        return prev;
      });
    } catch (error) {
      alert(error);
      router.push("/");
    }
  }, [param]);

  const runApi = (rate: string) => {
    (async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-siloah": "siloah",
        },
        method: "POST",
        body: JSON.stringify({ rateKey: rate }),
      };
      try {
        const result = await fetch(
          `${process.env.SERVER}/hotel/hotelSearch/checkPrice`,
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

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    if (lang === "TW") {
      const days = ["日", "一", "二", "三", "四", "五", "六"];
      return `${newDate.getFullYear()} 年 ${
        newDate.getMonth() + 1
      } 月 ${newDate.getDate()} 日 (${days[newDate.getDay()]})`;
    } else {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${days[newDate.getDay()]} ${newDate.getDate()} ${
        months[newDate.getMonth()]
      } ${newDate.getFullYear()}`;
    }
  };

  const countTotalNight = () => {
    let date_1 = new Date(queryUrl.checkOut);
    let date_2 = new Date(queryUrl.checkIn);

    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    return lang === "TW"
      ? `${TotalDays} 晚`
      : `${TotalDays} ${TotalDays > 1 ? "nights" : "night"}`;
  };

  return (
    <div className="container mx-auto max-w-[1024px] p-2 lg:p-0 mt-5">
      {/* <div className="mt-5 shadow-lg p-5">{JSON.stringify(queryUrl)}</div> */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="left w-full lg:w-5/12">
          <div className="w-full border rounded p-2">
            <p className="font-bold text-luxgreen text-lg">
              {lang === "TW" ? "您的訂房資訊" : "Your booking details"}
            </p>
            <div className="grid grid-cols-2 mt-5">
              <div>
                <p>{lang === "TW" ? "入住時間" : "Check-in"}</p>
                <p className="font-bold">{convertDate(queryUrl.checkIn)}</p>
                <p className="text-sm">{checkInTime}</p>
              </div>
              <div>
                <p className="px-2">
                  {lang === "TW" ? "退房時間" : "Check-out"}
                </p>
                <p className="font-bold border-l px-2">
                  {convertDate(queryUrl.checkOut)}
                </p>
                <p className="border-l px-2 text-sm">{checkOutTime}</p>
              </div>
            </div>
            <div className="mt-5">
              <p>{lang === "TW" ? "總共入住：" : "Total length of stay:"}</p>
              <p className="font-bold">{countTotalNight()}</p>
            </div>
            <div className="divider px-2 py-5">
              <p className="border-b"></p>
            </div>
            <div>
              <p>{lang === "TW" ? "已選擇" : "You selected"}</p>
              <p className="font-bold">
                {queryUrl.room}{" "}
                {lang === "TW"
                  ? "間客房"
                  : queryUrl.room > 1
                  ? "rooms"
                  : "room"}{" "}
                for {queryUrl.adult}{" "}
                {lang === "TW"
                  ? "位成人"
                  : queryUrl.adult > 1
                  ? "adults"
                  : "adult"}
                {queryUrl.children > 0
                  ? lang === "TW"
                    ? `, ${queryUrl.children} 位孩童`
                    : `, ${queryUrl.children} child`
                  : ""}
              </p>
            </div>
          </div>
          <div className="w-full border rounded p-2 mt-2">
            <p className="font-bold text-luxgreen text-lg">
              {lang === "TW" ? "房價明細" : "Your price summary"}
            </p>
          </div>
        </div>
        <div className="right w-full lg:w-7/12 border rounded p-2 lg:p-5">
          R
        </div>
      </div>

      <Loader show={showLoader} />
    </div>
  );
}
