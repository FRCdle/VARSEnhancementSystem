'use server';
import { google } from "googleapis";

export interface SheetsOutputFormat {
    data: string[][]
}

export async function getSheetData() : Promise<SheetsOutputFormat> {
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
        range: 'Public volunteer assignments!A2:J75',
    });

    return { data: <string[][]> data.data.values };
}