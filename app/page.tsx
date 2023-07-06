"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/Search";
// import Loader from "@/components/Loader"

export default function Home() {
  const { userData, setUserData } = useUserStore((state) => state);
  // const searchParams = useSearchParams();
  const router = useRouter();

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
      <div className="flex justify-center -mt-24 relative z-10">
        <div className="p-5 bg-white shadow-lg rounded-lg w-full mx-2 lg:m-0 lg:w-[800px] relative">
          <Search />
        </div>
      </div>
      {/* {JSON.stringify(userData) !== "null" ? JSON.stringify(userData) : ""} */}
      {/* <Loader show={true}/> */}
    </div>
  );
}
