import express from "express";
import { HttpContext, NazgulHub } from "nazgul.hub";
import { NazgulRoutingPlugin } from "nazgul.plugin-routing";
import { NazgulSwadocPlugin } from "nazgul.plugin-swadoc";

const server = express()

NazgulHub
    .addServer(server)
    .usePlugin(new NazgulRoutingPlugin())
    .usePlugin(new NazgulSwadocPlugin("out.json"))
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
