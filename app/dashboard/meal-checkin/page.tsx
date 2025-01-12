"use client";
import {
  getSheetData,
  getHomePanel,
  getMealCheckin,
} from "@/app/lib/google-sheets.action";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(Math.random());

  const individualMealData = data?.slice(5, 14);
  individualMealData?.map(
    (row: string[], rowKey: number) =>
      (individualMealData[rowKey] = row.slice(0, 2))
  );

  const totalMealData = data?.slice(0, 11);
  totalMealData?.map(
    (row: string[], rowKey: number) =>
      (totalMealData[rowKey] = row.slice(9, 12))
  );

  const stillExpectedMealData = data?.slice(24, 400);
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

  return (
    <div>
      <h1 className="mb-2 text-xl md:text-2xl text-black">
        Meal Check-In Panel
      </h1>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-4">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">
              Individual Meals
            </h5>
          </div>

          <div className="text-xs rounded-sm bg-white px-5 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              {individualMealData?.map((row: string[], rowKey: number) => (
                <div className={`grid grid-cols-4 sm:grid-cols-4`} key={rowKey}>
                  {row.map((cell: string, cellKey: number) => (
                    <div
                      key={cellKey}
                      className={`${cellKey === 0 ? "col-span-3" : "col-span-1"}
                                  ${cell === "No Data" ? "bg-red-400" : ""}
                                  border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                    >
                      <p className="text-gray-500 sm:block">{cell}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-4">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">Status</h5>
          </div>

          <div className="rounded-sm bg-white px-5 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <div className="inline-block">
              <p>
                {data?.[1][0]} : {data?.[2][0]}
              </p>
              <p>
                {data?.[1][1]} : {data?.[2][1]}
              </p>
              <p>
                {data?.[3][0]} {data?.[3][1]}
              </p>
            </div>
            
            <div className="inline-block">
              <p className="text-l text-gray-500"> {data?.[3][3]} </p>
              <p className="text-l text-gray-500"> {data?.[9][3]} </p>
              <p className="text-l text-gray-500"> {data?.[11][3]} </p>
              <p className="text-l text-gray-500"> {data?.[14][2]} </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-4">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">Total Meals</h5>
          </div>

          <div className="text-xs rounded-sm bg-white px-5 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              {totalMealData?.map((row: string[], rowKey: number) => (
                <div className={`grid grid-cols-4 sm:grid-cols-4`} key={rowKey}>
                  {row.map((cell: string, cellKey: number) => (
                    <div
                      key={cellKey}
                      className={`${cellKey === 1 ? "col-span-2" : "col-span-1"}
                                  ${rowKey === 0 ? "font-semibold text-black" : "text-gray-500"}
                                  ${rowKey === totalMealData.length - 1 ? "bg-gray-300" : ""}
                                  border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                    >
                      <p className="sm:block">{cell}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-12">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">
              Still Expected... (Names below have registered but not scanned in
              for meal)
            </h5>
          </div>

          <div className="text-xs rounded-sm bg-white px-5 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              {stillExpectedMealData?.map((row: string[], rowKey: number) => (
                <div
                  className={`grid grid-cols-15 sm:grid-cols-15`}
                  key={rowKey}
                >
                  {row.map((cell: string, cellKey: number) => (
                    <div
                      key={cellKey}
                      className={`border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                    >
                      <p className="text-gray-500 sm:block">{cell}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
