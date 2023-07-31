"use client";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/store/user";
import useRouteListStore from "@/store/routeList";
import useShowHandlerStore from "@/store/showHandler";
import { BsFillCartFill } from "react-icons/bs";
import useCartStore from "@/store/cart";
import { decode } from "js-base64";

type Props = {};

export default function Header({}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useLangStore((state) => state);
  const { currency, setCurrency } = useCurrencyStore((state) => state);
  const { userData, setUserData } = useUserStore((state) => state);
  const [userInital, setUserInitial] = useState<null | string>(null);
  const path = usePathname();
  const param = useSearchParams();
  const { routeList, setRouteList } = useRouteListStore((state) => state);
  const { cartData } = useCartStore();
  const [cartDataLength, setCartDataLength] = useState<number>(0);
  const langButton = useRef<HTMLDivElement>(null);
  const currencyButton = useRef<HTMLDivElement>(null);
  const cartButton = useRef<HTMLDivElement>(null);
  const {
    showLang,
    setShowLang,
    showCurrency,
    setShowCurrency,
    showNav,
    setShowNav,
    showOccupation,
    setShowOccupation,
    setCloseAllShow,
  } = useShowHandlerStore((state) => state);

  // set all showCurrency, showLang, showNave to false if route change
  useEffect(() => {
    setRouteList([...routeList, `${window.origin}${path}?${param}`]);
    //console.log(cartData);
    if (
      path.includes("/cart/") ||
      path.includes("/package/") ||
      path.includes("/book/")
    ) {
      currencyButton.current?.classList.add("hidden");
      langButton.current?.classList.add("hidden");
      cartButton.current?.classList.add("hidden");
    } else {
      currencyButton.current?.classList.remove("hidden");
      langButton.current?.classList.remove("hidden");
      cartButton.current?.classList.remove("hidden");
    }
  }, [path, param]);

  useEffect(() => {
    if (userData !== null) setUserInitial(userData.name[0].toUpperCase());
  }, [userData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setCloseAllShow();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // useEffect(() => {
  //   if (param.get("lang") !== null) setLang(param.get("lang")!);
  //   if (param.get("currency") !== null) setCurrency(param.get("currency")!);
  // }, []);

  // Cart handle
  useEffect(() => {
    if (cartData !== "") {
      const len = JSON.parse(decode(cartData)).length;
      setCartDataLength((prev) => (prev = len));
    }
  }, [cartData]);

  return (
    <div
      ref={wrapperRef}
      className="flex justify-between items-center p-2 lg:p-5 shadow-sm shadow-luxgreen"
    >
      {/* {JSON.stringify(routeList)} */}
      <div>
        <p className="text-2xl text-luxgreen font-bold">
          <Link href={"/"}> SILOAH</Link>
        </p>
      </div>
      <div className="flex gap-2 lg:gap-5 justify-center items-center">
        <div ref={currencyButton} className="currency relative">
          <button
            className="font-bold px-2"
            onClick={() => {
              setShowCurrency(true);
              setShowLang(false);
              setShowNav(false);
            }}
          >
            ${currency}
          </button>
          {showCurrency && (
            <div className="absolute -bottom-15 right-0 rounded shadow-lg z-20">
              <div className="p-5 relative flex flex-col gap-2 bg-white">
                <div className="flex justify-end">
                  <button onClick={() => setShowCurrency(false)}>x</button>
                </div>
                <button
                  className="border border-luxgreen hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                  onClick={() => {
                    setCurrency("TWD");
                    setShowCurrency(false);
                  }}
                >
                  $TWD
                </button>
                <button
                  className="border border-luxgreen hover:bg-teal-600 hover:text-gray-100 p-2 w-[150px] rounded"
                  onClick={() => {
                    setCurrency("USD");
                    setShowCurrency(false);
                  }}
                >
                  $USD
                </button>
              </div>
            </div>
          )}
        </div>
        <div ref={langButton} className="lang relative">
          <button
            className="border border-luxgreen rounded px-2 hover:bg-teal-600 hover:text-gray-100"
            onClick={() => {
              setShowLang(true);
              setShowCurrency(false);
              setShowNav(false);
            }}
          >
            {lang}
          </button>
          {showLang && (
            <div className="absolute -bottom-15 right-0 rounded shadow-lg z-20">
              <div className="p-5 relative flex flex-col gap-2 bg-white">
                <div className="flex justify-end">
                  <button onClick={() => setShowLang(false)}>x</button>
                </div>
                <button
                  className="border border-luxgreen hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                  onClick={() => {
                    setLang("EN");
                    setShowLang(false);
                  }}
                >
                  English
                </button>
                <button
                  className="border border-luxgreen hover:bg-teal-600 hover:text-gray-100 p-2 w-[150px] rounded"
                  onClick={() => {
                    setLang("TW");
                    setShowLang(false);
                  }}
                >
                  繁體中文 (台灣)
                </button>
              </div>
            </div>
          )}
        </div>
        {userInital !== null && (
          <div>
            <span className="rounded-full bg-pink-600 font-bold text-gray-100 w-8 h-8 flex justify-center items-center p-2">
              {userInital}
            </span>
          </div>
        )}

        <div ref={cartButton} className="cart relative mr-2">
          <Link
            href={{
              pathname: "/cart",
              query: Object.fromEntries(param.entries()), // the data
            }}
          >
            <BsFillCartFill size={24} />
            {cartDataLength > 0 && (
              <span className="absolute -right-3 -top-3 rounded-full w-6 h-6 bg-pink-700 text-gray-100 text-xs flex justify-center items-center">
                {cartDataLength}
              </span>
            )}
          </Link>
        </div>

        <div className="nav relative">
          <button
            className="p-2"
            onClick={() => {
              setShowNav(true);
              setShowLang(false);
              setShowCurrency(false);
            }}
          >
            <svg
              className="w-6 h-6 text-luxgreen"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {showNav && (
            <div className="absolute -bottom-15 right-0 rounded shadow-lg z-20 min-w-[200px]">
              <div className="p-5 relative flex flex-col gap-2 bg-white">
                <div className="flex justify-end">
                  <button onClick={() => setShowNav(false)}>x</button>
                </div>
                {userData === null ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={{
                        pathname: "/signup",
                        query: Object.fromEntries(param.entries()), // the data
                      }}
                    >
                      <button
                        className="border border-luxgreen hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                        onClick={() => setShowNav(false)}
                      >
                        {lang === "TW" ? "註冊" : "Sign Up"}
                      </button>
                    </Link>
                    <Link
                      href={{
                        pathname: "/signin",
                        query: Object.fromEntries(param.entries()), // the data
                      }}
                    >
                      <button
                        className="border border-luxgreen hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                        onClick={() => setShowNav(false)}
                      >
                        {lang === "TW" ? "登入" : "Sign In"}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button
                    className="border border-luxgreen hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                    onClick={() => {
                      setUserData(null);
                      setShowNav(false);
                      location.reload();
                    }}
                  >
                    {lang === "TW" ? "登出" : "Sign Out"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {JSON.stringify(routeList)} */}
    </div>
  );
}
