"use client";
import { getSheetData, getHomePanel, getMealCheckin, getMealIntake } from "@/app/lib/google-sheets.action";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {

  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(Math.random());
  
  useEffect(() => {
    getMealIntake()
      .then((data) => setData(data))
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 5000); // refresh rate in milliseconds
      });
  }, [refreshToken]);

  return(
  <div className="">
    <h1 className="mb-2 text-xl md:text-2xl text-black">
      Meal Intake Panel
    </h1>
    <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="overflow-scroll flex flex-col">
        {data?.map((row : string[], rowKey : number) => (
          <div
            className={`${row[0] === "" ? 'bg-slate-200' : '' } grid grid-cols-15 sm:grid-cols-15`}
            key={rowKey}
          >
            {row.map((cell : string, cellKey : number) => (
              <div key={cellKey} className={`font-semibold border border-stroke items-center flex w-96`}>
                <p className="text-center text-black overflow-auto ">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>);
}