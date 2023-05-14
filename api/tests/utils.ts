import * as dotenv from "dotenv";
dotenv.config();

export const getApiUri = () => `http://${process.env.TEST_APP_URI}`;
