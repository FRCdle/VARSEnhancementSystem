"use client";

import { useEffect, useState } from 'react';
import { badgePDFtoLink, base64ToPDFLink } from '@/app/lib/pdf-utils';
import { getAdminPin } from '@/app/lib/google-sheets.action';

export default function Page() {

    const [text, setText] = useState<string>("");
    const [waitMessage, setWaitMessage] = useState<String>("");

    const handleClick = async () => {
        setWaitMessage("Generating PDFs...this can take up to 20 seconds");
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwGotDTlgth8LHRu1yxRt6F7_Tlyq3k5mBR9C-bYdUj01Muiw4TbUKtBQePktVMdUxTrw/exec');
            console.log(response); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();

            // triggers the useEffect to download the PDF if data isn't empty
            setText(data);
            setWaitMessage("Done!");
        } catch (error) {
            console.error('Fetch error:', error);
            setText('Error fetching data.'); 
        }
    }

    const downloadPDF = async () => {
        badgePDFtoLink(text)
            .then((link) => link.click());
    }

    useEffect(
        () => {
            if (text != "") {
                downloadPDF();
            }
        }, [text]);

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
                    <div className='mb-3 inline-flex align-middle text-md align-middle'>
                        <button
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                            onClick={
                                () => {
                                    handleClick();
                                }}
                            >
                            Populate and Generate PDFs
                        </button>
                        <hr></hr>
                        <p>
                            {waitMessage}
                        </p>
                    </div>
                </div>

                <div className="col-span-3 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-3">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black ">
                            Download All Badges
                        </h5>
                    </div>
                </div>

                <div className="col-span-3 rounded-sm border border-stroke bg-white px-8 pb-5 pt-8 shadow-xl sm:px-7.5 xl:col-span-3">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black ">
                            Download Individual Badges
                        </h5>
                    </div>
                </div>

            </div>
        </main>
    );
}