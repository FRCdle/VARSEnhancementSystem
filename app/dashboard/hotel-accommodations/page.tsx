"use client";
import { myStore } from "@/app/event-context";
import {
  getSheetData,
  getHomePanel,
  getMealCheckin,
  getHotelPage,
} from "@/app/lib/google-sheets.action";
import { IdleTimer } from "@/app/lib/idle-timer";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  const timeout = 1000;
  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(Math.random());
  const [isActive, setIsActive] = useState(true);

  const { eventID, setEvent } = myStore();

  const mainData = data?.slice(3, 6);
  mainData?.map(
    (row: string[], rowKey: number) =>
        (mainData[rowKey] = row.slice(1, 4))
  );

  const bedData = data?.slice(1, 6);
  bedData?.map(
    (row: string[], rowKey: number) =>
      (bedData[rowKey] = row.slice(5, 12))
  );

  const roomData = data?.slice(7, data.length);

  const handleOnIdle = (event: object) => {
    alert("Page has timed out. Close dialogue to continue viewing page.");
    setIsActive(false);
  };
  
  const handleOnActive = (event: object) => {
    setIsActive(true);
   };

  useEffect(() => {
    if (isActive) {
      getHotelPage(eventID)
        .then((data) => setData(data))
        .finally(() => {
          setTimeout(() => setRefreshToken(Math.random()), timeout); 
        });
    } else {
      setTimeout(() => setRefreshToken(Math.random()), timeout);
    }
  }, [refreshToken]);

  return (
  <IdleTimer
    timeout={1000 * 60 * 15} // 15 minutes timeout
    onIdle={handleOnIdle}
    onActive={handleOnActive}
  >
    <div>
      <h1 className="mb-2 text-xl md:text-2xl text-black">
        Hotel Accommodations
      </h1>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-4">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">
              Event Configuration
            </h5>
          </div>
       
          <div className="rounded-sm bg-white pb-2.5 shadow-default xl:pb-1">
            <div className="mt-3 text-base text-gray-500">
              <table className="text-left [&_th]:p-2 [&_th]:pr-2  [&_td]:p-2">
                <tbody>
                  <tr>
                    <th>{mainData?.[0][0]}</th>
                    <td>{mainData?.[0][1]}</td>
                  </tr>
                  <tr>
                    <th>{mainData?.[1][0]}</th>
                    <td>{mainData?.[1][1]}</td>
                  </tr>
                  <tr>
                    <th>{mainData?.[2][0]}:</th>
                    <td>{mainData?.[2][1]}</td>
                  </tr>
                  <tr>
                    <th>{mainData?.[2][2]}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-8">
          <div className="mb-3 justify-between gap-4 sm:flex">
            <h5 className="text-xl font-semibold text-black ">Bed Information</h5>
          </div>
          <div className="text-xs rounded-sm bg-white px-5 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <div className="overflow-scroll flex flex-col">
              {bedData?.map((row: string[], rowKey: number) => (
                <div className={`grid grid-cols-15 md:grid-cols-7`} key={rowKey}>
                  {row.map((cell: string, cellKey: number) => (
                    <div
                      key={cellKey}
                      className={`
                                  ${rowKey === 0 ? "font-semibold text-white bg-gray-700" : "text-gray-500"}
                                  border-b border-stroke items-center gap-3 p-1 xl:p-2.5`}
                    >
                      <p className="text-center sm:block">{cell}</p>
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
              Room Information
            </h5>
          </div>

          <div className={`text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default`}>
            <div className="overflow-scroll flex flex-col">
              {roomData?.map((row : string[], rowKey : number) => (
                <div
                  className={`grid grid-cols-15`}
                  key={rowKey}
                >
                  {row.map((cell : string, cellKey : number) => (
                    <div key={cellKey} className={`${rowKey === 1 ? "bg-gray-700 text-white" : "text-black"} ${rowKey !== 0 && rowKey % 2 === 0 ? "bg-gray-200" : ""} font-semibold  items-center p-1`}>
                      <p className="text-center">{cell}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </IdleTimer>

  );
}
