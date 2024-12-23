export default function BadgeFront({ badgeFrontData }: {  badgeFrontData: string[][] }) {
    if (!badgeFrontData) {
        return <p>nothing to show!</p>
    }
    console.log(badgeFrontData);

    return (
        <div className="grid grid-cols-6 grid-rows-9 w-1/3">
            <div className="col-span-6 row-span-3 text-2xl text-center m-auto">
                <p>{badgeFrontData[0][0]}</p>
            </div>
            <div className="col-span-6 row-span-5 text-3xl text-center m-auto">
                <p>{badgeFrontData[3][0]}</p>
            </div>
            <div className="col-span-6 row-span-1 bg-black text-white text-center">
                <p>{badgeFrontData[8][0]}</p>
            </div>
        </div>
    );
}