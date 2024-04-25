import { BaseHttpController } from "@kfarkashu/nazgul.core";

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
        target.__handleCandidates[property.toString()] = {
            ...(target.__handleCandidates[property.toString()] || {}),
            responses: {
                ...(target.__handleCandidates[property.toString()] || {})?.responses,
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
