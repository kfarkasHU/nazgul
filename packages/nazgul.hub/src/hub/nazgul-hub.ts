import { INazgulPlugin } from "@kfarkashu/nazgul.core";

import { PluginHub } from "../plugin";

export class NazgulHub {

    public static usePlugin(
        plugin: INazgulPlugin
    ): typeof NazgulHub {
        const result = plugin.initialize();
        if (result) {
            PluginHub.addPlugin(plugin);
        }
        return this;
    }

}
