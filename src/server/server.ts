import express from "express";
import { HttpContext } from "../http";

const server = express()
HttpContext.setServer(server);
import "../controller";

server.listen(9000);
