"use client";
import { getSheetData, getHomePanel, getMealCheckin, getSync, writeCellData, writeVolunteerCell, writeVolunteerData } from "@/app/lib/google-sheets.action";
import { IdleTimer } from "@/app/lib/idle-timer";
import { useEffect, useState } from "react";

export default function Page() {

  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [writtenData, setWrittenData] = useState<string[][]>();

  useEffect(() => {
    if (isActive) {
      getSync()
        .then((data) => setData(data))
        .finally(() => {
          setTimeout(() => setRefreshToken(Math.random()), 3000); 
        });
    } else {
      setTimeout(() => setRefreshToken(Math.random()), 3000);
    }
  }, [refreshToken]);

  const handleOnIdle = (event: object) => {
    alert("Page has timed out. Close dialogue to continue viewing page.");
    setIsActive(false);
  };
  
  const handleOnActive = (event: object) => {
    setIsActive(true);
   };

  const handleWrittenData = (row : number, column : number, newData : string) => {
    let copy = data?.slice()!;
    copy?.map(
      (row: string[], rowKey: number) =>
        (data![rowKey] = row.slice(0, row.length - 1))
      );
    copy[row][column] = newData;
    setWrittenData(copy);
  }

  return(
<IdleTimer
    timeout={1000 * 60 * 15} // 15 minutes timeout
    onIdle={handleOnIdle}
    onActive={handleOnActive}
  >
  <div className="">
    <h1 className="mb-2 text-xl md:text-2xl text-black">
      Volunteer Information 
    </h1>
    <div className={`text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default`}>
        <button
            onClick={() => {
                writeVolunteerData(writtenData!).then(() =>
                setRefreshToken(Math.random())
                );
            }}
            className="h-10 items-center rounded-lg bg-blue-500 px-4 text-m font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
            Get Data
        </button>
      <div className="overflow-scroll flex flex-col">
        {data?.map((row : string[], rowKey : number) => (
          <div
            className={`grid grid-cols-15`}
            key={rowKey}
          >
            {row.map((cell : string, cellKey : number) => (
              <div key={cellKey} className={`${rowKey % 2 === 0 ? "bg-gray-200" : ""} font-semibold  items-center p-1`}>
                <div>
                  <label className="text-m text-gray-500">
                    <input
                    
                    defaultValue={cell}
                    onChange={
                        (e) => handleWrittenData(rowKey, cellKey, e.target.value)
                    }
                    className="h-8 mr-3 px-0.5 text-xs"
                    name="cell-input"
                    type="text"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div> </IdleTimer>
  
);
}