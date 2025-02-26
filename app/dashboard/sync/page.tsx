"use client";
import { myStore } from "@/app/event-context";
import { getSheetData, getHomePanel, getMealCheckin, getSync, writeCellData, writeVolunteerData, writeDaltonVolunteerData, getDaltonSync } from "@/app/lib/google-sheets.action";
import { IdleTimer } from "@/app/lib/idle-timer";
import { useEffect, useState } from "react";

export default function Page() {
  const timeout = 1000;

  const [data, setData] = useState<string[][]>();
  const [refreshToken, setRefreshToken] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [writtenData, setWrittenData] = useState<string[][]>();
  const { eventID, setEvent } = myStore();
  
  const [hasRunTest, setHasRunTest] = useState(false); // Track test execution

  const test = () => {
    if (data) {
      setWrittenData([...data]); // Ensure data exists before copying
      setHasRunTest(true);
    }
  };

  useEffect(() => {
    if (isActive) {
      const fetchData = async () => {
        const fetchedData =
          eventID === 2 ? await getDaltonSync(eventID) : await getSync(eventID);
        setData(fetchedData);
      };

      fetchData().finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), timeout);
      });
    } else {
      setTimeout(() => setRefreshToken(Math.random()), timeout);
    }
  }, [refreshToken]);

  // Run test() once, but only after data is successfully fetched
  useEffect(() => {
    if (data && !hasRunTest) {
      test();
    }
  }, [data, hasRunTest]);
  const handleOnIdle = (event: object) => {
    alert("Page has timed out. Close dialogue to continue viewing page.");
    setIsActive(false);
  };
  
  const handleOnActive = (event: object) => {
    setIsActive(true);
   };

  const handleWrittenData = (row : number, column : number, newData : string) => {
    const copy = writtenData?.slice();
    copy?.map(
      (row: string[], rowKey: number) =>
        (copy![rowKey] = row.slice(0, row.length))
      );
    copy![row][column] = newData;
    setWrittenData(copy);
  }

  return(
<IdleTimer
    timeout={1000 * 60 * 15} // 15 minutes timeout
    onIdle={handleOnIdle}
    onActive={handleOnActive}
  >
  <div className="">
    <h1 className="mb-2 text-xl md:text-2xl text-black">
      Volunteer Information 
    </h1>
    <div className={`text-xs rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default`}>
        <button
            onClick={() => {
                if (eventID == 2) {
                  writeDaltonVolunteerData(writtenData!, eventID).then(() =>
                    setRefreshToken(Math.random())
                    );
                } else {
                  writeVolunteerData(writtenData!, eventID).then(() =>
                    setRefreshToken(Math.random())
                    );
                }
            }}
            className="h-10 mb-3 items-center rounded-lg bg-blue-500 px-4 text-m font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
            Update Information
        </button>
        
      <div className="overflow-scroll flex flex-col">
        {data?.map((row : string[], rowKey : number) => (
          <div
            className={`grid grid-cols-15`}
            key={rowKey}
          >
            {row.map((cell : string, cellKey : number) => (
              <div key={cellKey} className={`font-semibold  items-center`}>
                <div>
                  <label className="text-m text-gray-500">
                    <input
                    
                    defaultValue={cell}
                    onChange={
                        (e) => handleWrittenData(rowKey, cellKey, e.target.value)
                    }
                    className="h-8 mr-3 px-0.5 text-xs"
                    name="cell-input"
                    type="text"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div> </IdleTimer>
  
);
}