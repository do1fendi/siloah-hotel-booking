"use client";
import useCartStore from "@/store/cart";
import { decode } from "js-base64";
import { useEffect, useState } from "react";
import useCurrencyStore from "@/store/currency";
import { FaRegTrashAlt } from "react-icons/fa";
import useLangStore from "@/store/lang";

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
  const { cartData, setCartData } = useCartStore();
  const [carts, setCarts] = useState<cartType>([]);
  const { currency } = useCurrencyStore();
  const { lang } = useLangStore();

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
        <div className="flex flex-col gap-2 lg:gap-5 mt-5 p-2 lg:p-0">
          <div className="p-2 lg:p-5 border border-luxgreen rounded">
            <p className="text-xl">
              {lang === "TW"
                ? `您的購物車 (${carts.length})`
                : `Your cart (${carts.length})`}
            </p>
          </div>
          {carts.length > 0 &&
            carts.map((cart, ind) => (
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
                  <div>
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
      </div>
    </>
  );
}
