"use client";
import { getSheetData, getHomePanel, getMealCheckin, getOutput } from "@/app/lib/google-sheets.action";
import { IdleTimer } from "@/app/lib/idle-timer";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {

  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive) {
      getOutput()
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

  return(
<IdleTimer
    timeout={1000 * 60 * 15} // 15 minutes timeout
    onIdle={handleOnIdle}
    onActive={handleOnActive}
  >
  <div className="">
    <h1 className="mb-2 text-xl md:text-2xl text-black">
      Output
    </h1>
    <div className={`text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default`}>
      <div className="overflow-scroll flex flex-col">
        {data?.map((row : string[], rowKey : number) => (
          <div
            className={`grid grid-cols-16`}
            key={rowKey}
          >
            {row.map((cell : string, cellKey : number) => (
              <div key={cellKey} className={`${rowKey === 0 ? "bg-purple-900 text-white" : "text-black"} ${rowKey !== 0 && rowKey % 2 === 0 ? "bg-gray-200" : ""} font-semibold  items-center p-1`}>
                <p className="text-center">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div> </IdleTimer>
  
);
}