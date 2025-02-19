"use client";
import {
  getHomePanel,
  getHotelLocations,
  writeVolCode,
  getSync,
  writeSync,
} from "@/app/lib/google-sheets.action";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IdleTimer } from "@/app/lib/idle-timer";
import Link from "next/link";
import clsx from "clsx";
import { FaBed } from "react-icons/fa";
import { myStore } from "@/app/event-context";

const DonutChart = dynamic(() => import("@/app/ui/charts/donutchart"), {
  ssr: false, // This ensures the component is not SSR'd
});

export default function Page() {
  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(Math.random());
  const [syncRefreshToken, setSyncRefreshToken] = useState(Math.random());
  const [VOLCodeInput, setVOLCodeInput] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [hotelData, setHotelData] = useState<string[][]>();
  const [writtenHotelData, setWrittenHotelData] = useState<string[][]>();

  const [syncData, setSyncData] = useState<string[][]>();
  const [individiualSyncData, setIndividualSyncData] = useState<string[]>();
  const [individualSyncDataRow, setIndividualSyncDataRow] = useState<number>();
  const [writtenSyncData, setWrittenSyncData] = useState<string[][]>();
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  const { eventID, setEvent } = myStore();
  
  const [key, setKey] = useState(0); //this is used to update input default value fields (forced rerender)
  const updateValue = () => {
    setKey((prevKey) => prevKey + 1); // Change key to force re-mount
  };

  useEffect(() => {
    console.log(eventID);
    if (isActive) {
      getSync(eventID)
        .then((syncData) => setSyncData(syncData))
        .finally(() => {
          setTimeout(() => setSyncRefreshToken(Math.random()), 3000);
        });
    } else {
      setTimeout(() => setSyncRefreshToken(Math.random()), 3000);
    }
  }, [refreshToken]);

  const searchSyncInformation = (phoneNumber: string) => {
    const copy = syncData?.slice();
    copy?.map(
      (row: string[], rowKey: number) =>
        (copy![rowKey] = row.slice(0, row.length - 1))
    );
    setWrittenSyncData(copy);

    for (let i = 0; i < syncData!.length; ++i) {
      if (syncData![i][8] === phoneNumber) {
        setIndividualSyncData(syncData![i]);
        setIndividualSyncDataRow(i);
      }
    }
  };

  /*
  Raymond note: having issues modifying the writtenSyncData multiple times (two changes)
  That's why the setWrittenSyncData(syncData); is there above
  */

  const handleWrittenData = (row: number, column: number, newData: string) => {
    const copy = writtenSyncData?.slice();
    console.log(copy);
    copy?.map(
      (row: string[], rowKey: number) =>
        (copy![rowKey] = row.slice(0, row.length))
    );
    copy![row][column] = newData;
    setWrittenSyncData(copy);
  };

  useEffect(() => {
    if (isActive) {
      getHomePanel(eventID)
        .then((data) => setData(data))
        .finally(() => {
          setTimeout(() => setRefreshToken(Math.random()), 3000);
        });
    } else {
      setTimeout(() => setRefreshToken(Math.random()), 3000);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (isActive) {
      getHotelLocations(eventID)
        .then((hotelData) => setHotelData(hotelData))
        .finally(() => {
          setTimeout(() => setRefreshToken(Math.random()), 3000);
        });
    } else {
      setTimeout(() => setRefreshToken(Math.random()), 3000);
    }
  }, [refreshToken]);

  const handleOnIdle = (event: object) => {
    alert("Page has timed out. Close dialogue to continue viewing page.");
    setIsActive(false);
  };

  const handleOnActive = (event: object) => {
    setIsActive(true);
  };

  // const handleWrittenHotelData = (row : number, column : number, newData : string) => {
  //   let copy = hotelData?.slice()!;
  //   copy[row][column] = newData;
  //   setWrittenHotelData(copy);
  // }

  const eventConfigData = data?.slice(3, 17);
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

  const totalMealRegistrationsData = data?.slice(20, 30);
  totalMealRegistrationsData?.map(
    (row: string[], rowKey: number) =>
      (totalMealRegistrationsData[rowKey] = row.slice(3, 5))
  );

  const mealChartLabels: string[] = new Array(
    totalMealRegistrationsData?.slice(0, 8)?.length
  );
  totalMealRegistrationsData
    ?.slice(0, 8)
    .map((row: string[], rowKey: number) => (mealChartLabels[rowKey] = row[0]));

  const mealChartSeries: number[] = new Array(
    totalMealRegistrationsData?.slice(0, 8)?.length
  );
  totalMealRegistrationsData
    ?.slice(0, 8)
    .map(
      (row: string[], rowKey: number) =>
        (mealChartSeries[rowKey] = parseInt(row[1]))
    );

  const participantStatusLabels: string[] = new Array(3);
  eventConfigData
    ?.slice(6, 9)
    .map(
      (row: string[], rowKey: number) =>
        (participantStatusLabels[rowKey] = row[0])
    );

  const participantStatusSeries: number[] = new Array(3);
  eventConfigData
    ?.slice(6, 9)
    .map(
      (row: string[], rowKey: number) =>
        (participantStatusSeries[rowKey] = parseInt(row[1]))
    );

  return (
    <IdleTimer
      timeout={1000 * 60 * 15} // 15 minutes timeout
      onIdle={handleOnIdle}
      onActive={handleOnActive}
    >
      <main>
        <h1 className={`mb-4 font-semibold text-xl md:text-2xl`}>Home</h1>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-7">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black ">
                Hotel Services
              </h5>
            </div>

            <div>
              <Link
                href="/dashboard/hotel-accommodations"
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md text-slate-200 bg-sidenav-color p-3 text-sm font-medium hover:bg-sidenav-color-hover md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "bg-sidenav-color-hover": true,
                  }
                )}
              >
                <FaBed className="w-6" />
                <p className="md:block">Hotel Accomodations</p>
              </Link>
            </div>

            <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-2 shadow-default sm:px-7.5 xl:pb-1">
              <div className="flex flex-col">
                {hotelData?.map((row: string[], rowKey: number) => (
                  <div className={`grid grid-cols-2`} key={rowKey}>
                    {row.map((cell: string, cellKey: number) => (
                      <div
                        key={cellKey}
                        className={`
                                    ${cellKey === 1 && cell.includes("INSERT") ? "bg-red-400" : ""}
                                    border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                      >
                        <p className="text-black sm:block">{cell}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black ">
                Event Configuration
              </h5>
            </div>
            <div className="inline-block">
              <p className="text-sm text-gray-500">
                {" "}
                {eventConfigData?.[1][0]}{" "}
              </p>
              <p className="text-sm text-gray-500">
                {" "}
                {eventConfigData?.[3][0]}{" "}
              </p>
            </div>
            <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
              <div className="flex flex-col">
                {eventConfigData
                  ?.slice(5, 14)
                  ?.map((row: string[], rowKey: number) => (
                    <div
                      className={`grid grid-cols-4 sm:grid-cols-4`}
                      key={rowKey}
                    >
                      {row.map((cell: string, cellKey: number) => (
                        <div
                          key={cellKey}
                          className={`${cellKey === 0 ? "col-span-3" : "col-span-1"}
                                    ${rowKey === 5 || rowKey === 7 ? "bg-gray-300" : ""}
                                    ${cell === "ACTIVE" ? "bg-green-400" : ""}
                                    border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                        >
                          <p className="text-gray-500 sm:block">{cell}</p>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
            <div className="mb-3 mt-5 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black ">
                Participant Status
              </h5>
            </div>
            {data ? (
              <DonutChart
                labels={participantStatusLabels}
                series={participantStatusSeries}
              />
            ) : (
              <></>
            )}
          </div>
          {/* 
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-4">
            
          </div> */}

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black">
                Profile Finder
              </h5>
            </div>
            <div>
              <label className="text-m text-gray-500">
                VolCODE: &nbsp;
                <input
                  defaultValue={profileFinderData?.[0][1]}
                  onChange={(e) => setVOLCodeInput(e.target.value)}
                  className="h-8 mr-3 px-0.5 text-m font-normal"
                  name="volcode-input"
                  type="text"
                />
                <button
                  onClick={() => {
                    writeVolCode([[VOLCodeInput]], eventID).then(() =>
                      setRefreshToken(Math.random())
                    );
                  }}
                  className="h-10 items-center rounded-lg bg-blue-500 px-4 text-m font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                >
                  Get Data
                </button>
              </label>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              <table className="text-left [&_th]:p-2 [&_th]:pr-6 [&_td]:p-2">
                <tbody>
                  <tr>
                    <th>Role:</th>
                    <td>{profileFinderData?.[1][0]}</td>
                  </tr>
                  <tr>
                    <th>Position:</th>
                    <td>{profileFinderData?.[3][0]}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{profileFinderData?.[5][1]}</td>
                  </tr>
                  <tr>
                    <th>Phone Number:</th>
                    <td>{profileFinderData?.[6][1]}</td>
                  </tr>
                  <tr>
                    <th>Designation:</th>
                    <td>{profileFinderData?.[7][1]}</td>
                  </tr>
                  <tr>
                    <th>Confirmation Email:</th>
                    <td>{profileFinderData?.[10][0]}</td>
                  </tr>
                  <tr>
                    <th>Position Confirmation:</th>
                    <td>{profileFinderData?.[13][0]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black">
                Profile Editor
              </h5>
            </div>
            <div>
              <label className="text-m text-gray-500">
                Phone Number: &nbsp;
                <input

                  onChange={(e) => setPhoneNumberInput(e.target.value)}
                  className="h-8 mr-3 px-0.5 text-m font-normal"
                  name="volcode-input"
                  type="text"
                />
                <button
                  onClick={() => {
                    searchSyncInformation(phoneNumberInput);
                    updateValue()
                  }}
                  className="h-10 items-center rounded-lg bg-blue-500 px-4 text-m font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                >
                  Search
                </button>
              </label>
            </div>

            {writtenSyncData ? (<div className="mt-3 text-sm text-gray-500">
              <table className="text-left [&_th]:p-2 [&_th]:pr-6 [&_td]:p-2">
                <tbody>
                  <tr>
                    <th>Role:</th>
                    <td>
                      <div>
                        <label className="text-m text-gray-500">
                          <input
                            key={key}
                            defaultValue={individiualSyncData?.[0]}
                            onChange={(e) =>
                              handleWrittenData(
                                individualSyncDataRow!,
                                0,
                                e.target.value
                              )
                            }
                            className="w-64 h-8 mr-3 px-0.5 text-xs"
                            name="cell-input"
                            type="text"
                          />
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Name:</th>
                    <td>
                      <div>
                        <label className="text-m text-gray-500">
                          <input
                          key={key}
                            defaultValue={individiualSyncData?.[3]}
                            onChange={(e) =>
                              handleWrittenData(
                                individualSyncDataRow!,
                                3,
                                e.target.value
                              )
                            }
                            className="w-64 h-8 mr-3 px-0.5 text-xs"
                            name="cell-input"
                            type="text"
                          />
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>
                      <div>
                        <label className="text-m text-gray-500">
                          <input
                          key={key}
                            defaultValue={individiualSyncData?.[7]}
                            onChange={(e) =>
                              handleWrittenData(
                                individualSyncDataRow!,
                                7,
                                e.target.value
                              )
                            }
                            className="w-64 h-8 mr-3 px-0.5 text-xs"
                            name="cell-input"
                            type="text"
                          />
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={() => {
                  writeSync(writtenSyncData!, eventID).then(() =>
                    setSyncRefreshToken(Math.random())
                  );
                }}
                className="h-10 items-center rounded-lg bg-blue-500 px-4 text-m font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              >
                Change
              </button>
            </div>) : <></>}
          </div>

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-7">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black ">
                Profile Finder
              </h5>
            </div>
            <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-2 shadow-default sm:px-7.5 xl:pb-1">
              <div className="flex flex-col">
                {profileFinderData
                  ?.slice(5, 15)
                  ?.map((row: string[], rowKey: number) => (
                    <div
                      className={`grid grid-cols-4 sm:grid-cols-4`}
                      key={rowKey}
                    >
                      {row.slice(2, 4).map((cell: string, cellKey: number) => (
                        <div
                          key={cellKey}
                          className={`${cell === "YES" ? "bg-green-400" : ""}
                                    ${cell === "NO" ? "bg-red-400" : ""}  
                                    ${rowKey === 9 ? "font-bold" : ""}
                                    ${cellKey === 0 ? "col-span-3" : "col-span-1"}
                                    border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                        >
                          <p className="text-black sm:block">{cell}</p>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
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
                  <div
                    className={`grid grid-cols-3 sm:grid-cols-3`}
                    key={rowKey}
                  >
                    {row.map((cell: string, cellKey: number) => (
                      <div
                        key={cellKey}
                        className={`${rowKey === 0 || rowKey === 4 ? "bg-gray-300 text-black font-bold" : "text-gray-500"}
                                  ${cellKey === 0 ? "col-span-2" : "col-span-1"}
                                  ${cell === "No Errors" ? "bg-green-400" : ""} 
                                  ${cell === "Error Detected" ? "bg-red-400" : ""} 
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

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black ">
                Total Meal Registrations
              </h5>
            </div>
            <div className="text-xs rounded-sm bg-white px-5 pb-2.5 pt-2 shadow-default sm:px-7.5 xl:pb-1">
              <div className="flex flex-col">
                {totalMealRegistrationsData?.map(
                  (row: string[], rowKey: number) => (
                    <div
                      className={`grid grid-cols-6 sm:grid-cols-6`}
                      key={rowKey}
                    >
                      {row.map((cell: string, cellKey: number) => (
                        <div
                          key={cellKey}
                          className={`${cellKey === 0 ? "col-span-5" : "col-span-1"}
                                    ${rowKey === 9 ? "bg-gray-300 text-black font-bold" : "text-gray-500"}
                                  
                                  border-b border-stroke items-center gap-3 p-2.5 xl:p-2.5`}
                        >
                          <p className="sm:block">{cell}</p>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <h5 className="text-xl font-semibold text-black ">
                Total Meal Registrations
              </h5>
            </div>
            {data ? (
              <DonutChart labels={mealChartLabels} series={mealChartSeries} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </IdleTimer>
  );
}
