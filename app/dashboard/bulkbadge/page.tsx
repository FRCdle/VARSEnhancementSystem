"use client";


import { populateVOLCodes } from '@/app/lib/google-appscript.action';
import { useState } from 'react';
export default function Page() {

    const [data, setData] = useState<string[][]>();

    function generatePDF() {
        
    }

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
                            populateVOLCodes()
                                .then();
                            console.log("hi2");
                        }}
                >
                Generate PDFs
                </button>
            </div>
        </div>
    );
}