import { BaseHttpController, HttpHandles } from "nazgul.core";

import { NazgulHub } from "../hub";

export const HttpController = <T extends BaseHttpController>(
    path = ""
) => {
    return (
        factory: { new (): T }
    ) => {
        NazgulHub.runControllerPlugins(path, factory);
    }
}
