"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import useDictionaryStore from "@/store/dictionary";
import Search from "@/components/Search";
import HotelAvailableList from "@/components/HotelAvailableList";
import Loader from "@/components/Loader";
import HotelRoomList from "@/components/HotelRoomList";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import useCheckTimeStore from "@/store/checkTime";

type querySearchType = {
  searchCode: string;
  room: number;
  adult: number;
  children: number;
  childAges: string;
  checkIn: string;
  checkOut: string;
  currency: string;
  lang: string;
};

type hotelPolicyType = {
  checkIn: string;
  checkOut: string;
};

export default function Home() {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { dictionary } = useDictionaryStore((state) => state);
  const { userData, setUserData } = useUserStore((state) => state);
  const [hotelDetailData, setHotelDetailData] = useState<any | null>(null);
  const { currency } = useCurrencyStore((state) => state);
  const { lang } = useLangStore((state) => state);
  const param = useSearchParams();
  const [querySearch, setQuerySearch] = useState<querySearchType>({
    searchCode: "",
    room: 0,
    adult: 0,
    children: 0,
    childAges: "",
    checkIn: "",
    checkOut: "",
    currency: "",
    lang: "",
  });
  const [roomData, setRoomData] = useState<any>(null);
  const [hotelPolicy, setHotelPolicy] = useState<hotelPolicyType>({
    checkIn: "",
    checkOut: "",
  });
  const { checkInTime, checkOutTime, setCheckTime } = useCheckTimeStore(
    (state) => state
  );

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
    setQuerySearch((prev) => {
      prev = {
        ...querySearch,
        searchCode: param.get("searchCode")!,
        room: parseInt(param.get("room")!),
        adult: parseInt(param.get("adult")!),
        children: parseInt(param.get("children")!),
        childAges: param.get("childAges")!,
        checkIn: param.get("checkIn")!,
        checkOut: param.get("checkOut")!,
        currency: param.get("currency")!,
        lang: param.get("lang")!,
      };

      // run api
      runApi(prev);

      return prev;
    });
  }, [param, lang, currency]);

  // convert time to am pm, original format 1200
  const convertTime = (tm: string) => {
    let h = tm.slice(0, 2);
    const m = tm.slice(2, 4);
    let amPm = "";

    if (parseInt(h) >= 12 && parseInt(h) < 24) {
      amPm = "PM";
      h = parseInt(h) === 12 ? "12" : (parseInt(h) - 12).toString();
    } else if (parseInt(h) === 24) {
      amPm = "AM";
      h = "12";
    } else amPm = "AM";
    return `${h}:${m} ${amPm}`;
  };

  const runApi = (dt: querySearchType) => {
    (async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-siloah": "siloah",
        },
        method: "POST",
        body: JSON.stringify(dt),
      };
      try {
        const result = await fetch(
          `${process.env.SERVER}/hotel/hotelSearch/detail`,
          config
        );
        const dt = await result.json();
        console.log(dt);
        setHotelDetailData(dt.data);
        // response room and roomRate objects are seperated, so combine them together
        if (
          dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelRateInfo &&
          dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelRateInfo.RateInfos &&
          dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelRateInfo.RateInfos
            .ConvertedRateInfo
        ) {
          setRoomData((prev: any) => {
            // merge rateInfo and room
            const arrMerge =
              dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelRateInfo.RateInfos.ConvertedRateInfo.map(
                (rate: any, i: number) => {
                  return {
                    ...rate,
                    ...dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelRateInfo
                      .Rooms.Room[i], ...dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelInfo
                  };
                }
              );
            arrMerge.reverse();
            // console.log(arrMerge);

            // create array key of roomTypeCode
            let arrRoomType = arrMerge.map((room: any) => room.RoomTypeCode);
            // remove duplicate keys of room type
            arrRoomType = [...new Set(arrRoomType)];
            // create new array based on room type code, format like [{roomType:"",roomList:[]}]
            arrRoomType = arrRoomType.map((typeCode: any) => {
              return {
                roomType: typeCode,
                roomList: arrMerge.filter(
                  (arr: any) => arr.RoomTypeCode === typeCode
                ),
              };
            });

            console.log(arrRoomType);
            // const arrBasedOnRoomType =

            prev = arrRoomType;
            return prev;
          });
        }

        // Set Hotel Policy
        if (
          // dt.data.GetHotelDetailsRS &&
          // dt.data.GetHotelDetailsRS.HotelDetailsInfo &&
          // dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelDescriptiveInfo &&
          // dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelDescriptiveInfo
          //   .PropertyInfo &&
          // dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelDescriptiveInfo
          //   .PropertyInfo.Polices &&
          dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelDescriptiveInfo
            .PropertyInfo.Policies.Policy.length > 0
        ) {
          dt.data.GetHotelDetailsRS.HotelDetailsInfo.HotelDescriptiveInfo.PropertyInfo.Policies.Policy.forEach(
            (p: any) => {
              setHotelPolicy((prev) => {
                if (p.Text.Type === "CheckOut") {
                  prev = { ...prev, checkOut: p.Text.value };
                } else if (p.Text.Type === "CheckIn") {
                  prev = { ...prev, checkIn: p.Text.value };
                }
                setCheckTime(
                  convertTime(prev.checkIn),
                  convertTime(prev.checkOut)
                );
                return prev;
              });
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
      // if (dt.status === "Error") {
      //   setUserData(null);
      //   window.location.reload();
      // }
      setShowLoader(false);
    })();
  };

  return (
    <div className="container mx-auto max-w-[1024px] p-2 lg:p-5">
      {hotelDetailData !== null && (
        <div>
          <div className="border border-luxgreen p-2">
            <h1 className="text-xl font-bold">
              {hotelDetailData !== null &&
              hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo.HotelInfo
                .HotelName
                ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo.HotelInfo
                    .HotelName
                : ""}
            </h1>
            <p className="text-sm">
              <span>
                {hotelDetailData !== null &&
                hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                  .HotelDescriptiveInfo.LocationInfo.Address.AddressLine1
                  ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                      .HotelDescriptiveInfo.LocationInfo.Address.AddressLine1 +
                    ", "
                  : ""}
              </span>
              <span>
                {hotelDetailData !== null &&
                hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                  .HotelDescriptiveInfo.LocationInfo.Address.CityName.value
                  ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                      .HotelDescriptiveInfo.LocationInfo.Address.CityName
                      .value + ", "
                  : ""}
              </span>
              <span>
                {hotelDetailData !== null &&
                hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                  .HotelDescriptiveInfo.LocationInfo.Address.CountryName.value
                  ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                      .HotelDescriptiveInfo.LocationInfo.Address.CountryName
                      .value + ", "
                  : ""}
              </span>
              <span>
                {hotelDetailData !== null &&
                hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                  .HotelDescriptiveInfo.LocationInfo.Address.PostalCode
                  ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                      .HotelDescriptiveInfo.LocationInfo.Address.PostalCode
                  : ""}
              </span>
            </p>
            <div className="p-2">
              <p className="border-b"></p>
            </div>
            <p className="text-sm lowercase">
              {hotelDetailData !== null &&
              hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                .HotelDescriptiveInfo.Descriptions.Description.length > 0
                ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo.HotelDescriptiveInfo.Descriptions.Description.filter(
                    (a: any) => a.Text.Type == "ShortDescription"
                  )[0].Text.value
                : ""}
            </p>
          </div>
          {/* <div className="mt-5">
            <p className="text-xs text-gray-500">
              {lang === "TW"
                ? "價格不包含稅金和附加費用"
                : "Prices do not include taxes & fees"}
            </p>
          </div> */}
          <div id="roomList" className="mt-2">
            <HotelRoomList data={roomData} />
          </div>
          <div id="hotelAmenity" className="mt-5 border border-luxgreen p-2">
            <p className="text-lg text-luxgreen font-bold mb-5">
              {lang === "TW" ? "飯店設施" : "Hotel Amenities"}
            </p>
            {hotelDetailData.GetHotelDetailsRS &&
              hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo &&
              hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                .HotelDescriptiveInfo &&
              hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                .HotelDescriptiveInfo.Amenities &&
              hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                .HotelDescriptiveInfo &&
              hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo.HotelDescriptiveInfo.Amenities.Amenity.map(
                (amenity: any, i: number) => (
                  <span className="mr-3 text-sm" key={i}>
                    {lang === "TW"
                      ? dictionary.propertyAmenity.filter(
                          (dc: any) => dc.code === amenity.Code
                        )[0]?.tw
                      : dictionary.propertyAmenity.filter(
                          (dc: any) => dc.code === amenity.Code
                        )[0]?.en}
                  </span>
                )
              )}
          </div>
          <div id="houseRules" className="mt-5 border border-luxgreen p-2">
            <p className="text-lg text-luxgreen font-bold mb-5">
              {lang === "TW" ? "家庭規則" : "House Rules"}
            </p>

            <div className="flex">
              <div className="flex flex-col gap-5 w-full lg:w-3/12">
                <p className="flex gap-2 items-center">
                  <LuLogIn /> <span>Check-in</span>
                </p>
                <p className="border"></p>
                <p className="flex gap-2 items-center">
                  <LuLogOut /> <span>Check-out</span>
                </p>
              </div>

              <div className="flex flex-col gap-5 w-full lg:w-9/12">
                <p>
                  {hotelPolicy.checkIn !== ""
                    ? convertTime(hotelPolicy.checkIn)
                    : ""}
                </p>
                <p className="border w-full"></p>
                <p>
                  {hotelPolicy.checkOut !== ""
                    ? convertTime(hotelPolicy.checkOut)
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Loader show={showLoader} />
    </div>
  );
}
