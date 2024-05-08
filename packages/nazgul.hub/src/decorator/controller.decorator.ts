import { BaseHttpController } from "nazgul.core";
import { NazgulClassName } from "nazgul.generator";
import { CallSite } from "typescript-rtti";

import { NazgulHub } from "../hub";

export const HttpController = <T extends BaseHttpController>(
    path = "",
    callsite?: CallSite
) => {
    return (
        factory: { new (): T }
    ) => {
        const className = NazgulClassName.getClassName<T>(factory, callsite);
        NazgulHub.runControllerPlugins(path, factory, className);
    }
}
