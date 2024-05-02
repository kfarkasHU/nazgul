import { BaseHttpController, NazgulControllerPlugin } from "nazgul.core";
import { Application } from "express";

import { PluginHub } from "../plugin";
import { HttpContext } from "../http";

export class NazgulHub {

    public static addServer(
        server: Application
    ): typeof NazgulHub {
        HttpContext.setServer(server);
        return this;
    }

    public static usePlugin(
        plugin: NazgulControllerPlugin
    ): typeof NazgulHub {
        const result = plugin.initialize();
        if (result) {
            PluginHub.addPlugin(plugin);
        }
        return this;
    }

    public static runControllerPlugins<T extends BaseHttpController>(
        path: string,
        controller: { new (): T }
    ): void {
        PluginHub.runControllers(path, controller)
    }

}
