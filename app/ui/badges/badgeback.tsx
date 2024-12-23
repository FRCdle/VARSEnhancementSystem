import { libre_barcode_39 } from "../fonts";

export default function BadgeBack({ badgeBackData }: {  badgeBackData: string[][] }) {
    if (!badgeBackData) {
        return <p>nothing to show!</p>
    }

    return (
        <div className="grid grid-cols-6 grid-rows-9 w-1/3">
            <div className={`${libre_barcode_39.className} col-span-6 row-span-2 text-5xl text-center `}>
                <p>{badgeBackData[9][0]}</p>
            </div>
        </div>
    );
} 