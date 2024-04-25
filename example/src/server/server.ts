import express from "express";
import { HttpContext } from "@kfarkashu/nazgul.server";

const server = express()
HttpContext.setServer(server);
import "../controller";

server.listen(9000);
