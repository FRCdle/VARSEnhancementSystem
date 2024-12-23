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

  return (
  <main>
    <h1 className={`mb-4 text-xl md:text-2xl`}>
      Home
    </h1>
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <div className="col-span-12 rounded-sm border border-stroke bg-slate-100 px-5 pb-5 pt-8 shadow-default sm:px-7.5 xl:col-span-5">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <h5 className="text-xl text-black dark:text-white">
            Hotel Services
          </h5>
        </div>
      </div>

      <div className="col-span-12 rounded-sm border border-stroke bg-slate-100 px-5 pb-5 pt-8 shadow-default sm:px-7.5 xl:col-span-7">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <h5 className="text-xl text-black dark:text-white">
            Event Configuration
          </h5>
        </div>
      </div>

      <div className="col-span-12 rounded-sm border border-stroke bg-slate-100 px-5 pb-5 pt-8 shadow-default sm:px-7.5 xl:col-span-12">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <h5 className="text-xl text-black dark:text-white">
            Profile Finder
          </h5>
        </div>
      </div>

      <div className="col-span-12 rounded-sm border border-stroke bg-slate-100 px-5 pb-5 pt-8 shadow-default sm:px-7.5 xl:col-span-6">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <h5 className="text-xl text-black dark:text-white">
            System Trackers
          </h5>
        </div>
      </div>

      <div className="col-span-12 rounded-sm border border-stroke bg-slate-100 px-5 pb-5 pt-8 shadow-default sm:px-7.5 xl:col-span-6">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <h5 className="text-xl text-black dark:text-white">
            Total Meal Registrations
          </h5>
        </div>
      </div>
    </div>
  </main>
  );
  return (

    <main>
      
      <h2 className={`mb-4 text-base md:text-m`}>
        Hotel Services
      </h2>
      <div className="p-5 rounded-sm border border-stroke bg-slate-100 px-5 pb-5 pt-7.5 shadow-default">
        <h2 className={`mb-4 text-base md:text-m`}>
          Event Configuration
        </h2>
        <div className={"text-xs"}>
          <p className="text-black sm:block">{data?.[4][0]}</p>
        </div>
        
      </div>

      
    </main>
  );

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