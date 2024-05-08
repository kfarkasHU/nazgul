import { BaseHttpController } from "./http-controller.model";

export abstract class NazgulPlugin {

    public abstract initialize(): boolean | Promise<boolean>

}

export abstract class NazgulControllerPlugin extends NazgulPlugin {

    public abstract initialize(): boolean | Promise<boolean>;
    public abstract onController<T extends BaseHttpController>(
        controllerPath: string,
        controllerFactory: { new (): T },
        controllerClassName: string
    ): boolean | Promise<boolean>;

}
