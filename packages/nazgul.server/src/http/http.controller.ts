export abstract class BaseHttpController {
    public __handleCandidates: HttpHandles<typeof this> = {};
}

export interface HttpHandles<T> {
    [key: string]: HttpHandler<T>
}

interface ParameterDescriptor {
    name: string;
    type: string;
    format: string;
}

export interface HttpHandler<T> {
    path: string;
    handlerName: keyof T;
    method: "GET" | "POST";
    responses: HttpResponses;
    pathParams: Array<ParameterDescriptor>;
    queryParams: Array<ParameterDescriptor>;
    headerParams: Array<ParameterDescriptor>;
    requestContentType: string;
}

export interface HttpResponses {
    [key: number]: HttpResponsePayload;
}

interface BaseProperty {
    type: string;
}

interface PropertyDescriptor extends BaseProperty {
    type: "primitive";
    name: string;
    format: string;
    isNullable: string;
}

type Property = PropertyDescriptor | ObjectDescriptor | ArrayDescriptor


interface ArrayDescriptor extends BaseProperty {
    type: "array";
    items: Property;
}

interface ObjectDescriptor extends BaseProperty {
    type: "complex";
    properties: Array<Property>;
}

export interface HttpResponsePayload {
    payload: ObjectDescriptor;
    responseContentType: string;
}
