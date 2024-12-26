import { libre_barcode_39, staatliches } from "../fonts";

export default function BadgeBack({ badgeBackData }: {  badgeBackData: string[][] }) {
    if (!badgeBackData) {
        return <p>nothing to show!</p>
    }

    return (
        <div className="grid grid-cols-6 grid-rows-9 w-1/3 flex-col">
            <div className={`${libre_barcode_39.className} col-span-6 row-span-2 text-5xl text-center align-text-bottom`}>
                <p>{badgeBackData[9][0]}</p> {/* Volcode Barcode */}
            </div>
            <div className="col-span-2 row-span-2 text-tiny text-center">
                <p>{badgeBackData[11][0]}</p> {/* Badge must be reprinted warning */}
            </div>
            {badgeBackData[11].slice(2,5).map((cellText, i) => (
                <div className={`text-center ${cellText.toUpperCase() == "YES" ? `text-white bg-black` : `text-black bg-white`}`} key={i}>
                    {cellText} {/* Day 1, Day 2, Day 3 */}
                </div>
            ))}
            <div className={`${staatliches.className} text-md text-center leading-8`}>
                <p>{badgeBackData[11][5]}</p> {/* MEAL GRID */}
            </div>
            {badgeBackData[12].slice(2,5).map((cellText, i) => (
                <div className={`text-center ${cellText.toUpperCase() == "YES" ? `text-white bg-black` : `text-black bg-white`}`} key={i}>
                    {cellText} {/* 1st YES or NO based on meal data */}
                </div>
            ))}
            <div className={`text-md text-center text-sm leading-8`}>
                <p>{badgeBackData[12][5]}</p> {/* Breakfast */}
            </div>
            <div className="col-span-2 row-span-3 text-tiny text-center">
                <p>{badgeBackData[12][0]}</p> {/* You may make changes to your meal information... */}
            </div>
            {badgeBackData[13].slice(2,5).map((cellText, i) => (
                <div className={`text-center ${cellText.toUpperCase() == "YES" ? `text-white bg-black` : `text-black bg-white`}`} key={i}>
                    {cellText} {/* 2nd YES or NO based on meal data */}
                </div>
            ))}
            <div className={`text-md text-center text-sm leading-8`}>
                <p>{badgeBackData[13][5]}</p> {/* Lunch */}
            </div>
            {badgeBackData[13].slice(2,5).map((cellText, i) => (
                <div className={`text-center ${cellText.toUpperCase() == "YES" ? `text-white bg-black` : `text-black bg-white`}`} key={i}>
                    {cellText} {/* 3rd YES or NO based on meal data */}
                </div>
            ))}
            <div className={`text-md text-center text-sm leading-8`}>
                <p>{badgeBackData[14][5]}</p> {/* Dinner */}
            </div>
        </div>
    );
}