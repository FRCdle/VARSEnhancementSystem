"use client";
import { getBadges } from '@/app/lib/google-sheets.action';
import BadgeBack from '@/app/ui/badges/badgeback';
import BadgeFront from '@/app/ui/badges/badgefront';
import jsPDF from 'jspdf';
import { useState } from 'react';
export default function Page() {

    const [data, setData] = useState<string[][]>();

    function generatePDF() {
        console.log(data);
        const doc = new jsPDF('portrait', 'pt', 'a4');

        doc.html(document.getElementById("first-badge") as HTMLElement, {
            callback: function(doc) {
                doc.save("generated.pdf");
            },
            x: 10,
            y: 10
        });
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
                                getBadges()
                                    .then((data) => {setData(data)});
                                setTimeout(() => generatePDF(), 2000);
                            }}
                >
                Generate PDFs
                </button>
            </div>
            <div id="first-badge">
                <BadgeFront badgeFrontData={data as string[][]}></BadgeFront>
                <BadgeBack badgeBackData={data as string[][]}></BadgeBack>
                <p>hi</p>
            </div>
        </div>
    );
}