"use client";

import { JSX, useEffect, useState } from 'react';
import { badgePDFtoBlobs } from '@/app/lib/pdf-utils';
import { getAdminPin, getBulkbadgeLink } from '@/app/lib/google-sheets.action';
import { myStore } from '@/app/event-context';
import { Field, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';


async function getLink(pdfBlob: Blob): Promise<HTMLAnchorElement> {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    const fileName = "output";
    link.download = fileName;
    return link;
} 


export default function Page() {

    const { eventID, setEvent } = myStore();

    // Modes: 1 for unloaded, 2 for normal options, 3 for check-in, 4 for custom badge
    const [mode, setMode] = useState(1);

    const [response, setResponse] = useState<string>("");
    const [waitMessage, setWaitMessage] = useState<string>("");

    const [namesList, setNamesList] = useState<string[]>(["none"]);
    const [selectedName, setSelectedName] = useState(0);
    const [blobs, setBlobs] = useState<{full: Blob, backsOnly: Blob, individual: Blob[]}>();



    const handleClick = async () => {
        setWaitMessage("Loading Badge PDFs. This process can take up to 30 seconds.");
        try {
            const link = await getBulkbadgeLink(eventID);
            const response = await fetch(link[0][0]);
            console.log(response); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();

            // triggers the useEffect to download the PDF if data isn't empty
            setResponse(data);
        } catch (error) {
            console.error('Fetch error:', error);
            setWaitMessage("Something went wrong. Please try again.")
            setResponse('Error fetching data.'); 
        }
    }

    const clickFull = async () => {
        if (blobs) {
            getLink(blobs.full)
                .then((link) => {link.click()});
        } else {
            alert("Please load badges first (click the button in the first box).");
        }
    }

    const clickBacks = async () => {
        if (blobs) {
            getLink(blobs.backsOnly)
                .then((link) => {link.click()});
        } else {
            alert("Please load badges first (click the button in the first box).");
        }
    }

    const clickIndividual = async () => {
        if (blobs) {
            getLink(blobs.individual[selectedName])
                .then((link) => {link.click()});
        } else {
            alert("Please load badges first (click the button in the first box).");
        }
    }
    
    useEffect(
        () => {
            if (response == "" || response == "setup required") {
                // handle error
            } else {
                const temp = response.split(",");
                const [PDF, ...tempNamesList] = temp;
                setNamesList(tempNamesList);
                badgePDFtoBlobs(PDF, tempNamesList.length)
                    .then((blobs) => {
                        setBlobs(blobs);
                        setWaitMessage("Done");
                        setMode(2);
                    })
                
            }
        }, [response]);
    
    let content;
    if (mode == 1) {
        content = (
            <>
                <div className="col-span-3 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-3">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black ">
                            Please choose an option (more coming soon):
                        </h5>
                    </div>
                    <div className="text-md">
                    <p>Download all badges in bulk, or filter individual badges by name</p>
                    </div>
                    <div className='mb-3 inline-flex align-middle text-md'>
                        <button
                            className={`rounded-md px-4 py-2 text-sm text-white transition-colors ${blobs? "bg-gray-500" : "bg-blue-500 hover:bg-blue-400"}`}
                            onClick={
                                () => {
                                    handleClick();
                                }}
                            >
                            Load Badges
                        </button>
                    </div>
                    <div className="text-md">
                        {waitMessage}
                    </div>
                </div>
            </>
        )
    } else if (mode == 2) {
        content = (
            <>
                <div className="col-span-3 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-3">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black ">
                            Download All Badges
                        </h5>
                    </div>
                    <div className="p-1 text-md flex">
                        <p className="p-1">Front and back: </p>
                        <button
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            onClick={
                                () => {
                                    clickFull();
                                }}
                            >
                            Full
                        </button>
                    </div>
                    <div className="p-1 text-md flex">
                        <p className="p-1">Backs Only: </p>
                        <button
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            onClick={
                                () => {
                                    clickBacks();
                                }}
                            >
                            Backs Only
                        </button>
                    </div>
                </div>

                <div className="col-span-3 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-3">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black ">
                            Download Individual Badges
                        </h5>
                    </div>
                    <div className="p-1 text-md flex">
                        <p className="p-1">Change Volunteer (type to search): </p>
                        <Listbox value={selectedName} onChange={setSelectedName}>
                            <ListboxButton className="border text-black p-1 border-black bg-gray-100">{namesList[selectedName]} </ListboxButton>
                            <ListboxOptions anchor="bottom" className="bg-gray-100">
                                {namesList.map((name, i) => (
                                <ListboxOption key={i} value={i} className="data-[focus]:bg-blue-100">
                                    {name}
                                </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>
                    </div>
                    <div>
                        <button
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            onClick={
                                () => {
                                    clickIndividual();
                                }}
                            >
                            Download
                        </button>
                    </div>
                </div>
            </>
        )
    }
    return (
        <main>
            <h1 className="mb-2 text-xl md:text-2xl text-black">
                BulkBadge PDF Generator
            </h1>
            <div className='mt-4 grid grid-cols-3 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                {content}
            </div>
        </main>
    );
}