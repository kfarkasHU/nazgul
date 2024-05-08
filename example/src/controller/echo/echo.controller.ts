import { BaseHttpController } from "nazgul.core";
import { HttpController, HttpDelete, HttpGet, HttpPost, HttpPut } from "nazgul.hub";
import {
    Request,
    Response
} from "express";

import { Authorize } from "../../filter";

import { ECHO_API_ENDPOINTS } from "./echo.const";

/**
 * @public
 */
@HttpController(ECHO_API_ENDPOINTS.controllerBase)
export class EchoController extends BaseHttpController {

    @Authorize("secret")
    @HttpGet(ECHO_API_ENDPOINTS.get)
    public echoGet(
        req: Request,
        res: Response
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

    @HttpPost(ECHO_API_ENDPOINTS.get)
    public echoPost(
        req: Request,
        res: Response
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

    @HttpPut(ECHO_API_ENDPOINTS.get)
    public echoPut(
        req: Request,
        res: Response
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

    @HttpDelete(ECHO_API_ENDPOINTS.get)
    public echoDelete(
        req: Request,
        res: Response
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

}
