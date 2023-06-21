"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
// import Loader from "@/components/Loader"

export default function Home() {
  const { userData } = useUserStore((state) => state);
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
      {JSON.stringify(userData)}
      {/* <Loader show={true}/> */}
    </div>
  );
}
