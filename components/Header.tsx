"use client";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/store/user";

type Props = {};

export default function Header({}: Props) {
  const { lang, setLang } = useLangStore((state) => state);
  const [showLang, setShowLang] = useState<boolean>(false);
  const { currency, setCurrency } = useCurrencyStore((state) => state);
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const { userData, setUserData } = useUserStore((state) => state);
  const [userInital, setUserInitial] = useState<null | string>(null);
  const router = usePathname();

  // set all showCurrency, showLang, showNave to false if route change
  useEffect(() => {
    setShowCurrency(false);
    setShowLang(false);
    setShowNav(false);
  }, [router]);

  useEffect(() => {
    if (userData !== null) setUserInitial(userData.name[0].toUpperCase());
  }, [userData]);

 
  return (
    <div className="flex justify-between items-center p-2 lg:p-5 shadow-sm">
      <div>
        <p className="text-2xl text-teal-600 font-bold">
          <Link href={"/"}> SILOAH</Link>
        </p>
      </div>
      <div className="flex gap-2 lg:gap-5 justify-center items-center">
        <div className="currency relative">
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
                  className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                  onClick={() => {
                    setCurrency("TWD");
                    setShowCurrency(false);
                  }}
                >
                  $TWD
                </button>
                <button
                  className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-[150px] rounded"
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
        <div className="lang relative">
          <button
            className="border border-teal-600 rounded px-2 hover:bg-teal-600 hover:text-gray-100"
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
                  className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                  onClick={() => {
                    setLang("EN");
                    setShowLang(false);
                  }}
                >
                  English
                </button>
                <button
                  className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-[150px] rounded"
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
        <div>
          {" "}
          {userInital !== null && (
            <span className="rounded-full bg-pink-600 font-bold text-gray-100 w-8 h-8 flex justify-center items-center p-2">
              {userInital}
            </span>
          )}
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
              className="w-6 h-6 text-teal-600"
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
                    <Link href={"/signup"}>
                      <button
                        className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                        onClick={() => setShowNav(false)}
                      >
                        {lang === "TW" ? "註冊" : "Sign Up"}
                      </button>
                    </Link>
                    <Link href={"/signin"}>
                      <button
                        className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                        onClick={() => setShowNav(false)}
                      >
                        {lang === "TW" ? "登入" : "Sign In"}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button
                    className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
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
    </div>
  );
}
