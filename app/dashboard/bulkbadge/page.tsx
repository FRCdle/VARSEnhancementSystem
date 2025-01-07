"use client";

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
export default function Page() {

    const [text, setText] = useState<string>("");

    const handleClick = async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxpy07geaxztmwvBQwNsyfmk-oeV58QGdbKzCCzIZjQByHf5uDh5S1ELV3O3ZgN9zKkVg/exec');
            console.log(response); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text(); 
            setText(data);
            console.log(data);
        } catch (error) {
            console.error('Fetch error:', error);
            // Handle the error, e.g., display an error message to the user
            setText('Error fetching data.'); 
        }
    }

    const downloadPDF = async () => {
        const pdf = new jsPDF();
        pdf.text(text, 10, 10);
        pdf.save('Estadodecuenta.pdf');
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
                            console.log("hi2");
                        }}
                >
                Generate PDFs
                </button>
            </div>
        </div>
    );
}