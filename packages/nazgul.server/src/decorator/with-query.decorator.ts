import { BaseHttpController } from "../http"

export const WithQuery = <T>() => {
    return <U extends BaseHttpController>(
        target: U,
        property: keyof U
    ) => {
        if (!target.__handleCandidates) {
            target.__handleCandidates = {}
        }
        target.__handleCandidates[property.toString()] = {
            ...(target.__handleCandidates[property.toString()] || {}),
            queryParams: [
                ...(target.__handleCandidates[property.toString()] || {})?.headerParams,
                {
                    name: "queryName",
                    type: "queryType",
                    format: "queryFormat"
                }
            ]
        }
    }
}
