"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import Loader from "@/components/Loader"

export default function Home() {
  const { userData, setUserData } = useUserStore((state) => state);
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
          path.back();
          // window.location.replace("/");
        }
      })();
    }
  }, [userData]);
  return (
    <div>
      <div className="banner w-full h-[140px] lg:h-[340px] relative">
        <Image
          src={`${process.env.BASEURL}/banner.png`}
          alt="banner"
          fill
          className="object-fit"
          priority
        ></Image>
      </div>
      <div className="container mx-auto">
        <div>HOME</div>
      </div>
      {/* {JSON.stringify(userData) !== "null" ? JSON.stringify(userData) : ""} */}
      {/* <Loader show={true}/> */}
    </div>
  );
}
