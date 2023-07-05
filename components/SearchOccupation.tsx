import { useState, useEffect, useRef } from "react";
import useShowHandlerStore from "@/store/showHandler";
import useLangStore from "@/store/lang";

type Occupation = {
  room: number;
  adult: number;
  children: number;
};

interface ISearchOccupation {
  //   show: boolean;
  //   setShow: (a: boolean) => void;
  setOccupation: (a: Occupation) => void;
}

const SearchOccupation = ({
  //   show,
  //   setShow,
  setOccupation,
}: ISearchOccupation) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { lang } = useLangStore((state) => state);
  const { showOccupation, setShowOccupation } = useShowHandlerStore(
    (state) => state
  );
  const [tmpOccupation, setTmpOccupation] = useState<Occupation>({
    room: 1,
    adult: 2,
    children: 0,
  });

  useEffect(() => {
    // console.log(showOccupation);
    setOccupation(tmpOccupation);
  }, [tmpOccupation]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOccupation(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const modifyTmpOccupation = (which: string, state: string) => {
    switch (which) {
      case "room":
        setTmpOccupation((prev) => {
          if (state === "min" && prev.room > 1)
            prev = { ...prev, room: prev.room - 1 };
          else if (state === "add" && prev.room >= 8) prev;
          else if (state === "add" && prev.room >= prev.adult)
            prev = { ...prev, room: prev.room + 1, adult: prev.room + 1 };
          else if (state === "add" && prev.room < prev.adult)
            prev = { ...prev, room: prev.room + 1 };
          // alert(1);
          return prev;
        });
        break;
      case "adult":
        setTmpOccupation((prev) => {
          if (state === "min" && prev.adult > 1 && prev.adult > prev.room)
            prev = { ...prev, adult: prev.adult - 1 };
          else if (state === "add" && prev.adult < 16)
            prev = { ...prev, adult: prev.adult + 1 };

          return prev;
        });
        break;
      case "children":
        setTmpOccupation((prev) => {
          if (state === "min" && prev.children > 0)
            prev = { ...prev, children: prev.children - 1 };
          else if (state === "add" && prev.children < 16)
            prev = { ...prev, children: prev.children + 1 };

          return prev;
        });
        break;
      default:
        break;
    }
  };
  return (
    <>
      {showOccupation ? (
        <div
          ref={wrapperRef}
          className="flex justify-between gap-5 absolute top-0 right-0 bottom-auto left-auto translate-y-[50px] lg:translate-y-[50px] bg-white shadow-lg rounded p-5 w-[250px]"
        >
          <div className="flex flex-col gap-5">
            <div>{lang === "TW" ? "客房" : "Room"}</div>
            <div>{lang === "TW" ? "大人" : "Adult"}</div>
            <div>{lang === "TW" ? "兒童" : "Children"}</div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-5 text-center">
              <button
                className="w-6 h-6 rounded-full border border-teal-500 flex justify-center items-center"
                onClick={() => modifyTmpOccupation("room", "min")}
              >
                -
              </button>
              <span>{tmpOccupation.room}</span>
              <button
                className="w-6 h-6 rounded-full border border-teal-500 flex justify-center items-center"
                onClick={() => modifyTmpOccupation("room", "add")}
              >
                +
              </button>
            </div>
            <div className="grid grid-cols-3 gap-5  text-center">
              <button
                className="w-6 h-6 rounded-full border border-teal-500 flex justify-center items-center"
                onClick={() => modifyTmpOccupation("adult", "min")}
              >
                -
              </button>
              <span>{tmpOccupation.adult}</span>
              <button
                className="w-6 h-6 rounded-full border border-teal-500 flex justify-center items-center"
                onClick={() => modifyTmpOccupation("adult", "add")}
              >
                +
              </button>
            </div>
            <div className="grid grid-cols-3 gap-5 text-center">
              <button
                className="w-6 h-6 rounded-full border border-teal-500 flex justify-center items-center"
                onClick={() => modifyTmpOccupation("children", "min")}
              >
                -
              </button>
              <span>{tmpOccupation.children}</span>
              <button
                className="w-6 h-6 rounded-full border border-teal-500 flex justify-center items-center"
                onClick={() => modifyTmpOccupation("children", "add")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchOccupation;
