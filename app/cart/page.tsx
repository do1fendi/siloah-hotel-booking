"use client";
import useCartStore from "@/store/cart";
import { decode } from "js-base64";
import { useEffect, useState } from "react";
import useCurrencyStore from "@/store/currency";
import { FaRegTrashAlt } from "react-icons/fa";
import useLangStore from "@/store/lang";
import useUserStore from "@/store/user";
import Link from "next/link";

type cartType = {
  hotelName: string;
  roomType: string;
  ratePlanName: string;
  rateKey: string;
  price: number;
  checkIn: string;
  checkOut: string;
}[];

export default function Cart() {
  const { userData, setUserData } = useUserStore();
  const { cartData, setCartData } = useCartStore();
  const [carts, setCarts] = useState<cartType>([]);
  const { currency } = useCurrencyStore();
  const { lang } = useLangStore();

  useEffect(() => {
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
    setCarts((prev) => (prev = JSON.parse(decode(cartData))));
  }, [cartData]);

  const onRemoveCart = (ind: number) => {
    setCarts((prev) => {
      prev = JSON.parse(decode(cartData)).filter(
        (cart: any, i: number) => i !== ind
      );

      setCartData(JSON.stringify(prev));

      return prev;
    });
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
  return (
    <>
      <div className="container mx-auto">
        {carts.length > 0 ? (
          <div className="flex flex-col gap-2 lg:gap-5 mt-5 p-2 lg:p-0">
            <div className="p-2 lg:p-5 border border-luxgreen rounded">
              <p className="text-xl">
                {lang === "TW"
                  ? `您的購物車 (${carts.length})`
                  : `Your cart (${carts.length})`}
              </p>
            </div>
            {carts.map((cart, ind) => (
              <div
                key={ind}
                className="p-2 lg:p-5 border border-luxgreen rounded flex flex-col gap-2 lg:gap-5"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">{cart.hotelName}</p>
                    <button onClick={() => onRemoveCart(ind)}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                  <p>{cart.roomType}</p>
                </div>
                <div className="flex justify-between border-t mt-5 items-center pt-2 lg:pt-5">
                  <div>
                    <p>{cart.ratePlanName}</p>
                    <p className="text-gray-500 text-xs">
                      {convertDate(cart.checkIn)} ~ {convertDate(cart.checkOut)}
                    </p>
                  </div>
                  <div className="min-w-[100px] text-right">
                    <p>
                      <span className="text-xs">
                        {currency === "TWD" ? "NT$ " : "$ "}
                      </span>
                      <span className="text-xl text-pink-700">
                        {cart.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">
                      {lang === "TW" ? "包含稅金" : "includes taxes"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen -mt-[110px]">
            <p className="text-xl font-bold">
              {lang === "TW" ? "您的購物車是空的" : "Your cart is empty"}
            </p>
            <div className="mt-5">
              <Link href={"/"}>
                <button className="text-gray-100 bg-luxorange text-lg py-2 px-5 rounded hover:bg-orange-400">
                  {lang === "TW" ? "找飯店" : "Search Hotel"}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
