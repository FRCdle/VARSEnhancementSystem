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
            "private_key": process.env.private_key,
            "client_email": process.env.client_email,
            "universe_domain": process.env.universe_domain
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1lXEpbhvrI7XL6g5kPScobm1Nmbj_MgMUe_Zevl7n8vA",
        range: 'Public volunteer assignments!A2:J74',
    });

    return { data: <string[][]> data.data.values };
}