import { getSheetData } from "@/app/actions/google-sheets.action";
import { Button } from "@/app/ui/button";

export default async function Page() {
  let data : any = await getSheetData();
  data = data.data;
//   console.log(data);

  return(
  <div className="text-xs">
    <div className="rounded-sme bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <h1 className="mb-2 text-xl font-semibold text-black">
        Volunteer Panel
      </h1>

      <div className="flex flex-col">
        {data.map((row : any, rowKey : any) => (
          <div
            className={`${row[0] === "" ? 'bg-slate-200' : '' } grid grid-cols-10 sm:grid-cols-10`}
            key={rowKey}
          >
            {row.map((cell : any, cellKey : any) => (
              <div key={cellKey} className={`${cellKey === 1 ? 'font-black' : 'font-semibold'} ${cell === "NO ASSIGNMENTS" ? 'bg-red-200' : ''} ${cellKey > 3 ? 'border border-stroke' : 'border-b border-stroke'} items-center gap-3 p-2.5 xl:p-2.5 `}>
                <p className="text-center hidden text-black sm:block">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>);
}


