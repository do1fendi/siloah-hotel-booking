import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import SearchOccupation from "./SearchOccupation";
import useShowHandlerStore from "@/store/showHandler";

type Occupation = {
  room: number;
  adult: number;
  children: number;
};

export default function Search({}) {
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  // const [showSearchOccupation, setShowSearchOccupation] = useState(false);
  const { showOccupation, setShowOccupation, setShowCurrency } = useShowHandlerStore(
    (state) => state
  );
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

  const maxDate = () => {
    const curDate = new Date();
    curDate.setFullYear(curDate.getFullYear() + 1);
    curDate.setDate(curDate.getDate());
    // console.log(curDate);
    return curDate;
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="City"
          className="border text-base lg:text-lg p-2 rounded mb-2 border-gray-300 w-full focus:ring-teal-500 focus:border-teal-500 shadow-sm form-input"
        />
      </div>
      <div className="flex justify-between items-center flex-col lg:flex-row gap-5">
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
        <div className="">
          Adult
          <button onClick={() => setShowOccupation(true)}>press</button>
          <SearchOccupation
            // show={showSearchOccupation}
            // setShow={setShowSearchOccupation}
            setOccupation={setOccupation}
          />
        </div>
      </div>
    </>
  );
}
