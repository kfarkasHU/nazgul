import { BaseHttpController, HttpHandler } from "nazgul.core";

export const WithHeader = (
    headerName: string,
    headerType = "string",
    headerFormat = ""
) => {
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
            headerParams: [
                ...handle.headerParams,
                {
                    name: headerName,
                    type: headerType,
                    format: headerFormat
                }
            ]
        }
    }
}
