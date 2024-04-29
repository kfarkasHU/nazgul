import express from "express";
import { HttpContext, NazgulHub } from "nazgul.hub";
import { NazgulApidocPlugin } from "nazgul.apidoc";
import { NazgulRoutingPlugin } from "nazgul.routing";

const server = express()

NazgulHub
    .addServer(server)
    .usePlugin(new NazgulApidocPlugin())
    .usePlugin(new NazgulRoutingPlugin())
;

import "../controller";
import {  } from "nazgul.hub";

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
