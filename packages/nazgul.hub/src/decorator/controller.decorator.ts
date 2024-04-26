import { Application } from "express";
import { BaseHttpController, HttpHandles } from "@kfarkashu/nazgul.core";

import { HttpContext, } from "../http";

export const HttpController = <T extends BaseHttpController>(
    tag: string,
    path?: string
) => {
    return (
        factory: { new (): T }
    ) => {
        const metadataList: HttpHandles<T> = factory.prototype["__handleCandidates"];
        const server = HttpContext.getServer();
        const instance = new factory();
        Object.entries(metadataList).map(([_key, metadata]) => {
            const handle = getHttpHandle(server, metadata.method);
            const key = metadata.handlerName;
            const handler = instance[key] as Function;
            const handlePath = path
                ? `${path}${metadata.path}`
                : metadata.path
            handle(
                handlePath,
                (req, res, next) => handler.apply(instance, [req, res, next])
            );
        });
    }
}

function getHttpHandle(
    server: Application,
    method: string
) {
    switch(method) {
        case "POST": return server.post.bind(server);
        case "DELETE": return server.delete.bind(server);
        case "PUT": return server.put.bind(server);
        default: return server.get.bind(server);
    }
}
