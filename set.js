




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEFjMEZ4NjU5bzFEeVAwMFJ6OW1MamRSdzdaTUE0OHRRTGhyMnowcmhXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWRrQnlQNk10d3lWN003TzMwcTBrNDhHQU5Ia2xQQUdLd3lZSVg5RnNnZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSGdxV0FLWWhwcjdiNDY5Q1hQaVF0WTBjMWh2ejZLdEswZXBXNEFZbjBVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNNERsV0xndUpINHMrM3VvQ0RISjVoamxZVEZDYzVqdXhjQkIyVjBqM2xRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKOXEzVmUwTDZUM0Z1Ly9IZWdvZDlhK0doTmRPSUtSdkN6RTlXaTB0RU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlPNlJ3cDFzbWgzSmRWbmtQem84cjB4Ullxc2lFZXhnZnNlVUtpRnBIeTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU8walU0VjRYNEFPOXViVWdmaHNMcXhsdkRGMVUrcUc4QlJlTGtQeklHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2VuZUJtQkNzcDhjMEFNS0FxYURWQmo2S1FJL00rZ2JjK0pPaVQwL1d5WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjV2Q0U3dGpIRlJOTGZwWEo4MVZVd29XVUhtV2cyblJUaTdKOXpTV01OUVNsdFF0ZFh1OVU0SEdaaVVscHczWXBiOTFOSFJSRWRkQWFlbHFvUEc0dkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE4LCJhZHZTZWNyZXRLZXkiOiJaRVl4QVRZSVgwYmdyVUw2eDVMZkFJMTFXbnRyMTIxckZOZi9qT2c3d1YwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NTUsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo1NSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJBOFNROVZQWCIsIm1lIjp7ImlkIjoiMjM0OTExNTk4MzQ2MDo1OUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIxNTUwNDc5OTE5MTI1NTo1OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p2ZWhMY0NFTWVwcThFR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlF3clplVDdDTTRxcEo1T3J0cEFEMjhVMjBvb21MSzUvcS9JVUxhS2c2V0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkJyN2NmVUpjNk01cVp3eTBpNWt4WUMyZVJiQW50c3REWXlSWEpDRndPbC9zbWZHK2hOUFMreEZtYmZCdzR0dmZDQk5rWmpNQ21KOTlVajdZTkEwaERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJONmhBYjFJa1lkR3luUWZBbnk4Ny9WckRWc0x1aEYrckRJTGdQUEM1MUtmZjhGS0FyVWh3RFBreVJkMFNETkFrN0Z2MGhKUXg5MW1tc1d4V3Vaa2RCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxMTU5ODM0NjA6NTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVU1LMlhrK3dqT0txU2VUcTdhUUE5dkZOdEtLSml5dWY2dnlGQzJpb09saCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3NjM3NDYwLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Josh Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349115983460",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'JOSH_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
