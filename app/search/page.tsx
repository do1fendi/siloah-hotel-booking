"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useLangStore from "@/store/lang";
// import Loader from "@/components/Loader"

type querySearchType = {
  city: string;
  room: number;
  adult: number;
  children: number;
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
    lang: "TW",
  });

  useEffect(() => {
    setQuerySearch({
      ...querySearch,
      city: param.get("city")!,
      room: parseInt(param.get("room")!),
      adult: parseInt(param.get("adult")!),
      children: parseInt(param.get("children")!),
      lang: lang,
    });
  }, [param, lang]);

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
          window.location.reload();
        }
      })();
    }
  }, [userData]);

  return <div>{JSON.stringify(querySearch)}</div>;
}
