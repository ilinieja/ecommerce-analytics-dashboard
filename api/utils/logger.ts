import pino from "pino";

export default pino({
  level: process.env.API_LOG_LEVEL || "info",
});
