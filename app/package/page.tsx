"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import useUserStore from "@/store/user";
import { useSearchParams } from "next/navigation";
import { decode } from "js-base64";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import usePackageStore from "@/store/package";
import useCountryStore from "@/store/country";
import useCartStore from "@/store/cart";

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
  const [bookForOther, setBookForOther] = useState<boolean>(false);
  const { setCartData } = useCartStore();
  const { country } = useCountryStore();
  const { lang } = useLangStore();
  const { currency } = useCurrencyStore();
  const param = useSearchParams();
  const [arrRateKey, setArrReteKey] = useState<arrRateKeyType>([]);
  const { userData, setUserData } = useUserStore((state) => state);
  const [loading, setLoading] = useState<loadingType>([]);
  const [hotelData, setHotelData] = useState<any>([]);
  const { packs, setPackage } = usePackageStore();
  const [showLoader, setShowLoader] = useState<boolean>(false);
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

  type formErrorType = {
    orFn: {
      error: boolean;
      state: boolean;
      msg: {
        en: string;
        tw: string;
      };
    };
    orEmail: {
      error: boolean;
      state: boolean;
      msg: {
        en: string;
        tw: string;
      };
    };
    orCountry: {
      error: boolean;
      state: boolean;
      msg: {
        en: string;
        tw: string;
      };
    };
    orMobile: {
      error: boolean;
      state: boolean;
      msg: {
        en: string;
        tw: string;
      };
    };
    gsFn: {
      error: boolean;
      state: boolean;
      msg: {
        en: string;
        tw: string;
      };
    };
    gsCountry: {
      error: boolean;
      state: boolean;
      msg: {
        en: string;
        tw: string;
      };
    };
  };

  const orFn = useRef<HTMLInputElement>(null);
  const orEmail = useRef<HTMLInputElement>(null);
  const orCountry = useRef<HTMLInputElement>(null);
  const orMobile = useRef<HTMLInputElement>(null);
  const bookForOtherRef = useRef<HTMLDivElement>(null);
  const gsFn = useRef<HTMLInputElement>(null);
  const gsCountry = useRef<HTMLInputElement>(null);

  const [errorForm, setErrorForm] = useState<formErrorType>({
    orFn: {
      error: false,
      state: false,
      msg: {
        en: "Please enter your full name",
        tw: "請輸入姓名",
      },
    },
    orEmail: {
      error: false,
      state: false,
      msg: {
        en: "Please enter a valid email address so we can send you your booking confirmation",
        tw: "請輸入有效的電子信箱以便我們向您發送預訂確認郵件",
      },
    },
    orCountry: {
      error: false,
      state: false,
      msg: {
        en: "Please select country",
        tw: "請選擇國家",
      },
    },
    orMobile: {
      error: false,
      state: false,
      msg: {
        en: "Please entery the correct mobile",
        tw: "輸入正確的手機號碼",
      },
    },
    gsFn: {
      error: false,
      state: false,
      msg: {
        en: "Please enter your full name",
        tw: "請輸入姓名",
      },
    },
    gsCountry: {
      error: false,
      state: false,
      msg: {
        en: "Please select country",
        tw: "請選擇國家",
      },
    },
  });

  useEffect(() => {
    setForm({
      ...form,
      user: { ...form.user, fullName: userData?.name!, email: userData?.em! },
    });
  }, [userData]);

  // update based on param
  useEffect(() => {
    // setArrReteKey((prev) => {
    //   const arr: Array<string> = [];

    //   JSON.parse(decode(packs)).map((dt: any) => {
    //     arr.push(dt.rateKey);
    //   });
    //   prev = [...prev, ...arr];

    //   return prev;
    // });
    const tmpLoadingArr: loadingType = [];
    // JSON.parse(decode(packs)).map((dt: any) => {

    if (
      JSON.parse(decode(packs!)) !== null &&
      JSON.parse(decode(packs!)) !== "null"
    ) {
      JSON.parse(decode(packs!)).map((pack: any) => {
        //   arr.push(dt.rateKey);
        tmpLoadingArr.push({ loading: true });
        (async () => {
          const response = await runApi(pack.rateKey);
          setHotelData((prev: any) => (prev = [...prev, response]));
        })();
      });

      setLoading(tmpLoadingArr);
    } else setHotelData([]);
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
      const paramNoOfRoom = JSON.parse(decode(packs!))[0].noOfRoom;
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
              return Math.round((total + amt.subAmount) *100)/100;
            }, 0),
          },
        };
        return prev;
      });
    }
  }, [hotelData, param]);

  /* form handler */
  const onChange = (e: HTMLInputElement) => {
    switch (e.name) {
      case "orFn":
        setForm({ ...form, orderer: { ...form.orderer, fullName: e.value } });
        setErrorForm((prev) => {
          e.value.length < 1
            ? (prev = {
                ...prev,
                orFn: { ...prev.orFn, error: true, state: true },
              })
            : (prev = {
                ...prev,
                orFn: { ...prev.orFn, error: false, state: true },
              });
          return prev;
        });
        break;
      case "orEmail":
        setForm({ ...form, orderer: { ...form.orderer, email: e.value } });
        setErrorForm((prev) => {
          const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          !regex.test(e.value)
            ? (prev = {
                ...prev,
                orEmail: { ...prev.orEmail, error: true, state: true },
              })
            : (prev = {
                ...prev,
                orEmail: { ...prev.orEmail, error: false, state: true },
              });
          return prev;
        });
        break;
      case "orCountry":
        setForm((prev) => {
          prev = {
            ...prev,
            orderer: {
              ...prev.orderer,
              country: e.value,
              mobileCode:
                lang === "TW" && e.value !== null
                  ? country.filter((c) => c.tw === e.value).length > 0
                    ? country.filter((c) => c.tw === e.value)[0].mobileCode
                    : ""
                  : country.filter((c) => c.en === e.value).length > 0
                  ? country.filter((c) => c.en === e.value)[0].mobileCode
                  : "",
            },
          };

          return prev;
        });
        setErrorForm((prev) => {
          let found = false;
          if (country.find((el) => el.en === e.value)) found = true;
          if (country.find((el) => el.tw === e.value)) found = true;

          !found
            ? (prev = {
                ...prev,
                orCountry: { ...prev.orCountry, error: true, state: true },
              })
            : (prev = {
                ...prev,
                orCountry: { ...prev.orCountry, error: false, state: true },
              });
          return prev;
        });
        break;
      case "orMobile":
        setForm({ ...form, orderer: { ...form.orderer, mobile: e.value } });
        setErrorForm((prev) => {
          const reg = /^[1-9]\d{8,16}$/;
          reg.test(e.value)
            ? (prev = {
                ...prev,
                orMobile: { ...prev.orMobile, error: false, state: true },
              })
            : (prev = {
                ...prev,
                orMobile: { ...prev.orMobile, error: true, state: true },
              });
          return prev;
        });
        break;
      case "gsFn":
        setForm({ ...form, guest: { ...form.guest, fullName: e.value } });
        setErrorForm((prev) => {
          e.value.length < 1
            ? (prev = {
                ...prev,
                gsFn: { ...prev.gsFn, error: true, state: true },
              })
            : (prev = {
                ...prev,
                gsFn: { ...prev.gsFn, error: false, state: true },
              });
          return prev;
        });
        break;
      case "gsCountry":
        setForm((prev) => {
          prev = {
            ...prev,
            guest: {
              ...prev.guest,
              country: e.value,
            },
          };
          return prev;
        });
        setErrorForm((prev) => {
          let found = false;
          if (country.find((el) => el.en === e.value)) found = true;
          if (country.find((el) => el.tw === e.value)) found = true;

          !found
            ? (prev = {
                ...prev,
                gsCountry: { ...prev.gsCountry, error: true, state: true },
              })
            : (prev = {
                ...prev,
                gsCountry: { ...prev.gsCountry, error: false, state: true },
              });
          return prev;
        });
        break;
      default:
        break;
    }
  };

  // animating bookForOther
  useEffect(() => {
    if (bookForOther === true) {
      bookForOtherRef.current?.classList.remove("scale-0");
      bookForOtherRef.current?.classList.remove("h-0");
      bookForOtherRef.current?.classList.add("scale-100");
      bookForOtherRef.current?.classList.add("h-full");
    } else {
      bookForOtherRef.current?.classList.add("h-0");
      bookForOtherRef.current?.classList.remove("scale-100");
      bookForOtherRef.current?.classList.remove("h-full");
      bookForOtherRef.current?.classList.add("scale-0");
    }
  }, [bookForOther]);

  // onNext function
  const onNext = () => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regMobile = /^[1-9]\d{8,16}$/;

    setErrorForm((prev) => {
      if (form.orderer.fullName.length < 1) {
        prev = { ...prev, orFn: { ...prev.orFn, error: true, state: true } };
        orFn.current?.focus();
      } else if (!regexEmail.test(form.orderer.email)) {
        prev = {
          ...prev,
          orEmail: { ...prev.orEmail, error: true, state: true },
        };
        orEmail.current?.focus();
      } else if (
        country.find((el) => el.en === form.orderer.country) === undefined &&
        country.find((el) => el.tw === form.orderer.country) === undefined
      ) {
        prev = {
          ...prev,
          orCountry: { ...prev.orCountry, error: true, state: true },
        };
        orCountry.current?.focus();
      } else if (!regMobile.test(form.orderer.mobile)) {
        prev = {
          ...prev,
          orMobile: { ...prev.orMobile, error: true, state: true },
        };
        orMobile.current?.focus();
      } else if (bookForOther && form.guest.fullName.length < 1) {
        prev = { ...prev, gsFn: { ...prev.gsFn, error: true, state: true } };
        gsFn.current?.focus();
      } else if (
        bookForOther &&
        country.find((el) => el.en === form.guest.country) === undefined &&
        country.find((el) => el.tw === form.guest.country) === undefined
      ) {
        prev = {
          ...prev,
          gsCountry: { ...prev.gsCountry, error: true, state: true },
        };
        gsCountry.current?.focus();
      } else {
        // No error do booking

        (async () => {
          setShowLoader(true);
          const config = {
            headers: {
              "Content-Type": "application/json",
              "x-siloah": "siloah",
            },
            method: "POST",
            body: JSON.stringify(form),
          };
          try {
            const result = await fetch(
              `${process.env.SERVER}/hotel/hotelBook/`,
              config
            );
            const dt = await result.json();
            console.log(dt);
            setPackage("null");
            setCartData("null");
            location.reload();
          } catch (error) {
            console.log(error);
          }

          setShowLoader(false);
        })();
      }
      return prev;
    });
  };

  return (
    <div className="container mx-auto p-2 lg:p-0">
      {loading.length > 0 ? (
        <div className="container mx-auto max-w-[1024px] p-2 lg:p-0 mt-5 flex flex-col lg:flex-row gap-5">
          <div className="left flex flex-col gap-5 border rounded border-luxgreen p-2 lg:p-5 w-full lg:w-5/12">
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
          <div className="right w-full lg:w-7/12 flex flex-col gap-5">
            <div
              id="orderer"
              className="border border-gray-400 bg-gray-50 rounded p-2"
            >
              <p className="text-xl text-luxgreen font-bold">
                {lang === "TW" ? "請填寫以下資訊" : "Let us know who you are"}
              </p>
              <div className="text-md mt-5 flex flex-col gap-3">
                <div>
                  <label htmlFor="orFn">
                    {lang === "TW" ? "英文名(同護照)" : "Full Name"}{" "}
                    <span className="text-pink-700 text-lg">*</span>
                  </label>
                  <input
                    ref={orFn}
                    className={`focus:outline-0 focus:ring-2 border rounded w-full p-2 mt-2 ${
                      errorForm.orFn.state === true
                        ? errorForm.orFn.error === true
                          ? "border-pink-700"
                          : "border-green-600"
                        : ""
                    }`}
                    type="text"
                    name="orFn"
                    id="orFn"
                    value={form.orderer.fullName}
                    onChange={(e) => onChange(e.currentTarget)}
                  />
                  {errorForm.orFn.error && (
                    <p className="text-sm text-pink-700">
                      {lang === "TW"
                        ? errorForm.orFn.msg.tw
                        : errorForm.orFn.msg.en}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="orEmail">
                    {lang === "TW" ? "電子信箱" : "Email"}{" "}
                    <span className="text-pink-700 text-lg">*</span>
                  </label>
                  <input
                    ref={orEmail}
                    className={`focus:outline-0 focus:ring-2 border rounded w-full p-2 mt-2 ${
                      errorForm.orEmail.state === true
                        ? errorForm.orEmail.error === true
                          ? "border-pink-700"
                          : "border-green-600"
                        : ""
                    }`}
                    type="email"
                    name="orEmail"
                    id="orEmail"
                    value={form.orderer.email}
                    onChange={(e) => onChange(e.currentTarget)}
                  />
                  {errorForm.orEmail.error && (
                    <p className="text-sm text-pink-700">
                      {lang === "TW"
                        ? errorForm.orEmail.msg.tw
                        : errorForm.orEmail.msg.en}
                    </p>
                  )}
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <label htmlFor="orCountry">
                      {lang === "TW" ? "居住地" : "Country"}{" "}
                      <span className="text-pink-700 text-lg">*</span>
                    </label>
                    <input
                      ref={orCountry}
                      list="listCountry"
                      className={`focus:outline-0 focus:ring-2 border rounded w-full p-2 mt-2 ${
                        errorForm.orCountry.state === true
                          ? errorForm.orCountry.error === true
                            ? "border-pink-700"
                            : "border-green-600"
                          : ""
                      }`}
                      name="orCountry"
                      id="orCountry"
                      value={form.orderer.country}
                      onChange={(e) => onChange(e.currentTarget)}
                      onClick={() =>
                        setForm({
                          ...form,
                          orderer: { ...form.orderer, country: "" },
                        })
                      }
                    ></input>
                    <datalist id="listCountry">
                      {lang === "TW"
                        ? country.map((o) => (
                            <option key={o.mobileCode} value={o.tw} />
                          ))
                        : country.map((o) => (
                            <option key={o.mobileCode} value={o.en} />
                          ))}
                    </datalist>
                    {errorForm.orCountry.error && (
                      <p className="text-sm text-pink-700">
                        {lang === "TW"
                          ? errorForm.orCountry.msg.tw
                          : errorForm.orCountry.msg.en}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label htmlFor="orMobile">
                      {lang === "TW" ? "電話號碼" : "Mobile"}{" "}
                      <span className="text-pink-700 text-lg">*</span>
                    </label>
                    <div className="w-full mt-2 flex ">
                      <span className="w-2/6 p-2 text-center border-l border-t border-b">
                        {form.orderer.mobileCode}
                      </span>
                      <input
                        className={`focus:outline-0 focus:ring-2 border rounded-r w-full p-2 ${
                          errorForm.orMobile.state === true
                            ? errorForm.orMobile.error === true
                              ? "border-pink-700"
                              : "border-green-600"
                            : ""
                        }`}
                        ref={orMobile}
                        type="text"
                        name="orMobile"
                        id="orMobile"
                        value={form.orderer.mobile}
                        onChange={(e) => onChange(e.currentTarget)}
                      />
                    </div>
                    {errorForm.orMobile.error && (
                      <p className="text-sm text-pink-700">
                        {lang === "TW"
                          ? errorForm.orMobile.msg.tw
                          : errorForm.orMobile.msg.en}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="bookForOther"
                    id="bookForOther"
                    onChange={(e) => setBookForOther(e.currentTarget.checked)}
                  />
                  <span className="ml-2">
                    {lang === "TW" ? "為他人訂房" : "Book for someone else"}
                  </span>

                  <div
                    ref={bookForOtherRef}
                    className="overflow-hidden transform origin-top-left transition-all duration-700 ease-out scale-0 h-0 bg-gray-100 p-2 lg:p-5"
                  >
                    <p className="text-lg font-semi">
                      {lang === "TW" ? "住客資料" : "Guest Information"}
                    </p>
                    <div className="mt-2 flex flex-col lg:flex-row justify-between gap-5">
                      <div className="w-full">
                        <label htmlFor="gsFn">
                          {lang === "TW" ? "英文名(同護照)" : "Full Name"}{" "}
                          <span className="text-pink-700 text-lg">*</span>
                        </label>
                        <input
                          ref={gsFn}
                          className={`focus:outline-0 focus:ring-2 border rounded w-full p-2 mt-2 ${
                            errorForm.gsFn.state === true
                              ? errorForm.gsFn.error === true
                                ? "border-pink-700"
                                : "border-green-600"
                              : ""
                          }`}
                          type="text"
                          name="gsFn"
                          id="gsFn"
                          value={form.guest.fullName}
                          onChange={(e) => onChange(e.currentTarget)}
                        />
                        {errorForm.gsFn.error && (
                          <p className="text-sm text-pink-700">
                            {lang === "TW"
                              ? errorForm.gsFn.msg.tw
                              : errorForm.gsFn.msg.en}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <label htmlFor="gsCountry">
                          {lang === "TW" ? "居住地" : "Country"}{" "}
                          <span className="text-pink-700 text-lg">*</span>
                        </label>
                        <input
                          ref={gsCountry}
                          list="listCountry"
                          className={`focus:outline-0 focus:ring-2 border rounded w-full p-2 mt-2 ${
                            errorForm.gsCountry.state === true
                              ? errorForm.gsCountry.error === true
                                ? "border-pink-700"
                                : "border-green-600"
                              : ""
                          }`}
                          name="gsCountry"
                          id="gsCountry"
                          value={form.guest.country}
                          onChange={(e) => onChange(e.currentTarget)}
                          onClick={() =>
                            setForm({
                              ...form,
                              guest: { ...form.guest, country: "" },
                            })
                          }
                        ></input>
                        <datalist id="listCountry">
                          {lang === "TW"
                            ? country.map((o) => (
                                <option key={o.mobileCode} value={o.tw} />
                              ))
                            : country.map((o) => (
                                <option key={o.mobileCode} value={o.en} />
                              ))}
                        </datalist>
                        {errorForm.gsCountry.error && (
                          <p className="text-sm text-pink-700">
                            {lang === "TW"
                              ? errorForm.gsCountry.msg.tw
                              : errorForm.gsCountry.msg.en}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="p-2 bg-luxorange hover:bg-orange-400 text-gray-100 w-full rounded"
                    onClick={() => onNext()}
                  >
                    {lang === "TW" ? "下一步" : "Next"}
                  </button>
                </div>
              </div>
            </div>
            {/* <div> {JSON.stringify(form)}</div>{" "} */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen -mt-[110px]">
          <p className="text-xl font-bold">
            {lang === "TW" ? "沒有包存在" : "No package is exist"}
          </p>
          <div className="mt-5">
            <Link href={"/"}>
              <button className="text-gray-100 bg-luxorange text-lg py-2 px-5 rounded hover:bg-orange-400">
                {lang === "TW" ? "找飯店" : "Search Hotel"}
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* <div>{JSON.stringify(loading)}</div>
      // <p>{JSON.stringify(form)}</p>
      <p className="mt-5">{JSON.stringify(decode(packs))}</p> */}
      {/* <p>{JSON.stringify(form)}</p> */}
    </div>
  );
}
