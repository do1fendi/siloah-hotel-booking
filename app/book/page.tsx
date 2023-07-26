"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import Search from "@/components/Search";
import HotelAvailableList from "@/components/HotelAvailableList";
import Loader from "@/components/Loader";
import useCheckTimeStore from "@/store/checkTime";
import useCountryStore from "@/store/country";

type queryUrlType = {
  room: number;
  adult: number;
  children: number;
  checkIn: string;
  checkOut: string;
  rateKey: string;
};

type formType = {
  orderer: {
    fullName: string;
    email: string;
    country: string;
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
  };
};

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
};

const optionList = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "white", label: "White" },
];

export default function Book() {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { userData, setUserData } = useUserStore((state) => state);
  const { currency } = useCurrencyStore((state) => state);
  const { lang, setLang } = useLangStore((state) => state);
  const param = useSearchParams();
  const router = useRouter();
  const [queryUrl, setQueryUrl] = useState<queryUrlType>({
    room: 0,
    adult: 0,
    children: 0,
    checkIn: "",
    checkOut: "",
    rateKey: "",
  });
  const { checkInTime, checkOutTime } = useCheckTimeStore((state) => state);
  const [apiData, setApiData] = useState<any>();
  const [form, setForm] = useState<formType>({
    orderer: {
      fullName: "",
      email: "",
      country: "",
      mobile: "",
    },
    guest: {
      fullName: "",
      country: "",
    },
    bookingDetail: {
      hotelCode: "",
      hotelName: "",
      roomType: "",
      bookingKey: "",
      checkIn: "",
      checkOut: "",
      noOfRoom: 0,
      noOfNight: 0,
      amountAfterTax: 0,
      amountBeforeTax: 0,
      averageNightlyRate: 0,
      totalAmount: 0,
      currency: "",
    },
  });
  const { country } = useCountryStore();

  const orFn = useRef<HTMLInputElement>(null);
  const orEmail = useRef<HTMLInputElement>(null);
  const orCountry = useRef<HTMLInputElement>(null);
  const orMobile = useRef<HTMLInputElement>(null);

  const [errorForm, setErrorForm] = useState<formErrorType>({
    orFn: {
      error: false,
      state: false,
      msg: {
        en: "Please entery your full name",
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
        en: "Type the correct mobile",
        tw: "輸入正確的手機號碼",
      },
    },
  });

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
  }, []);

  useEffect(() => {
    setShowLoader(true);

    try {
      const query = JSON.parse(atob(param.get("id")!));
      // console.log(query)
      setLang(query.lang);
      setQueryUrl((prev) => {
        prev = {
          ...queryUrl,
          room: parseInt(query.room),
          adult: parseInt(query.adult),
          children: parseInt(query.children),
          checkIn: query.checkIn,
          checkOut: query.checkOut,
          rateKey: query.rateKey,
        };
        runApi(prev.rateKey);
        return prev;
      });
    } catch (error) {
      alert(error);
      router.push("/");
    }
  }, [param]);

  const runApi = (rate: string) => {
    (async () => {
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
        console.log(dt);
        setApiData(dt.data.HotelPriceCheckRS.PriceCheckInfo);
      } catch (error) {
        console.log(error);
        alert("There is No Available Hotel");
        // router.push("/");
      }
      // if (dt.status === "Error") {
      //   setUserData(null);
      //   window.location.reload();
      // }
      setShowLoader(false);
    })();
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

  const countTotalNight = (): number => {
    let date_1 = new Date(queryUrl.checkOut);
    let date_2 = new Date(queryUrl.checkIn);

    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    return TotalDays;

    // return lang === "TW"
    //   ? `${TotalDays} 晚`
    //   : `${TotalDays} ${TotalDays > 1 ? "nights" : "night"}`;
  };

  // set init form, after received from API
  const handleForm = (dt: any) => {
    if (dt) {
      // set form
      // if (dt.BookingKey && dt.ConvertedCurrencyCode)
      //   setForm({
      //     ...form,
      //     bookingDetail: {
      //       ...form.bookingDetail,
      //       bookingKey: dt.BookingKey,
      //       currency: dt.ConvertedCurrencyCode,
      //     },
      //   });
      // if (dt.HotelInfo?.HotelCode && dt.HotelInfo?.HotelName)
      //   setForm({
      //     ...form,
      //     bookingDetail: {
      //       ...form.bookingDetail,
      //       hotelCode: dt.HotelInfo?.HotelCode,
      //       hotelName: dt.HotelInfo?.HotelName,
      //     },
      //   });
    }
  };

  useEffect(() => {
    if (apiData) {
      setForm((prev) => {
        if (apiData.BookingKey) {
          prev = {
            ...prev,
            bookingDetail: {
              ...prev.bookingDetail,
              bookingKey: apiData.BookingKey,
            },
          };
        }
        if (apiData.HotelInfo?.HotelCode && apiData.HotelInfo?.HotelName) {
          prev = {
            ...prev,
            bookingDetail: {
              ...prev.bookingDetail,
              hotelCode: apiData.HotelInfo?.HotelCode,
              hotelName: apiData.HotelInfo?.HotelName,
            },
          };
        }

        if (apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo) {
          prev = {
            ...prev,
            bookingDetail: {
              ...prev.bookingDetail,
              currency:
                apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0]
                  .CurrencyCode,
              checkIn:
                apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0]
                  .StartDate,
              checkOut:
                apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0].EndDate,
              amountAfterTax:
                apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0]
                  .AmountAfterTax,
              amountBeforeTax:
                apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0]
                  .AmountBeforeTax,
              averageNightlyRate:
                apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0]
                  .AverageNightlyRate,
              noOfNight: countTotalNight(),
              noOfRoom:
                apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                  .AvailableQuantity === 1
                  ? apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                      .AvailableQuantity
                  : queryUrl.room,
              totalAmount:
                (apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                  .AvailableQuantity === 1
                  ? apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                      .AvailableQuantity
                  : queryUrl.room) *
                apiData.HotelRateInfo?.RateInfos?.ConvertedRateInfo[0]
                  .AmountAfterTax,
            },
          };
        } else {
          prev = {
            ...prev,
            bookingDetail: {
              ...prev.bookingDetail,
              currency:
                apiData.HotelRateInfo?.RateInfos?.RateInfo[0].CurrencyCode,
              checkIn: apiData.HotelRateInfo?.RateInfos?.RateInfo[0].StartDate,
              checkOut: apiData.HotelRateInfo?.RateInfos?.RateInfo[0].EndDate,
              amountAfterTax:
                apiData.HotelRateInfo?.RateInfos?.RateInfo[0].AmountAfterTax,
              amountBeforeTax:
                apiData.HotelRateInfo?.RateInfos?.RateInfo[0].AmountBeforeTax,
              averageNightlyRate:
                apiData.HotelRateInfo?.RateInfos?.RateInfo[0]
                  .AverageNightlyRate,
              noOfNight: countTotalNight(),
              noOfRoom:
                apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                  .AvailableQuantity === 1
                  ? apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                      .AvailableQuantity
                  : queryUrl.room,
              totalAmount:
                (apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                  .AvailableQuantity === 1
                  ? apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                      .AvailableQuantity
                  : queryUrl.room) *
                apiData.HotelRateInfo?.RateInfos?.RateInfo[0].AmountAfterTax,
            },
          };
        }

        if (
          apiData.HotelRateInfo?.Rooms?.Room &&
          apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan
        ) {
          prev = {
            ...prev,
            bookingDetail: {
              ...prev.bookingDetail,
              roomType:
                apiData.HotelRateInfo?.Rooms?.Room[0].RatePlans.RatePlan[0]
                  .RatePlanName,
            },
          };
        }

        return prev;
      });
    }
  }, [apiData]);

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
        setForm({
          ...form,
          orderer: {
            ...form.orderer,
            country: e.value,
            mobile:
              lang === "TW" && e.value !== null
                ? country.filter((c) => c.tw === e.value).length > 0
                  ? country.filter((c) => c.tw === e.value)[0].mobileCode
                  : ""
                : country.filter((c) => c.en === e.value).length > 0
                ? country.filter((c) => c.en === e.value)[0].mobileCode
                : "",
          },
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
        break;

      default:
        break;
    }
  };

  return (
    <div className="container mx-auto max-w-[1024px] p-2 lg:p-0 mt-5">
      {/* <div className="mt-5 shadow-lg p-5">{JSON.stringify(queryUrl)}</div> */}
      {apiData && (
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="left w-full lg:w-5/12">
            <div className="w-full border rounded p-2">
              <p className="font-bold text-luxgreen text-lg">
                {lang === "TW" ? "您的訂房資訊" : "Your booking details"}
              </p>
              <div className="grid grid-cols-2 mt-5">
                <div>
                  <p>{lang === "TW" ? "入住時間" : "Check-in"}</p>
                  <p className="font-bold">{convertDate(queryUrl.checkIn)}</p>
                  <p className="text-sm">{checkInTime}</p>
                </div>
                <div>
                  <p className="px-2">
                    {lang === "TW" ? "退房時間" : "Check-out"}
                  </p>
                  <p className="font-bold border-l px-2">
                    {convertDate(queryUrl.checkOut)}
                  </p>
                  <p className="border-l px-2 text-sm">{checkOutTime}</p>
                </div>
              </div>
              <div className="mt-5">
                <p>{lang === "TW" ? "總共入住：" : "Total length of stay:"}</p>
                <p className="font-bold">
                  {" "}
                  {lang === "TW"
                    ? `${countTotalNight()} 晚`
                    : `${countTotalNight()} ${
                        countTotalNight() > 1 ? "nights" : "night"
                      }`}
                </p>
              </div>
              <div className="divider px-2 py-5">
                <p className="border-b"></p>
              </div>
              <div>
                <p>{lang === "TW" ? "已選擇" : "You selected"}</p>
                <p className="font-bold">
                  {queryUrl.room}{" "}
                  {lang === "TW"
                    ? "間客房"
                    : queryUrl.room > 1
                    ? "rooms"
                    : "room"}{" "}
                  for {queryUrl.adult}{" "}
                  {lang === "TW"
                    ? "位成人"
                    : queryUrl.adult > 1
                    ? "adults"
                    : "adult"}
                  {queryUrl.children > 0
                    ? lang === "TW"
                      ? `, ${queryUrl.children} 位孩童`
                      : `, ${queryUrl.children} child`
                    : ""}
                </p>
                <p>{form.bookingDetail.roomType}</p>
              </div>
            </div>
            <div className="w-full border rounded p-2 mt-2">
              <p className="font-bold text-luxgreen text-lg">
                {lang === "TW" ? "房價明細" : "Your price summary"}
              </p>
              <div className="flex justify-between mt-5">
                <div>
                  <p>
                    {lang === "TW"
                      ? `房價 ${countTotalNight()} 晚`
                      : `Price for ${countTotalNight()} ${
                          countTotalNight() > 1 ? "nights" : "night"
                        }`}
                  </p>
                  <p>{lang === "TW" ? `房間數量` : `No of room(s)`}</p>
                </div>
                <div className="text-right">
                  <p>
                    <span className="text-xs">
                      {form.bookingDetail.currency === "TWD" ? "NT$ " : "$ "}
                    </span>
                    {form.bookingDetail.amountAfterTax
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p className="border-b mb-5">{form.bookingDetail.noOfRoom}</p>
                  <p>
                    <span className="mr-5">
                      {lang === "TW" ? "總價" : "Total amount"}
                    </span>
                    <span className="text-xs">
                      {form.bookingDetail.currency === "TWD" ? "NT$ " : "$ "}
                    </span>
                    <span className="text-lg text-pink-700">
                      {form.bookingDetail.totalAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="right w-full lg:w-7/12 flex flex-col gap-5">
            <div className="border rounded p-2">
              <p className="text-xl text-luxgreen font-bold">
                {form.bookingDetail.hotelName}
              </p>
              {apiData?.HotelInfo?.LocationInfo?.Address?.AddressLine1 ? (
                <p className="mt-2">
                  {apiData?.HotelInfo?.LocationInfo?.Address?.AddressLine1},{" "}
                  {apiData?.HotelInfo?.LocationInfo?.Address?.CityName.value},{" "}
                  {apiData?.HotelInfo?.LocationInfo?.Address?.CountryName.value}
                  , {apiData?.HotelInfo?.LocationInfo?.Address?.PostalCode}
                </p>
              ) : (
                ""
              )}
            </div>
            <div id="orderer" className="border rounded p-2">
              <p className="text-xl text-luxgreen font-bold">
                {lang === "TW" ? "請填寫以下資訊" : "Let us know who you are"}
              </p>
              <form className="text-md mt-5 flex flex-col gap-3">
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
                    ></input>
                    <datalist id="listCountry">
                      {lang === "TW"
                        ? country.map((o) => <option value={o.tw} />)
                        : country.map((o) => <option value={o.en} />)}
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
                    <input
                      ref={orMobile}
                      className="border rounded w-full p-2 mt-2"
                      type="text"
                      name="orMobile"
                      id="orMobile"
                      value={form.orderer.mobile}
                      onChange={(e) => onChange(e.currentTarget)}
                    />
                  </div>
                </div>
              </form>
            </div>
            {/* <div> {JSON.stringify(form)}</div>{" "} */}
          </div>

          {/* {JSON.stringify(queryUrl)} */}
        </div>
      )}

      <Loader show={showLoader} />
    </div>
  );
}
