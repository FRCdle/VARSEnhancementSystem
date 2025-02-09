"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "./click-outside";
import clsx from 'clsx';
import { useEvent } from "./event-state";
import { getSheetData } from "@/app/lib/google-sheets.action";

const EventDropDown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);  

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md text-slate-200 bg-sidenav-color p-3 text-sm font-medium hover:bg-sidenav-color-hover md:flex-none md:justify-start md:p-2 md:px-3")}
        href="#"
      >
        <p className="hidden md:block">Select Event</p>
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <button
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                Dalton
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                Gainsville
              </button>
            </li>
            <li>
              <button
               onClick={ () => console.log(event)}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                Gwinnett
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default EventDropDown;

