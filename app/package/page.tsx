"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { decode } from "js-base64";
export interface IPackageProps {}

type arrRateKeyType = string[];

type formType = {
  user: {
    fullName: string;
    email: string;
  };
  orderer: {
    fullName: string;
    email: string;
    country: string;
    mobileCode: string;
    mobile: string;
  };
  guest: {
    fullName: string;
    country: string;
  };
  bookingDetail: {
    hotelCode: string;
    hotelName: string;
    roomType: string;
    bookingKey: string;
    noOfRoom: number;
    checkIn: string;
    checkOut: string;
    noOfNight: number;
    amountAfterTax: number;
    amountBeforeTax: number;
    averageNightlyRate: number;
    totalAmount: number;
    currency: string;
  }[];
};

export default function Package(props: IPackageProps) {
  const param = useSearchParams();
  const [arrRateKey, setArrReteKey] = useState<arrRateKeyType>([]);
  const [hotelData, setHotelData] = useState<any>([]);
  // update based on param
  useEffect(() => {
    // setArrReteKey((prev) => {
    //   const arr: Array<string> = [];

    //   JSON.parse(decode(param.get("id")!)).map((dt: any) => {
    //     arr.push(dt.rateKey);
    //   });
    //   prev = [...prev, ...arr];

    //   return prev;
    // });

    JSON.parse(decode(param.get("id")!)).map((dt: any) => {
      //   arr.push(dt.rateKey);
      (async () => {
        const xx = await runApi(dt.rateKey);
        console.log(xx);
      })();
    });
  }, [param]);

  const runApi = async (rate: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-siloah": "siloah",
      },
      method: "POST",
      body: JSON.stringify({ rateKey: rate }),
    };
    try {
      const result = await fetch(
        `${process.env.SERVER}/hotel/hotelSearch/checkPrice`,
        config
      );
      const dt = await result.json();
      //   console.log(dt);
      return dt.data.HotelPriceCheckRS.PriceCheckInfo;
    } catch (error) {
      console.log(error);
      alert("There is No Available Hotel");
    }
  };
  return (
    <div>
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
