"use client";
import { getSheetData, getHomePanel } from "@/app/lib/google-sheets.action";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {

  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(Math.random());
  
  useEffect(() => {
    getHomePanel()
      .then((data) => setData(data))
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 3000); // refresh rate in milliseconds
      });
  }, [refreshToken]);

  return(
  <div>
    <h1 className="mb-2 text-xl md:text-2xl text-black">
      Volunteer Panel
    </h1>
    <div className="text-xs rounded-sme bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        {data?.map((row : string[], rowKey : number) => (
          <div
            className={`${row[0] === "" ? 'bg-slate-200' : '' } grid grid-cols-10 sm:grid-cols-10`}
            key={rowKey}
          >
            {row.map((cell : string, cellKey : number) => (
              <div key={cellKey} className={`${cellKey === 1 ? 'font-black' : 'font-semibold'} ${cell === "NO ASSIGNMENTS" ? 'bg-red-200' : ''} ${cellKey > 3 ? 'border border-stroke' : 'border-b border-stroke'} items-center gap-3 p-2.5 xl:p-2.5 `}>
                <p className="text-center hidden text-black sm:block">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>);
}