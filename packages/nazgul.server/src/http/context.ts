import { Application, Router } from "express";

export class HttpContext {

    private static _server: Application | undefined;
    private static _router = Router();

    public static setServer(server: Application): void {
        this._server = server;
    }
    
    public static getServer(): Application {
        if (!this._server) {
            throw new Error("HttpContext::_server is nil!");
        }
        return this._server;
    }

    public static addGetRoute(
        path: string,
        handler: () => void
    ): void {
        this._router.get(path, () => handler())
    }

    public static getRouteContext(): Router {
        return this._router;
    }

    public static resetRouteContext(): void {
        this._router = Router();
    }

}
