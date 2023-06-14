"use client";
import useLangStore from "@/store/lang";
import { useState } from "react";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  const { lang, setLang } = useLangStore((state) => state);
  const [showLang, setShowLang] = useState<boolean>(false);
  return (
    <div className="flex justify-between items-center bg-teal-50 p-5">
      <div>
        <p className="text-2xl text-teal-600 font-bold">
          <Link href={"/"}> SILOAH</Link>
        </p>
      </div>
      <div className="hidden lg:block relative">
        <button
          className="border border-teal-600 rounded px-2 hover:bg-teal-600 hover:text-gray-100"
          onClick={() => setShowLang(true)}
        >
          {lang}
        </button>
        {showLang && (
          <div className="absolute -bottom-15 right-0 rounded shadow-lg bg-white z-20">
            <div className="bg-transparent p-5 relative flex flex-col gap-2">
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
                className="border border-teal-600 hover:bg-teal-600 hover:text-gray-100 p-2 w-full rounded"
                onClick={() => {
                  setLang("CN");
                  setShowLang(false);
                }}
              >
                Chinese
              </button>
            </div>
          </div>
        )}
      </div>
      <button className="block lg:hidden">
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
    </div>
  );
}
