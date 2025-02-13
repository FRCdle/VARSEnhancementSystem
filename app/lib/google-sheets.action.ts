'use server';
import { google } from "googleapis";
import { useEvent } from "../ui/dashboard/event-dropdown/event-state";

export async function getSheetData(spreadsheetRange: string) : Promise<string[][]> {
  const glAuth = await google.auth.getClient({
        projectId: process.env.project_id,
        credentials: {
            "type": process.env.type,
            "project_id": process.env.project_id,
            "private_key_id": process.env.private_key_id,
            "private_key": Buffer.from(process.env.private_key as string, 'base64').toString('ascii'),
            "client_email": Buffer.from(process.env.client_email as string, 'base64').toString('ascii'),
            "universe_domain": process.env.universe_domain
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });
    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: process.env["spreadsheet_id"],
        range: spreadsheetRange,
    });
    //console.log(process.env["spreadsheet_id"]);

    return { data: <string[][]> data.data.values }.data;
}

export async function getHotelSheetData(spreadsheetRange: string) : Promise<string[][]> {
    const glAuth = await google.auth.getClient({
          projectId: process.env.project_id,
          credentials: {
              "type": process.env.type,
              "project_id": process.env.project_id,
              "private_key_id": process.env.private_key_id,
              "private_key": Buffer.from(process.env.private_key as string, 'base64').toString('ascii'),
              "client_email": Buffer.from(process.env.client_email as string, 'base64').toString('ascii'),
              "universe_domain": process.env.universe_domain
          },
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
  
      const glSheets = google.sheets({ version: "v4", auth: glAuth });
  
      const data = await glSheets.spreadsheets.values.get({
          spreadsheetId: process.env.hotel_spreadsheet_id,
          range: spreadsheetRange,
      });
  
      return { data: <string[][]> data.data.values }.data;
  }

/**
 * Writes data to range in the spreadsheet
 * @param spreadsheetCell the specific range to write to
 * @param values the 2D array of strings inputted into that range
 */
export async function writeCellData(spreadsheetRange: string, values : string[][]) {
    const glAuth = await google.auth.getClient({
        projectId: process.env.project_id,
        credentials: {
            "type": process.env.type,
            "project_id": process.env.project_id,
            "private_key_id": process.env.private_key_id,
            "private_key": Buffer.from(process.env.private_key as string, 'base64').toString('ascii'),
            "client_email": Buffer.from(process.env.client_email as string, 'base64').toString('ascii'),
            "universe_domain": process.env.universe_domain
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    await glSheets.spreadsheets.values.update({
        requestBody: {values : values},
        spreadsheetId: process.env.spreadsheet_id,
        range: spreadsheetRange,
        valueInputOption: "RAW"
    });
}

/**
 * Writes the given input to the cell that asks for VOLCode
 * @param VOLCode
 */
export async function writeVolCode(VOLCode : string[][]) {
    writeCellData('Home!E3', VOLCode);
}

export async function writeVolunteerCell(cellData : string[][], row : number, column : number) {
    writeCellData('sync!' + String.fromCharCode(column + 65) + (row + 1), cellData);
}

export async function writeVolunteerData(cellData : string[][]) {
    writeCellData('sync!A1:i', cellData);
}

export async function getHomePanel() : Promise<string[][]> {
    return getSheetData('Home!A1:K34');
}

export async function getMealCheckin() : Promise<string[][]> {
    return getSheetData('Meal checkin!A1:L')
}

export async function getOutput() : Promise<string[][]> {
    return getSheetData('output!A1:P')
}

export async function getAdminPin() : Promise<string[][]> {
    return getSheetData('Home!B18')
}

export async function getHotelPage() : Promise<string[][]> {
    return getHotelSheetData('Personal info Hotel 1 - EXPORT!A1:N')
}

export async function getHotelLocations() : Promise<string[][]> {
    return getHotelSheetData('Builder!A1:B')
}

export async function getSync() : Promise<string[][]> {
    return getSheetData('sync!A1:I')
}

export async function writeSync(cellData : string[][]) {
    writeCellData('sync!A1:I', cellData);
}