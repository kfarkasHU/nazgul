import { NextFunction, Response, Request } from "express";
import { HttpController, HttpGet, ProducesResponse } from "nazgul.hub";
import { BaseHttpController } from "nazgul.core";

import { HEALTH_ENDPOINTS } from "./health.const";
import { ServerHealthV1Response } from "./health.model";

/**
 * @public
 */
@HttpController(HEALTH_ENDPOINTS.controllerBase)
export class HealthController extends BaseHttpController {

    private readonly _applicationName = "@kfarkashu/nazgul";
    private readonly _applicationVersion = "1.0.0";

    @HttpGet(HEALTH_ENDPOINTS.health)
    @ProducesResponse<ServerHealthV1Response>(200)
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

}
