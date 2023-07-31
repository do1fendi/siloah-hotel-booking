"use client";
import { useEffect, useState, useMemo } from "react";
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
    subAmount: number;
    currency: string;
  }[];
  payment: {
    totalAmount: number;
    currency: string;
  };
};

export default function Package(props: IPackageProps) {
  const param = useSearchParams();
  const [arrRateKey, setArrReteKey] = useState<arrRateKeyType>([]);
  const [hotelData, setHotelData] = useState<any>([]);
  const [form, setForm] = useState<formType>({
    user: {
      fullName: "",
      email: "",
    },
    orderer: {
      fullName: "",
      email: "",
      country: "",
      mobileCode: "",
      mobile: "",
    },
    guest: {
      fullName: "",
      country: "",
    },
    bookingDetail: [],
    payment: {
      totalAmount: 0,
      currency: "",
    },
  });
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
        const response = await runApi(dt.rateKey);
        setHotelData((prev: any) => (prev = [...prev, response]));
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

  const countTotalNight = (inData: string, outDate: string): number => {
    let date_1 = new Date(outDate);
    let date_2 = new Date(inData);

    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    return TotalDays;
  };

  // put api response data in hotelData into form as part of booking detail
  useEffect(() => {
    if (hotelData.length > 0) {
      const tmpBookingDetail: any = [];
      const paramNoOfRoom = JSON.parse(decode(param.get("id")!))[0].noOfRoom;
      hotelData.forEach((el: any, i: number) => {
        console.log(i, hotelData[i]);
        let tmpNoOfRoom =
          paramNoOfRoom >
          el.HotelRateInfo?.Rooms?.Room[0].RatePlans?.RatePlan[0]
            .AvailableQuantity
            ? el.HotelRateInfo?.Rooms?.Room[0].RatePlans?.RatePlan[0]
                .AvailableQuantity
            : paramNoOfRoom;

        let tmpAmountAfterTax = el.HotelRateInfo?.RateInfos?.ConvertedRateInfo
          ? el.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0].AmountAfterTax
          : el.HotelRateInfo?.RateInfos?.RateInfo[0].AmountAfterTax;

        tmpBookingDetail.push({
          bookingKey: el.BookingKey,
          hotelCode: el.HotelInfo?.HotelCode!,
          hotelName: el.HotelInfo?.HotelName!,
          noOfRoom: tmpNoOfRoom,
          roomType:
            el.HotelRateInfo?.Rooms?.Room[0].RatePlans?.RatePlan[0]
              .RatePlanName,
          checkIn: el.HotelRateInfo?.RateInfos.RateInfo[0].StartDate,
          checkOut: el.HotelRateInfo?.RateInfos.RateInfo[0].EndDate,
          noOfNight: countTotalNight(
            el.HotelRateInfo?.RateInfos.RateInfo[0].StartDate,
            el.HotelRateInfo?.RateInfos.RateInfo[0].EndDate
          ),
          amountAfterTax: tmpAmountAfterTax,
          amountBeforeTax: el.HotelRateInfo?.RateInfos?.ConvertedRateInfo
            ? el.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0].AmountBeforeTax
            : el.HotelRateInfo?.RateInfos?.RateInfo[0].AmountBeforeTax,

          averageNightlyRate: el.HotelRateInfo?.RateInfos?.ConvertedRateInfo
            ? el.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0]
                .AverageNightlyRate
            : el.HotelRateInfo?.RateInfos?.RateInfo[0].AverageNightlyRate,

          subAmount: tmpNoOfRoom * tmpAmountAfterTax,
          currency: el.ConvertedCurrencyCode
            ? el.ConvertedCurrencyCode
            : el.CurrencyCode,
        });
      });
      setForm((prev) => {
        prev = {
          ...prev,
          bookingDetail: tmpBookingDetail,
          payment: {
            ...prev.payment,
            currency: tmpBookingDetail[0].currency,
            totalAmount: tmpBookingDetail.reduce((total: number, amt: any) => {
              return total + amt.subAmount;
            }, 0),
          },
        };
        return prev;
      });
    }
  }, [hotelData, param]);
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
      <p>{JSON.stringify(form)}</p>
      <p className="mt-5">{JSON.stringify(decode(param.get("id")!))}</p>
    </div>
  );
}
