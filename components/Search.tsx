import DatePicker from "react-datepicker";
import { useState, useEffect, useRef } from "react";
import SearchOccupation from "./SearchOccupation";
import useShowHandlerStore from "@/store/showHandler";
import { BsSearch } from "react-icons/Bs";
import useLangStore from "@/store/lang";
import { IoIosArrowDropdown } from "react-icons/io";
import { useRouter } from "next/navigation";

type Occupation = {
  room: number;
  adult: number;
  children: number;
};

export default function Search({}) {
  // const [startDate, setStartDate] = useState(new Date());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { lang } = useLangStore();
  const [searchCity, setSearchCity] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  // const [showSearchOccupation, setShowSearchOccupation] = useState(false);
  const { showOccupation, setShowOccupation, setShowCurrency } =
    useShowHandlerStore((state) => state);
  const [occupation, setOccupation] = useState<Occupation>();
  const years = new Range();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    //init date search range
    const dtStart = new Date();

    dtStart.setDate(dtStart.getDate() + 7);

    setStartDate(dtStart);
  }, []);

  useEffect(() => {
    if (startDate !== undefined) {
      const dtEnd = new Date();
      dtEnd.setDate(startDate.getDate() + 1);
      setEndDate(dtEnd);
    }
  }, [startDate]);

  // function getYear(date: Date): string | number | readonly string[] | undefined {

  //   throw new Error("Function not implemented.");
  // }

  // function getMonth(date: Date) {
  //   throw new Error("Function not implemented.");
  // }

  const onChange = (ev: HTMLInputElement) => {
    setSearchCity((prev) => (prev = ev.value));
  };

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
      const checkIn = `${startDate?.getFullYear()}-${startDate?.getMonth()}-${startDate?.getDate()}`;
      const checkOut = `${endDate?.getFullYear()}-${endDate?.getMonth()}-${endDate?.getDate()}`;
      router.push(
        `/search/?city=${searchCity}&checkIn=${checkIn}&checkOut=${checkOut}&room=${occupation?.room}&adult=${occupation?.adult}&children=${occupation?.children}`
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
            onChange={(ev) => onChange(ev.target)}
            value={searchCity}
          />
        </label>
      </div>
      <div className="flex justify-between items-center flex-col lg:flex-row gap-2 lg:gap-5">
        <div className="datePicker flex gap-3 justify-between">
          <DatePicker
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-between px-5">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>

                <div className="p-5 lg:text-xl">
                  <span>{months[date.getMonth()]}</span>
                  <span> {date.getFullYear()}</span>
                </div>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
            minDate={startDate}
            dateFormat="d, MMMM yyyy"
          />
          <DatePicker
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-between px-5">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>

                <div className="p-5 lg:text-xl">
                  <span>{months[date.getMonth()]}</span>
                  <span> {date.getFullYear()}</span>
                </div>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
            selected={endDate}
            onChange={(date) => setEndDate(date!)}
            // selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={maxDate()}
            dateFormat="d, MMMM yyyy"
            popperClassName="some-custom-class"
            popperPlacement="bottom-end"
          />
        </div>
        <div className="relative border border-gray-300 rounded w-full lg:w-1/2 h-10 lg:h-11 flex justify-between items-center px-2">
          <div className="text-sm">
            <span className="mr-2 bg-pink-600 text-gray-100 rounded-xl px-2 py-[2px]">
              {occupation?.room}{" "}
              {lang === "TW"
                ? "間客房"
                : occupation!.room > 1
                ? "Rooms"
                : "Room"}
            </span>
            <span className="mr-2 bg-teal-600 text-gray-100 rounded-xl px-2 py-[2px]">
              {occupation?.adult}{" "}
              {lang === "TW"
                ? "位大人"
                : occupation!.adult > 1
                ? "Adults"
                : "Adult"}
            </span>
            {occupation !== undefined && occupation!.children > 0 ? (
              <span className="mr-2 bg-teal-600 text-gray-100 rounded-xl px-2 py-[2px]">
                {occupation!.children} {lang === "TW" ? "位兒童" : "Children"}
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
