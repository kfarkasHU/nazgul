import { INazgulPlugin } from "@kfarkashu/nazgul.core";

export class NazgulRoutingPlugin implements INazgulPlugin {

    public initialize(): boolean {
        return true;
    }

    public onController(tag: string, path?: string | undefined): boolean {
        return true;
    }

}
