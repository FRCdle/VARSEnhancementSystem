'use server';
import { google } from "googleapis";

export async function populateVOLCodes() {
    console.log("hi3");
    const scriptId = '1JXt-0sfHOifSHXc4NFUkpVVsOvTWKWKxtepHgHbKm5fM7dJDGZ8YZy47';

    // const {GoogleAuth} = require('google-auth-library');
    // const {google} = require('googleapis');

    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
    // const auth = new GoogleAuth({
    //     scopes: 'https://www.googleapis.com/auth/drive',
    // });
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
    const script = google.script({version: 'v1', auth: glAuth});

    try {
        // Make the API request. The request object is included here as 'resource'.
        const resp = await script.scripts.run({
            auth: glAuth,
            scriptId: scriptId,

        });
        console.log(resp.data);
    } catch (err) {
        // TODO(developer) - Handle error
        console.log(err);
    }
}