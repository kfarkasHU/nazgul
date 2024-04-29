import { BaseHttpController, HttpHandler, HttpHandles } from "@kfarkashu/nazgul.core";

export const HttpPost = <T>(
    path: string,
    contentType = "application/json"
) => {
    return <U extends BaseHttpController>(
        target: U,
        property: keyof U
    ) => {
        if (!target.__handleCandidates) {
            target.__handleCandidates = {}
        }

        const pathParams = path
            .split('/')
            .filter(m => m.startsWith(':'))
            .map(m => m.replace(':', ''))
            .map(m => ({
                name: m,
                type: "string",
                format: ""
            }))
        ;

        const handle = (target.__handleCandidates[property.toString()] || {}) as HttpHandler<U>;

        target.__handleCandidates[property.toString()] = {
            ...handle,
            filters: (handle?.filters || []),
            path: path,
            method: "POST",
            handlerName: property,
            requestContentType: contentType,
            pathParams: pathParams,
        }
    }
}
