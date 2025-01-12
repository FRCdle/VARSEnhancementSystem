"use client";
import { getSheetData, getHomePanel, getMealCheckin, getMealIntake } from "@/app/lib/google-sheets.action";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {

  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(0);
  
  useEffect(() => {
    getMealIntake()
    .then((data) => setData(data))
    .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 5000); // refresh rate in milliseconds
    });
  }, [refreshToken]);

  return( data ? 
  <div className="">
    <h1 className="mb-2 text-xl md:text-2xl text-black">
      Meal Intake Panel
    </h1>
    <div className={`text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default`}>
      <div className="overflow-scroll flex flex-col">
        {data?.map((row : string[], rowKey : number) => (
          <div
            className={`grid grid-cols-15`}
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
  </div> : <></>
  
);
}