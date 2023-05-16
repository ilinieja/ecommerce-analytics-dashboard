import * as dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(__dirname, '..', '..', '.env')});

export const getAppUrl = () => `http://${process.env.TEST_APP_URI}`;

export const getApiUrl = () => `http://${process.env.TEST_APP_URI}/api`;
