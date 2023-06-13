"use client";
import useLangStore from "@/store/lang";

type Props = {};

export default function Header({}: Props) {
  const { lang, setLang } = useLangStore((state) => state);
  return (
    <div className="flex justify-between">
      <div>
        <p className="text-2xl text-teal-600">SILOAH</p>
      </div>
      <div className="hidden lg:block">
        Header - {lang} <button onClick={() => setLang("TW")}>change</button>
      </div>
      <button className="block lg:hidden bg-theme-color-active">
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
