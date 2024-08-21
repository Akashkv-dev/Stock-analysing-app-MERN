/* eslint-disable @typescript-eslint/no-explicit-any */
import searchIcon from "../../assets/icons/search.svg";
import Cross from "./Cross";
import Intervel from "./Intervels";
import Line from "./Line";
import Pen from "./Pen";
import Polyline from "./Polyline";
import Square from "./Square";
import Trash from "./Trash";
import { getData } from "../../utils/parseData.ts";
import { SetStateAction, useEffect, useRef, useState } from "react";
import CandleChart from "./CandleChart";
import Dropdown from "./Profile.tsx";
import Groups from "./Groups.tsx";
import ChatContainer from "./ChatContainer.tsx";

interface DataPoint {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const Home: React.FC = () => {
  const [data, setData] = useState<DataPoint[] | null>(null);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [groupUp, setgroupUp] = useState<boolean>(false);

  useEffect(() => {
    getData().then((data: SetStateAction<DataPoint[] | null>) => {
      // console.log('dataaaaaa',data)
      setData(data);
    });
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
        
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (data === null) {
    return <div>Loading...</div>;
  }
  const handleprofile = () => {
    setDropdown(true);
  };
  const handleGroup = () => {
    setgroupUp((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-gray-700 text-white h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-2 bg-gray-800">
          <div className="flex items-center cursor-pointer">
            <img
              className="pr-2"
              src="/public/icones/icons8-male-user-48.png"
              alt="icones"
              onClick={handleprofile}
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 px-4 py-2 rounded-full"
            />
            <img
              className="px-2 cursor-pointer"
              src={searchIcon}
              alt="search"
            />
            <div className=" mx-0 h-5 border-l-2 border-gray-400"></div>
            <Intervel />
          </div>

          <div className="flex items-center space-x-4">
            <span>📋</span>
            <Groups handleGroup={handleGroup} />
            <span>👤</span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex pt-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-14 bg-gray-800 flex flex-col items-center py-4 space-y-4 mr-1 rounded-r-lg">
            <Cross />
            <Line />
            <Square />
            <Pen />
            <Polyline />
            <Trash />
          </aside>

          {/* Chart area */}
          <section className=" flex-1 flex overflow-hidden">
            {/* This is where you'd implement your chart */}
            <div className={`bg-gray-800 ${groupUp ? "w-3/5" : "flex-1"} h-[36.3rem] rounded-l-lg flex`}>
              <CandleChart data={data} />
              </div>

              {groupUp && (
                <div className="w-2/5 ">
                  <ChatContainer />
                </div>
              )}
          </section>
        </main>
            {/* Footer */}
            <footer className=" bg-gray-800 rounded-l-lg mt-1 p-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">▲</span>
                <span>trading app</span>
              </div>
            </footer>
        <div className="absolute m-10" ref={dropdownRef}>
          {dropdown && <Dropdown />}
        </div>
      </div>
    </>
  );
};
