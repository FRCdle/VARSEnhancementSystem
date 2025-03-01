"use client";
import { myStore } from "@/app/event-context";
import {
  getScans,
} from "@/app/lib/google-sheets.action";
import { IdleTimer } from "@/app/lib/idle-timer";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
    const timeout = 250;
    const [data, setData] = useState<string[][]>();
    const [isStale, setIsStale] = useState(false);
    const [refreshToken, setRefreshToken] = useState(Math.random());
    const [isActive, setIsActive] = useState(true);

    const { eventID, setEvent } = myStore();

    const handleOnIdle = (event: object) => {
        alert("Page has timed out. Close dialogue to continue viewing page.");
        setIsActive(false);
    };
    
    const handleOnActive = (event: object) => {
        setIsActive(true);
    };

    useEffect(() => {
        setIsStale(true);
        setTimeout(() => {
            setData(undefined);
        }, 1000);
        setTimeout(() => setIsStale(false), 5000)
        }, [eventID]);

  useEffect(() => {
    if (isActive) {
      getScans(eventID)
        .then((data) => {if (!isStale) setData(data)})
        .finally(() => {
          setTimeout(() => setRefreshToken(Math.random()), timeout); 
        });
    } else {
      setTimeout(() => setRefreshToken(Math.random()), timeout);
    }
  }, [refreshToken]);

  const scansData = data;
//   scansData?.map(
//     (row: string[], rowKey: number) =>
//       (scansData[rowKey] = row.slice(0, 9))
//   );

  return (
  <IdleTimer
    timeout={1000 * 60 * 15} // 15 minutes timeout
    onIdle={handleOnIdle}
    onActive={handleOnActive}
  >
    <div>
        <h1 className="mb-2 text-xl md:text-2xl text-black">
            Meal Scanner
        </h1>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-12">
                <div className="overflow-scroll flex flex-col">
                {scansData?.map((row : string[], rowKey : number) => (
                    <div
                    className={`grid grid-cols-30`}
                    key={rowKey}
                    >
                    {row.map((cell : string, cellKey : number) => (
                        <div key={cellKey} className={`${rowKey === 0 ? "bg-gray-700 text-white" : "text-black"} ${rowKey !== 0 && rowKey % 2 === 0 ? "bg-gray-200" : ""} font-semibold  items-center p-1`}>
                        <p className="text-sm text-center">{cell}</p>
                        </div>
                    ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
  </IdleTimer>

  );
}
