"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import Loader from "@/components/Loader"
import useShowHandlerStore from "@/store/showHandler";

export default function Home() {
  const { userData, setUserData } = useUserStore((state) => state);
  const { setCloseAllShow } = useShowHandlerStore((state) => state);
  // const searchParams = useSearchParams();
  const path = useRouter();
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
          window.location.reload();
        }
      })();
    }
  }, [userData]);
  return <div onClick={setCloseAllShow}>Search</div>;
}
