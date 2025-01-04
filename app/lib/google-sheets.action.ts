'use server';
import { google } from "googleapis";

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
        spreadsheetId: process.env.spreadsheet_id,
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

export async function getHomePanel() : Promise<string[][]> {
    return getSheetData('Home!A1:K34');
}

export async function getBadges() : Promise<string[][]> {
    return getSheetData('Bulkbadge!A1:F3420')
}