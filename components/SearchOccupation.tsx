import { useState, useEffect, useRef } from "react";
import useShowHandlerStore from "@/store/showHandler";

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
  const { showOccupation, setShowOccupation } = useShowHandlerStore(
    (state) => state
  );
  const [tmpOccupation, setTmpOccupation] = useState<Occupation>({
    room: 1,
    adult: 2,
    children: 0,
  });

  useEffect(() => {
    console.log(showOccupation);
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
        if (state === "min" && tmpOccupation.room > 1)
          setTmpOccupation({ ...tmpOccupation, room: tmpOccupation.room - 1 });
        else if (state === "add" && tmpOccupation.room < 8)
          setTmpOccupation({ ...tmpOccupation, room: tmpOccupation.room + 1 });
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
          className="flex justify-end gap-5 absolute top-0 right-0 bottom-auto left-auto translate-x-[-18px] translate-y-[112px] bg-white shadow-lg rounded p-5"
        >
          <div>
            <div>Room</div>
            <div>Adult</div>
            <div>Children</div>
          </div>
          <div>
            <div className="grid grid-cols-3 text-center">
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
            <div>
              <span>{tmpOccupation.adult}</span>
            </div>
            <div>
              <span>{tmpOccupation.children}</span>
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
