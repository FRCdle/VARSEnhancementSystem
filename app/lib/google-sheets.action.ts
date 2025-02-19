'use server';
import { google } from "googleapis";

function getSpreadsheetID(eventID: number) : string {
    console.log("seeing this? " + eventID);
    if (eventID == 1) {
        return process.env.gainesville_spreadsheet_id as string;
    } else if (eventID == 2) {
        return Buffer.from(process.env.dalton_spreadsheet_id as string, 'base64').toString('ascii');
    } else if (eventID == 3) {
        return process.env.gwinnett_spreadsheet_id as string;
    } else if (eventID == 4) {
        return process.env.statesboro_spreadsheet_id as string;
    } else if (eventID == 5) {
        return process.env.albany_spreadsheet_id as string;
    } else {
        return process.env.macon_spreadsheet_id as string;
    }
}

function getHotelSpreadsheetID(eventID: number) : string {
    if (eventID == 1) {
        return process.env.gainesville_hotel_spreadsheet_id as string;
    } else if (eventID == 2) {
        return Buffer.from(process.env.dalton_hotel_spreadsheet_id as string, 'base64').toString('ascii');
    } else if (eventID == 3) {
        return process.env.gwinnett_hotel_spreadsheet_id as string;
    } else if (eventID == 4) {
        return process.env.statesboro_hotel_spreadsheet_id as string;
    } else if (eventID == 5) {
        return process.env.albany_hotel_spreadsheet_id as string;
    } else {
        return process.env.macon_hotel_spreadsheet_id as string;
    }
}

export async function getSheetData(spreadsheetRange: string, eventID: number) : Promise<string[][]> {
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
        spreadsheetId: getSpreadsheetID(eventID),
        range: spreadsheetRange,
    });
    //console.log(process.env["spreadsheet_id"]);

    return { data: <string[][]> data.data.values }.data;
}

export async function getHotelSheetData(spreadsheetRange: string, eventID: number) : Promise<string[][]> {
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
          spreadsheetId: getHotelSpreadsheetID(eventID),
          range: spreadsheetRange,
      });
  
      return { data: <string[][]> data.data.values }.data;
  }

/**
 * Writes data to range in the spreadsheet
 * @param spreadsheetCell the specific range to write to
 * @param values the 2D array of strings inputted into that range
 */
export async function writeCellData(spreadsheetRange: string, values : string[][], eventID: number) {
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
        spreadsheetId: getSpreadsheetID(eventID),
        range: spreadsheetRange,
        valueInputOption: "RAW"
    });
}

/**
 * Writes the given input to the cell that asks for VOLCode
 * @param VOLCode
 */
export async function writeVolCode(VOLCode : string[][], eventID: number) {
    writeCellData('Home!E3', VOLCode, eventID);
}

export async function writeVolunteerCell(cellData : string[][], row : number, column : number, eventID: number) {
    writeCellData('sync!' + String.fromCharCode(column + 65) + (row + 1), cellData, eventID);
}

export async function writeVolunteerData(cellData : string[][], eventID: number) {
    writeCellData('sync!A1:i', cellData, eventID);
}

export async function getHomePanel(eventID: number) : Promise<string[][]> {
    return getSheetData('Home!A1:K34', eventID);
}

export async function getMealCheckin(eventID: number) : Promise<string[][]> {
    return getSheetData('Meal checkin!A1:L', eventID)
}

export async function getOutput(eventID: number) : Promise<string[][]> {
    return getSheetData('output!A1:P', eventID)
}

export async function getAdminPin(eventID: number) : Promise<string[][]> {
    return getSheetData('Home!B18', eventID)
}

export async function getHotelPage(eventID: number) : Promise<string[][]> {
    return getHotelSheetData('Personal info Hotel 1 - EXPORT!A1:N', eventID)
}

export async function getHotelLocations(eventID: number) : Promise<string[][]> {
    return getHotelSheetData('Builder!A1:B', eventID)
}

export async function getSync(eventID: number) : Promise<string[][]> {
    return getSheetData('sync!A1:I', eventID)
}

export async function writeSync(cellData : string[][], eventID: number) {
    writeCellData('sync!A1:I', cellData, eventID);
}

export async function getBulkbadgeLink(eventID: number) : Promise<string[][]> {
    return getSheetData('Home!A29', eventID);
}