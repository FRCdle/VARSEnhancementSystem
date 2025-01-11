"use client";
import { getSheetData, getHomePanel, getMealCheckin } from "@/app/lib/google-sheets.action";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {

  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(Math.random());
  
  const individualMealData = data?.slice(5, 13);
  individualMealData?.map(
    (row: string[], rowKey: number) =>
      (individualMealData[rowKey] = row.slice(0, 2))
  );

  const totalMealData = data?.slice(0, 12);
  totalMealData?.map(
    (row: string[], rowKey: number) =>
      (totalMealData[rowKey] = row.slice(9, 12))
  );

  const stillExpectedMealData = data?.slice(25, 400);
  stillExpectedMealData?.map(
    (row: string[], rowKey: number) =>
      (stillExpectedMealData[rowKey] = row.slice(0, 9))
  );

  useEffect(() => {
    getMealCheckin()
      .then((data) => setData(data))
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 5000); // refresh rate in milliseconds
      });
  }, [refreshToken]);

  return(
  <div>
    <h1 className="mb-2 text-xl md:text-2xl text-black">
      Meal Check-In Panel
    </h1>
    <div className="inline-block"> 
      <p> {data?.[1][0]} {data?.[2][0]}</p>
      <p> {data?.[1][1]} {data?.[2][1]}</p>
      <p> {data?.[3][0]} {data?.[3][1]}</p>
    </div>

    <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        {data?.map((row : string[], rowKey : number) => (
          <div
            className={`${row[0] === "" ? 'bg-slate-200' : '' } grid grid-cols-12 sm:grid-cols-12`}
            key={rowKey}
          >
            {row.map((cell : string, cellKey : number) => (
              <div key={cellKey} className={`${cellKey === 1 ? 'font-black' : 'font-semibold'} ${cell === "NO ASSIGNMENTS" ? 'bg-red-200' : ''} ${cellKey > 3 ? 'border border-stroke' : 'border-b border-stroke'} items-center gap-3 p-2.5 xl:p-2.5`}>
                <p className="text-center hidden text-black sm:block">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>);
}