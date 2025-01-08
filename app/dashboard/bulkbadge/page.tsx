"use client";

import { useEffect, useState } from 'react';
import { badgePDFtoLink, base64ToPDFLink } from '@/app/lib/pdf-utils';

export default function Page() {

    const [text, setText] = useState<string>("");

    const handleClick = async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwGotDTlgth8LHRu1yxRt6F7_Tlyq3k5mBR9C-bYdUj01Muiw4TbUKtBQePktVMdUxTrw/exec');
            console.log(response); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();

            // triggers the useEffect to download the PDF if data isn't empty
            setText(data);
            console.log(data);
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
        <div>
            <div>
                <h1>
                    BulkBadge PDF Generator
                </h1>
                <button
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                    onClick={
                        () => {
                            handleClick();
                        }}
                >
                Generate PDFs
                </button>
            </div>
        </div>
    );
}