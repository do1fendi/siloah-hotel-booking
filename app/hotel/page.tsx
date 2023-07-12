"use client";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useLangStore from "@/store/lang";
import useCurrencyStore from "@/store/currency";
import Search from "@/components/Search";
import HotelAvailableList from "@/components/HotelAvailableList";
import Loader from "@/components/Loader";
import HotelRoomList from "@/components/HotelRoomList";

type querySearchType = {
  searchCode: string;
  room: number;
  adult: number;
  children: number;
  childAge: string;
  checkIn: string;
  checkOut: string;
  currency: string;
  lang: string;
};

export default function Home() {
  const [showLoader, setShowLoader] = useState<boolean>(false);
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
    childAge: "",
    checkIn: "",
    checkOut: "",
    currency: currency,
    lang: "TW",
  });
  const [roomData, setRoomData] = useState<any>(null);

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
        checkIn: param.get("checkIn")!,
        checkOut: param.get("checkOut")!,
        currency: currency,
        lang: lang,
      };
      runApi(prev);
      return prev;
    });
  }, [param, lang, currency]);

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
                      .Rooms.Room[i],
                  };
                }
              );
            console.log(arrMerge);

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

            prev = arrRoomType
            return prev;
          });
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
      <div className="border border-teal-500 rounded p-2">
        <h1 className="text-xl font-bold">
          {hotelDetailData !== null &&
          hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo.HotelInfo.HotelName
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
                  .HotelDescriptiveInfo.LocationInfo.Address.AddressLine1 + ", "
              : ""}
          </span>
          <span>
            {hotelDetailData !== null &&
            hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
              .HotelDescriptiveInfo.LocationInfo.Address.CityName.value
              ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                  .HotelDescriptiveInfo.LocationInfo.Address.CityName.value +
                ", "
              : ""}
          </span>
          <span>
            {hotelDetailData !== null &&
            hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
              .HotelDescriptiveInfo.LocationInfo.Address.CountryName.value
              ? hotelDetailData.GetHotelDetailsRS.HotelDetailsInfo
                  .HotelDescriptiveInfo.LocationInfo.Address.CountryName.value +
                ", "
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
      <div id="roomList">
            <HotelRoomList data={roomData} />
      </div>
      {/* <div className="mt-5 shadow-lg p-5">
        <Search />
      </div> */}
      {/* {JSON.stringify(hotelDetailData)} */}
      <Loader show={showLoader} />
    </div>
  );
}
