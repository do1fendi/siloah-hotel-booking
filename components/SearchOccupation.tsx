import React, { useState, useEffect, useRef } from "react";
import useShowHandlerStore from "@/store/showHandler";
import useLangStore from "@/store/lang";

type Occupation = {
  room: number;
  adult: number;
  children: number;
  childAges: string;
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
    childAges: "",
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

  const modifyTmpOccupation = (
    which: string,
    state: string,
    value?: string
  ) => {
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
          if (state === "min" && prev.children > 0) {
            const arr = prev.childAges.split(",");
            const arrPop = arr.pop();
            prev = {
              ...prev,
              children: prev.children - 1,
              childAges: arr.toString(),
            };
          } else if (state === "add" && prev.children < 16)
            prev = { ...prev, children: prev.children + 1 };

          return prev;
        });
        break;
      case "chlidAge":
        if (tmpOccupation.children === 1)
          setTmpOccupation({ ...tmpOccupation, childAges: value! });
        else if (tmpOccupation.children > 1) {
          const index = parseInt(state);
          let strChildAge = tmpOccupation.childAges.split(",");
          strChildAge[index] = value!;
          setTmpOccupation({
            ...tmpOccupation,
            childAges: strChildAge!.toString(),
          });
        }

        break;
      default:
        break;
    }
  };

  const childAgeDIV = () => {
    var elements = [];
    for (let i = 0; i < tmpOccupation.children; i++) {
      elements.push(
        React.createElement(
          "div",
          {key:i},
          <div className="flex justify-between mt-5">
            <p>
              {lang === "TW" ? `第${i + 1}位兒童年齡` : `Age child ${i + 1}`}
            </p>
            <select
              onChange={(e) =>
                modifyTmpOccupation("chlidAge", `${i}`, e.currentTarget.value)!
              }
            >
              <option value={""}>_</option>
              <option value={"<1"}>&#60;1</option>
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"7"}>7</option>
              <option value={"8"}>8</option>
              <option value={"9"}>9</option>
              <option value={"10"}>10</option>
              <option value={"11"}>11</option>
              <option value={"12"}>12</option>
              <option value={"13"}>13</option>
              <option value={"14"}>14</option>
              <option value={"15"}>15</option>
              <option value={"16"}>16</option>
              <option value={"17"}>17</option>
            </select>
          </div>
        )
      );
    }
    const newDIV = React.createElement("div", null, elements);
    return newDIV;
  };
  return (
    <>
      {showOccupation ? (
        <div
          ref={wrapperRef}
          className="z-10  absolute top-0 right-0 bottom-auto left-auto translate-y-[50px] lg:translate-y-[50px] bg-white shadow-lg rounded p-5 w-[250px]"
        >
          <div className="flex justify-between gap-5">
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
          {tmpOccupation.children > 0 && childAgeDIV()}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchOccupation;
