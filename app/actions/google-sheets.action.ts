'use server';
import { google } from "googleapis";

export async function getSheetData() { 
    console.log(process.env.private_key);
  const glAuth = await google.auth.getClient({
        projectId: process.env.project_id,
        credentials: {
            "type": process.env.type,
            "project_id": process.env.project_id,
            "private_key_id": process.env.private_key_id,
            "private_key": process.env.private_key,
            "client_email": "vars-reader@vars-enhancement-system.iam.gserviceaccount.com",
            "universe_domain": process.env.universe_domain
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1lXEpbhvrI7XL6g5kPScobm1Nmbj_MgMUe_Zevl7n8vA",
        range: 'Volunteer panel!A2:J74',
    });

    return { data: data.data.values };
}