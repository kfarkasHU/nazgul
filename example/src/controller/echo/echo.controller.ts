import { BaseHttpController } from "@kfarkashu/nazgul.core";
import { HttpController, HttpDelete, HttpGet, HttpPost, HttpPut } from "@kfarkashu/nazgul.server";
import { ECHO_API_ENDPOINTS } from "./echo.const";
import {
    Request,
    Response, 
    NextFunction
} from "express";

@HttpController(ECHO_API_ENDPOINTS.controllerBase)
export class EchoController extends BaseHttpController {

    @HttpGet(ECHO_API_ENDPOINTS.get)
    public echoGet(
        req: Request,
        res: Response,
        _next: NextFunction
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

    @HttpPost(ECHO_API_ENDPOINTS.get)
    public echoPost(
        req: Request,
        res: Response,
        _next: NextFunction
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

    @HttpPut(ECHO_API_ENDPOINTS.get)
    public echoPut(
        req: Request,
        res: Response,
        _next: NextFunction
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

    @HttpDelete(ECHO_API_ENDPOINTS.get)
    public echoDelete(
        req: Request,
        res: Response,
        _next: NextFunction
    ): void {
        const query = req.query;
        res.status(200).send(query);
    }

}
