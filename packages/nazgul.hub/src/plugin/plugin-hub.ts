import { BaseHttpController, NazgulControllerPlugin } from "nazgul.core";

export class PluginHub {

    private static _plugins: Array<NazgulControllerPlugin> = [];

    public static addPlugin(
        plugin: NazgulControllerPlugin
    ): void {
        this._plugins.push(plugin);
    }

    public static runControllers<T extends BaseHttpController>(
        path: string,
        factory: { new(): T}
    ): void {
        this._plugins.forEach(async m => {
            const result = await m.onController(path, factory);
        });
    }

}
