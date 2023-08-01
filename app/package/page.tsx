"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { decode } from "js-base64";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
export interface IPackageProps {}

type arrRateKeyType = string[];

type loadingType = {
  loading: boolean;
}[];

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
    penalty: any;
  }[];
  payment: {
    totalAmount: number;
    currency: string;
  };
};

export default function Package(props: IPackageProps) {
  const { lang } = useLangStore();
  const { currency } = useCurrencyStore();
  const param = useSearchParams();
  const [arrRateKey, setArrReteKey] = useState<arrRateKeyType>([]);
  const [loading, setLoading] = useState<loadingType>([]);
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
    const tmpLoadingArr: loadingType = [];
    JSON.parse(decode(param.get("id")!)).map((dt: any) => {
      //   arr.push(dt.rateKey);
      tmpLoadingArr.push({ loading: true });
      (async () => {
        const response = await runApi(dt.rateKey);
        setHotelData((prev: any) => (prev = [...prev, response]));
      })();
    });

    setLoading(tmpLoadingArr);
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

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    if (lang === "TW") {
      const days = ["日", "一", "二", "三", "四", "五", "六"];
      return `${newDate.getFullYear()} 年 ${
        newDate.getMonth() + 1
      } 月 ${newDate.getDate()} 日 (${days[newDate.getDay()]})`;
    } else {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${days[newDate.getDay()]} ${newDate.getDate()} ${
        months[newDate.getMonth()]
      } ${newDate.getFullYear()}`;
    }
  };

  // put api response data in hotelData into form as part of booking detail
  useEffect(() => {
    if (hotelData.length > 0) {
      const tmpBookingDetail: any = [];
      const paramNoOfRoom = JSON.parse(decode(param.get("id")!))[0].noOfRoom;
      hotelData.forEach((el: any, i: number) => {
        console.log(i, hotelData[i]);
        setLoading((prev) => {
          prev = prev.map((p: any, ind: number) =>
            ind === i ? { loading: false } : { ...p }
          );
          return prev;
        });
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

          penalty:
            el.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0].RateInfo
              .CancelPenalties.CancelPenalty[0],
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
    <div className="container mx-auto p-2 lg:p-0">
      {/* <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
      </div> */}

      {/* {loading.length > 0 && 
        <div>
          {loading.map((dv: any, ind: number) => (
            <div className="border"> {dv.loading ? <div><p className="animate-pulse bg-slate-700 h-10 w-10"></p><div> : <div><p>{form.bookingDetail[ind].hotelName}</p></div> }</div>
          ))}
        </div>
      }
    */}
      <div className="">
        {loading.length > 0 && (
          <div className="w-full flex flex-col gap-5 border rounded border-luxgreen p-2 lg:p-5">
            <p className="text-xl text-luxgreen font-bold">
              {lang === "TW" ? "預訂摘要" : "Booking Summary"}
            </p>
            {loading.map((ld: any, ind: number) =>
              ld.loading ? (
                <div key={ind} className="w-full animate-pulse border p-2">
                  <p className="bg-slate-700 h-5 max-w-[400px] rounded-xl"></p>
                  <p className="bg-slate-700 h-3 max-w-[300px] mt-5 rounded-xl"></p>
                  <p className="bg-slate-700 h-3 max-w-[350px] mt-2 rounded-xl"></p>
                  <p className="border-b my-5"></p>
                  <p className="mt-2 flex justify-end">
                    <span className="bg-slate-700 h-3 w-12 rounded-xl"></span>
                  </p>
                </div>
              ) : (
                <div key={ind} className="w-full border p-2">
                  <p className="text-md lg:text-lg text-luxgreen">
                    {form.bookingDetail[ind].hotelName}
                  </p>
                  <p className="text-sm capitalize mt-5">
                    {form.bookingDetail[ind].roomType.toLowerCase()}
                  </p>
                  <p className="text-sm">
                    {convertDate(form.bookingDetail[ind].checkIn)} ~{" "}
                    {convertDate(form.bookingDetail[ind].checkOut)} ｜{" "}
                    {countTotalNight(
                      form.bookingDetail[ind].checkIn,
                      form.bookingDetail[ind].checkOut
                    )}{" "}
                    {lang === "TW" ? "晚" : "Night"}
                  </p>
                  <p className="border-b my-5"></p>
                  <p className="text-right">
                    <span className="text-xs">
                      {currency === "TWD" ? "NT$ " : "$ "}
                    </span>
                    {form.bookingDetail[ind].subAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              )
            )}
            {loading[loading.length - 1].loading ? (
              <div className="w-full animate-pulse border p-2">
                <p className="mt-2 bg-slate-700 h-3 rounded-xl"></p>
              </div>
            ) : (
              <div className="w-full border p-2">
                <div className="flex justify-between">
                  <p>{lang === "TW" ? "總價" : "Total amount"}</p>
                  <p>
                    <span className="text-sm">
                      {currency === "TWD" ? "NT$ " : "$ "}
                    </span>
                    <span className="text-lg text-pink-700">
                      {form.payment.totalAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div>{JSON.stringify(loading)}</div>
      <p>{JSON.stringify(form)}</p>
      <p className="mt-5">{JSON.stringify(decode(param.get("id")!))}</p> */}
    </div>
  );
}
