import { getSheetData } from "@/app/lib/sheetsdata";
import { Button } from "@/app/ui/button";

export default async function Page() {
  const response : any = await getSheetData();
  // console.log(response);
  console.log(response);

  return (
  <div>
    <h1> gyatt </h1>
    <p> {response.data} </p>
  </div>);
}