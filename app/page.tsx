import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="banner w-full h-[260px] lg:h-[380px] relative">
        <Image src={`${process.env.BASEURL}/banner.jpg`} alt="banner" fill className="object-fit"></Image>
      </div>
      <div className="container mx-auto">
        <div>HOME</div>
      </div>
    </div>
  );
}
