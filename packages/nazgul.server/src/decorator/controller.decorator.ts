import { Application } from "express";
import { BaseHttpController, HttpContext, HttpHandler, HttpHandles } from "../http";

export const HttpController = <T extends BaseHttpController>() => {
    return (
        factory: { new (): T }
    ) => {
        const metadataList: HttpHandles<T> = factory.prototype["__handleCandidates"];
        const server = HttpContext.getServer();
        const instance = new factory();
        Object.entries(metadataList).map(([_key, metadata]) => {
            console.log("metadata", metadata);
            const handle = getHttpHandle(server, metadata.method);
            const key = metadata.handlerName;
            const handler = instance[key] as Function;
            handle(
                metadata.path,
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
        default: return server.get.bind(server);
    }
}
