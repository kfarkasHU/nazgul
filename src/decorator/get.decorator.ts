import { BaseHttpController } from "../http"

export const HttpGet = (
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

        target.__handleCandidates[property.toString()] = {
            ...(target.__handleCandidates[property.toString()] || {}),
            path: path,
            method: "GET",
            handlerName: property,
            requestContentType: contentType,
            pathParams: pathParams,
        }
    }
}
