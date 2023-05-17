const cors = require("cors");
const { join } = require("path");
const express = require("express");

const { PORT, NODE_ENV } = process.env;

const server = express();

server.use(cors());

server.use(express.static(join(__dirname, "/dist")));

server.get("/*", (_req, res) => {
  return res.sendFile(__dirname + "/dist/index.html");
});

if (typeof PORT !== "string" && typeof NODE_ENV !== "string") {
  throw new Error("PORT and NODE_ENV must be defined");
}

server.listen(process.env.PORT, () => {
  console.log(`Kpi is running on port ${process.env.PORT}`);
  console.log(`Environment is ${process.env.NODE_ENV}`);
});
