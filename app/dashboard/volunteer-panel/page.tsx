"use client";
import { getSheetData } from "@/app/lib/google-sheets.action";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  interface SheetFormat {
    data: string[][]
  }
  
  const [data, setData] = useState<SheetFormat>();
  const [refreshToken, setRefreshToken] = useState(Math.random());
  
  useEffect(() => {
    getSheetData()
      .then((data) => setData(data))
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 500);
      });
  }, [refreshToken]);

  return(
  <div className="text-xs">
    <div className="rounded-sme bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <h1 className="mb-2 text-xl font-semibold text-black">
        Volunteer Panel
      </h1>

      <div className="flex flex-col">
        {data?.data.map((row : any, rowKey : any) => (
          <div
            className={`${row[0] === "" ? 'bg-slate-200' : '' } grid grid-cols-10 sm:grid-cols-10`}
            key={rowKey}
          >
            {row.map((cell : any, cellKey : any) => (
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


