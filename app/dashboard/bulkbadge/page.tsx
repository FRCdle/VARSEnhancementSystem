"use client";

import { useEffect, useState } from 'react';
import { badgePDFtoBlobs } from '@/app/lib/pdf-utils';
import { getAdminPin, getBulkbadgeLink } from '@/app/lib/google-sheets.action';
import { myStore } from '@/app/event-context';


async function getLink(pdfBlob: Blob): Promise<HTMLAnchorElement> {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    const fileName = "output";
    link.download = fileName;
    return link;
} 


export default function Page() {

    const [response, setResponse] = useState<string>("");
    const [waitMessage, setWaitMessage] = useState<string>("Press button to load all badge PDFs. This process can take up to 30 seconds.");

    const [namesList, setNamesList] = useState<string[]>();
    const [blobs, setBlobs] = useState<{full: Blob, backsOnly: Blob, individual: Blob[]}>();

    const { eventID, setEvent } = myStore();

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
            setResponse('Error fetching data.'); 
        }
    }

    const clickFull = async () => {
        if (blobs) {
            getLink(blobs.full)
                .then((link) => {link.click()});
        }
    }

    const clickBacks = async () => {
        if (blobs) {
            getLink(blobs.backsOnly)
                .then((link) => {link.click()});
        }
    }

    const clickIndividual = async (index: number) => {
        if (blobs) {
            getLink(blobs.individual[index])
                .then((link) => {link.click()});
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
                    .then((blobs) => setBlobs(blobs));
                setWaitMessage("Done!");
            }
        }, [response]);

    return (
        <main>
            <h1 className="mb-2 text-xl md:text-2xl text-black">
                BulkBadge PDF Generator
            </h1>
            <div className='mt-4 grid grid-cols-3 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>

                <div className="col-span-3 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-3">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black ">
                            Create PDFs
                        </h5>
                    </div>
                    <div className="text-md">
                        {waitMessage}
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
                    
                </div>

                <div className="col-span-3 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-3">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black ">
                            Download All Badges
                        </h5>
                    </div>
                    <div>
                        <button
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            onClick={
                                () => {
                                    clickFull();
                                }}
                            >
                            Full
                        </button>
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
                    <div>
                        <button
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            onClick={
                                () => {
                                    clickIndividual(1);
                                }}
                            >
                            Download
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}