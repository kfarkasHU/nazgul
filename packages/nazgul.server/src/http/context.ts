import { Application, Router } from "express";

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

}
