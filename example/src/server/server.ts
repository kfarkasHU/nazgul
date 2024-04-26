import express from "express";
import { HttpContext } from "@kfarkashu/nazgul.server";

const server = express()
HttpContext.setServer(server);
import "../controller";

server.listen(9000, () => {
    const routes = HttpContext
        .listAllRoutes()
        .map(m => {
            const method = `[${m.method}]`.padEnd(15, " ");
            return `${method}${m.fullPath}`;
        });
    ;
    routes.forEach(m => console.log(m));
});
