import { ObjectDescriptor } from "./descriptor.model";

export interface HttpHandles<T> {
    [key: string]: HttpHandler<T>
}

export interface HttpHandler<T> {
    path: string;
    handlerName: keyof T;
    method: "GET" | "POST" | "PUT" | "DELETE";              // TODO: Enum for this
    responses: HttpResponses;
    pathParams: Array<ParameterDescriptor>;
    queryParams: Array<ParameterDescriptor>;
    headerParams: Array<ParameterDescriptor>;
    requestContentType: string;
}

export interface HttpResponses {
    [key: number]: HttpResponsePayload;
}

export interface HttpResponsePayload {
    payload: ObjectDescriptor;
    responseContentType: string;
}

interface ParameterDescriptor {
    name: string;
    type: string;
    format: string;
}
