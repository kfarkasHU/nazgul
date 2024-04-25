import { BaseHttpController, HttpHandler } from "@kfarkashu/nazgul.core";

export const ProducesResponse = <T>(
    code: number,
    contentType = "application/json"
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
            responses: {
                ...handle?.responses,
                [code]: {
                    responseContentType: contentType,
                    payload: {
                        type: "complex",
                        properties: []
                    }
                }
            }
        }
    }
}
