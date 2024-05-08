import { Application } from "express";
import { HttpHandles, NazgulControllerPlugin } from "nazgul.core";
import { HttpContext } from "nazgul.hub";

export class NazgulRoutingPlugin extends NazgulControllerPlugin {

    public initialize(): boolean | Promise<boolean> {
        return true;
    }

    public onController<T>(
        path: string,
        factory: { new (): T },
        _className: string
    ): boolean | Promise<boolean> {
        try {
            const server = HttpContext.getServer();
            const metadataList: HttpHandles<T> = factory.prototype["__handleCandidates"];
            const instance = new factory();
            Object.entries(metadataList).map(([_key, metadata]) => {
                const handle = this.getHttpHandle(server, metadata.method);
                const key = metadata.handlerName;
                const handler = instance[key] as Function;
                const handlePath = `${path}${metadata.path}`;
                handle(
                    handlePath,
                    async (req, res) => {
                        for (const filter of metadata.filters) {
                            const result = await filter(req, res)
                            if (!result) {
                                return;
                            }
                        }
                        handler.apply(instance, [req, res])
                    }
                );
            });
            return true;
        } catch {
            return false;
        }

    }


    private getHttpHandle(
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


}
