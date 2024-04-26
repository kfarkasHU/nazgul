import { INazgulPlugin } from "@kfarkashu/nazgul.core";

export class PluginHub {

    private static _plugins: Array<INazgulPlugin> = [];

    public static addPlugin(
        plugin: INazgulPlugin
    ): void {
        this._plugins.push(plugin);
    }

}
