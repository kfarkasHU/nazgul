import { NextFunction, Response, Request } from "express";
import { HttpController, HttpGet, ProducesResponse } from "@kfarkashu/nazgul.server";
import { BaseHttpController } from "@kfarkashu/nazgul.core";

import { HEALTH_ENDPOINTS } from "./health.const";
import { ServerHealthV1Response } from "./health.model";

@HttpController()
export class HealthController extends BaseHttpController {

    private readonly _applicationName = "dazgul";
    private readonly _applicationVersion = "1.0.0";

    @ProducesResponse<ServerHealthV1Response>(200)
    @HttpGet(HEALTH_ENDPOINTS.health)
    public health(
        _req: Request,
        res: Response,
        _next: NextFunction
    ): void {
        const result: ServerHealthV1Response = {
            uptime: process.uptime(),
            version: this._applicationVersion,
            applicationName: this._applicationName
        };
        res.status(200).json(result);
    }

    @HttpGet(HEALTH_ENDPOINTS.health + "2", "multipart/form-data")
    @ProducesResponse<ServerHealthV1Response>(404, "text/xml")
    public health2(
        _req: Request,
        res: Response,
        _next: NextFunction
    ): void {
        const result: ServerHealthV1Response = {
            uptime: process.uptime(),
            version: this._applicationVersion + "2",
            applicationName: this._applicationName
        };
        res.status(200).json(result);
    }

}
