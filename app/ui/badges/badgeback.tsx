import { libre_barcode_39, staatliches } from "../fonts";

export default function BadgeBack({ badgeBackData }: {  badgeBackData: string[][] }) {
    if (!badgeBackData) {
        return <p>nothing to show!</p>
    }

    return (
        <div className="grid grid-cols-6 grid-rows-9 w-1/3 flex-col">
            <div className={`${libre_barcode_39.className} col-span-6 row-span-2 text-5xl text-center align-text-bottom`}>
                <p>{badgeBackData[9][0]}</p>
            </div>
            <div className="col-span-2 row-span-2 text-tiny text-center">
                <p>{badgeBackData[11][0]}</p>
            </div>
            <div className="text-md text-center text-xl">
                <p>{badgeBackData[11][2]}</p>
            </div>
            <div className="text-md text-center text-xl">
                <p>{badgeBackData[11][3]}</p>
            </div>
            <div className="text-md text-center text-xl">
                <p>{badgeBackData[11][4]}</p>
            </div>
            <div className={`${staatliches.className} text-md text-center text-md leading-8`}>
                <p>{badgeBackData[11][5]}</p>
            </div>
        </div>
    );
}