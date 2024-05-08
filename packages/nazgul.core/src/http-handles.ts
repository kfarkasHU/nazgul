import { Request, Response } from "express";
import { Property } from "./descriptor.model";

export interface HttpHandles<T> {
    [key: string]: HttpHandler<T>
}

type HttpFilter = (req: Request, res: Response) => Promise<boolean> | boolean;

export interface HttpHandler<T> {
    path: string;
    handlerName: keyof T;
    method: "GET" | "POST" | "PUT" | "DELETE";              // TODO: Enum for this
    responses: HttpResponses;
    pathParams: Array<ParameterDescriptor>;
    queryParams: Array<ParameterDescriptor>;
    headerParams: Array<ParameterDescriptor>;
    requestContentType: string;
    filters: Array<HttpFilter>;
}

export interface HttpResponses {
    [key: number]: HttpResponsePayload;
}

export interface HttpResponsePayload {
    payload: Property;
    responseContentType: string;
}

interface ParameterDescriptor {
    name: string;
    type: string;
    format: string;
}
