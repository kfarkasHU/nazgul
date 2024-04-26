import { Application, Router } from "express";
import { AppRouteInfo } from "./context.model";

export class HttpContext {

    private static _server: Application | undefined;

    public static setServer(server: Application): void {
        this._server = server;
    }
    
    public static getServer(): Application {
        if (!this._server) {
            throw new Error("HttpContext::_server is nil!");
        }
        return this._server;
    }

    public static listAllRoutes(): ReadonlyArray<AppRouteInfo> {
        if (!this._server) {
            throw new Error("HttpContext::_server is nil!");
        }
        const routes: Array<AppRouteInfo> = [];

        const router: { stack: Array<{ route: { path: string, methods: object } }> } = this._server._router;
        router.stack.forEach(m => {
            if (!m || !m.route) return;
            const keys = Object.keys(m.route.methods);
            keys.forEach(o => routes.push({ fullPath: m.route.path, method: o.toUpperCase() }));
        })
        return routes;
    }

}
