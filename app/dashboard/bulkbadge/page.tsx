"use client";

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import fs from 'fs';

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
            setText(data);
            console.log(data);
        } catch (error) {
            console.error('Fetch error:', error);
            setText('Error fetching data.'); 
        }
    }

    const downloadPDF = async () => {
        // base64 string
        var base64str = text;

        // decode base64 string, remove space for IE compatibility
        var binary = atob(base64str.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }

        // create the blob object with content-type "application/pdf"               
        var blob = new Blob( [view], { type: "application/pdf" });

        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        var fileName = "output";
        link.download = fileName;
        link.click();
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