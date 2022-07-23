import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const PORT = 5050;

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
