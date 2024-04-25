import { BaseHttpController } from "@kfarkashu/nazgul.core";

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
        target.__handleCandidates[property.toString()] = {
            ...(target.__handleCandidates[property.toString()] || {}),
            headerParams: [
                ...(target.__handleCandidates[property.toString()] || {})?.headerParams,
                {
                    name: headerName,
                    type: headerType,
                    format: headerFormat
                }
            ]
        }
    }
}
