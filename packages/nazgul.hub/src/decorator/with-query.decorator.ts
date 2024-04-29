import { BaseHttpController, HttpHandler } from "nazgul.core";

export const WithQuery = <T>() => {
    return <U extends BaseHttpController>(
        target: U,
        property: keyof U
    ) => {
        if (!target.__handleCandidates) {
            target.__handleCandidates = {}
        }
        const handle = (target.__handleCandidates[property.toString()] || {}) as HttpHandler<U>;
        target.__handleCandidates[property.toString()] = {
            ...handle,
            queryParams: [
                ...handle.headerParams,
                {
                    name: "queryName",
                    type: "queryType",
                    format: "queryFormat"
                }
            ]
        }
    }
}
