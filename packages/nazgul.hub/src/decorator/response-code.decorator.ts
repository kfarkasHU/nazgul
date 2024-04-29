import { BaseHttpController, HttpHandler } from "nazgul.core";
import { NazgulGenerator } from "nazgul.generator";
import { CallSite } from "typescript-rtti";

export const ProducesResponse = <T>(
    code: number,
    contentType = "application/json",
    callsite?: CallSite
) => {
    return <U extends BaseHttpController>(
        target: U,
        property: keyof U
    ) => {
        const metadata = NazgulGenerator.generateMetadataFor<T>(callsite)
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
                        properties: {}
                    }
                }
            }
        }
    }
}
