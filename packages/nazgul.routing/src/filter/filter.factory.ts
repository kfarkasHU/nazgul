import { BaseHttpController, HttpHandler, INazgulFilterAttribute } from "nazgul.core";
import { Request, Response, NextFunction } from "express";

export class FilterAttributeFactory {
    public static create(
        handler: (req: Request, res: Response, next: NextFunction) => Promise<boolean> | boolean
    ): INazgulFilterAttribute {
        return <T extends BaseHttpController>(
            target: T,
            property: keyof T
        ) => {
            if (!target.__handleCandidates) {
                target.__handleCandidates = {}
            }
            const handle = (target.__handleCandidates[property.toString()] || {}) as HttpHandler<T>;

            target.__handleCandidates[property.toString()] = {
                ...handle,
                filters: (handle.filters || []).concat(handler)
            }
        }
    }
}
