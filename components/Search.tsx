// import DatePicker from "react-datepicker";
import DatePicker from "react-tailwindcss-datepicker";
import { useState, useEffect, useRef } from "react";
import SearchOccupation from "./SearchOccupation";
import useShowHandlerStore from "@/store/showHandler";
import { BsSearch } from "react-icons/Bs";
import useLangStore from "@/store/lang";
import { IoIosArrowDropdown } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

type occupationType = {
  room: number;
  adult: number;
  children: number;
  childAges: string;
};

type valueDateType = {
  startDate: Date;
  endDate: Date;
};

export default function Search({}) {
  // const [startDate, setStartDate] = useState(new Date());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const param = useSearchParams();
  const { lang, setLang } = useLangStore();
  const [searchCity, setSearchCity] = useState<string>("");
  const { setShowOccupation } = useShowHandlerStore((state) => state);
  const [occupation, setOccupation] = useState<occupationType>();
  const [valueDate, setValueDate] = useState<valueDateType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    // init date
    const dtStart = new Date();
    dtStart.setDate(dtStart.getDate() + 7);

    const dtEnd = new Date();
    dtEnd.setDate(dtStart.getDate() + 1);

    setValueDate({ startDate: dtStart, endDate: dtEnd });
  }, []);

  // if date change
  const onDateChange = (newValue: valueDateType) => {
    // console.log("newValue:", newValue);
    setValueDate({
      startDate: new Date(newValue.startDate),
      endDate: new Date(newValue.endDate),
    });
  };

  const onCityChange = (ev: HTMLInputElement) => {
    setSearchCity((prev) => (prev = ev.value));
  };

  // get data from database
  useEffect(() => {
    if (param.get("city") !== null) setSearchCity(param.get("city")!);   
    if (
      param.get("room") !== null &&
      param.get("adult") !== null &&
      param.get("children") !== null
    )
      setOccupation({
        ...occupation,
        room: parseInt(param.get("room")!),
        adult: parseInt(param.get("adult")!),
        children: parseInt(param.get("children")!),
        childAges: param.get("children")!,
      });
  }, [param]);

  const maxDate = () => {
    const curDate = new Date();
    curDate.setFullYear(curDate.getFullYear() + 1);
    curDate.setDate(curDate.getDate());
    // console.log(curDate);
    return curDate;
  };

  const onSearch = () => {
    if (searchCity === "") searchInputRef.current?.focus();
    else {
      //2023-09-18
      const checkIn = `${new Date(valueDate.startDate).getFullYear()}-${(
        valueDate.startDate?.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${valueDate.startDate
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;
      const checkOut = `${new Date(valueDate.endDate).getFullYear()}-${(
        valueDate.endDate?.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${valueDate.endDate
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;
      router.push(
        `/search/?city=${searchCity}&checkIn=${checkIn}&checkOut=${checkOut}&room=${occupation?.room}&adult=${occupation?.adult}&children=${occupation?.children}&childAges=${occupation?.childAges}`
      );
    }
  };

  return (
    <>
      <div>
        <label className="relative focus-within:text-teal-500 block">
          <BsSearch className="pointer-events-none w-6 h-6 absolute top-3 transform left-3"></BsSearch>
          <input
            ref={searchInputRef!}
            type="text"
            placeholder="City"
            className="focus:text-gray-600 focus:caret-teal-500  pl-14 border text-base lg:text-lg p-2 rounded mb-2 border-gray-300 w-full focus:ring-teal-500 focus:border-teal-500 shadow-sm form-input"
            onChange={(ev) => onCityChange(ev.target)}
            value={searchCity}
          />
        </label>
      </div>
      <div className="flex justify-between items-center flex-col lg:flex-row gap-2 lg:gap-5">
        <div className="datePicker w-full lg:w-1/2">
          <DatePicker
            value={valueDate}
            onChange={onDateChange as any}
            primaryColor={"teal"}
            startFrom={valueDate.startDate}
            minDate={new Date()}
            maxDate={maxDate()}
            inputClassName="w-full p-2 border rounded focus:ring-0 text-gray-500"
            // toggleClassName="absolute bg-teal-500 rounded-r text-gray-100 right-0 h-full px-3 text-gray-100  disabled:opacity-40 disabled:cursor-not-allowed"
          />
        </div>
        <div className="relative border border-gray-300 rounded w-full lg:w-1/2 h-10 lg:h-11 flex justify-between items-center px-2">
          <div className="text-sm">
            <span className="mr-2 border border-gray-600 text-gray-600 rounded-xl px-2 py-[2px]">
              {occupation?.room}{" "}
              {lang === "TW"
                ? "間客房"
                : occupation!.room != undefined && occupation!.room > 1
                ? "Rooms"
                : "Room"}
            </span>
            <span className="mr-2 border border-gray-600  text-gray-600 rounded-xl px-2 py-[2px]">
              {occupation?.adult}{" "}
              {lang === "TW"
                ? "位大人"
                : occupation!.adult > 1
                ? "Adults"
                : "Adult"}
            </span>
            {occupation !== undefined && occupation!.children > 0 ? (
              <span className="mr-2 border border-gray-600 text-gray-600 rounded-xl px-2 py-[2px]">
                {occupation!.children} {lang === "TW" ? "位兒童" : "Children"}
              </span>
            ) : (
              ""
            )}
            {occupation !== undefined && occupation!.childAges != "" ? (
              <span className="mr-2 border border-gray-600 text-gray-600 rounded-xl px-2 py-[2px]">
                {occupation!.childAges}
              </span>
            ) : (
              ""
            )}
          </div>
          <button onClick={() => setShowOccupation(true)}>
            <IoIosArrowDropdown size={32} color="gray" />
          </button>
          <SearchOccupation setOccupation={setOccupation} />
        </div>
      </div>

      <button
        className="w-full bg-orange-500 hover:bg-orange-400 text-gray-100 mt-5 p-2 rounded text-lg"
        onClick={onSearch}
      >
        {lang === "TW" ? "搜 出 好 價" : "SEARCH"}{" "}
      </button>
    </>
  );
}
