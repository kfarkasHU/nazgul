import express from "express";
import { HttpContext, NazgulHub } from "nazgul.hub";

const server = express()

NazgulHub
    .addServer(server)
;

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
