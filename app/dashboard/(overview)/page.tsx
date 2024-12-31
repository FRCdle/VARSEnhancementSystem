"use client";
import { getSheetData, getHomePanel } from "@/app/lib/google-sheets.action";
import { Button } from "@/app/ui/button";
import { sheets } from "googleapis/build/src/apis/sheets";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import MealChart from "@/app/ui/charts/mealchart";

export default function Page() {
  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(Math.random());

  const eventConfigData = data?.slice(3, 12);
  eventConfigData?.map(
    (row: string[], rowKey: number) =>
      (eventConfigData[rowKey] = row.slice(0, 2))
  );

  const profileFinderData = data?.slice(2, 17);
  profileFinderData?.map(
    (row: string[], rowKey: number) =>
      (profileFinderData[rowKey] = row.slice(3, 7))
  );

  const systemTrackersData = data?.slice(20, 28);
  systemTrackersData?.map(
    (row: string[], rowKey: number) =>
      (systemTrackersData[rowKey] = row.slice(0, 2))
  );

  const totalMealRegistrations = data?.slice(20, 30);
  totalMealRegistrations?.map(
    (row: string[], rowKey: number) =>
      (totalMealRegistrations[rowKey] = row.slice(3, 5))
  );

  // const handleVolCODEInput = (e) => {
  //     sheets.spreadsheets.values.append({
  //     auth: glAuth,
  //     spreadsheetId: "YOUR_SPREAD_SHEET_ID",
  //     range: "RANGE",
  //     valueInputOption: "USER_ENTERED",
  //     requestBody: {
  //         values: [
  //             [
  //                 "YOUR_DATA", "YOUR_DATA", "YOUR_DATA",
  //             ],
  //             [
  //                 "YOUR_DATA", "YOUR_DATA", "YOUR_DATA",
  //             ]
  //         ]
  //     }
  // })
  // };

  useEffect(() => {
    getHomePanel()
      .then((data) => setData(data))
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 3000); // refresh rate in milliseconds
      });
  }, [refreshToken]);

  return (
    <main>
      <h1 className={`mb-4 font-semibold text-xl md:text-2xl`}>Home</h1>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-5">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">
              Hotel Services
            </h5>
          </div>
        </div>

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-7">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">
              Event Configuration
            </h5>
          </div>
          <div>
            <p className="text-sm text-gray-500"> {eventConfigData?.[1][0]} </p>
          </div>
          <div>
            <p className="text-sm text-gray-500"> {eventConfigData?.[3][0]} </p>
          </div>
          <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              {eventConfigData
                ?.slice(5, 9)
                ?.map((row: string[], rowKey: number) => (
                  <div
                    className={`grid grid-cols-2 sm:grid-cols-2`}
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

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-7">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black">Profile Finder</h5>
          </div>
          <div>
            <label className="text-sm text-gray-500">
              VolCODE:
              <input
                // onChange={}
                className="h-5 mr-3 px-1 text-sm font-normal"
                name="volcode-input"
              />
              Insert Volcode to left to pull volunteer profile
            </label>
          </div>
        </div>

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-5">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black">
              System Trackers
            </h5>
          </div>
          <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-2 shadow-default sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              {systemTrackersData?.map((row: string[], rowKey: number) => (
                <div className={`grid grid-cols-3 sm:grid-cols-3`} key={rowKey}>
                  {row.map((cell: string, cellKey: number) => (
                    <div
                      key={cellKey}
                      className={`${rowKey === 0 || rowKey === 4 ? "bg-gray-300 text-black font-bold" : "text-gray-500"}
                                  ${cellKey === 0 ? "col-span-2" : "col-span-1"}
                                  ${cell === "No Errors" ? "bg-green-400" : ""} 
                                  ${cell === "Error Detected" ? "bg-red-500" : ""} 
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

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-8 shadow-default sm:px-7.5 xl:col-span-12">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl text-black ">Total Meal Registrations</h5>
          </div>
          <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-2 shadow-default sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              {totalMealRegistrations?.map((row: string[], rowKey: number) => (
                <div className={`grid grid-cols-2 sm:grid-cols-2`} key={rowKey}>
                  {row.map((cell: string, cellKey: number) => (
                    <div
                      key={cellKey}
                      className={`${rowKey === 9? "bg-gray-300 text-black font-bold" : "text-gray-500"}
                                  
                                  border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                    >
                      <p className="sm:block">{cell}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <MealChart />
          </div>
        </div>

      </div>
    </main>
  );

  return (
    <main>
      <h2 className={`mb-4 text-base md:text-m`}>Hotel Services</h2>
      <div className="p-5 rounded-sm border border-stroke bg-slate-100 px-5 pb-5 pt-7.5 shadow-default">
        <h2 className={`mb-4 text-base md:text-m`}>Event Configuration</h2>
        <div className={"text-xs"}>
          <p className="text-black sm:block">{data?.[4][0]}</p>
        </div>
      </div>
    </main>
  );

  return (
    <div>
      <h1 className="mb-2 text-xl md:text-2xl text-black">Volunteer Panel</h1>
      <div className="text-xs rounded-sme bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          {data?.map((row: string[], rowKey: number) => (
            <div
              className={`${row[0] === "" ? "bg-slate-200" : ""} grid grid-cols-10 sm:grid-cols-10`}
              key={rowKey}
            >
              {row.map((cell: string, cellKey: number) => (
                <div
                  key={cellKey}
                  className={`${cellKey === 1 ? "font-black" : "font-semibold"} ${cell === "NO ASSIGNMENTS" ? "bg-red-200" : ""} ${cellKey > 3 ? "border border-stroke" : "border-b border-stroke"} items-center gap-3 p-2.5 xl:p-2.5 `}
                >
                  <p className="text-center hidden text-black sm:block">
                    {cell}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
