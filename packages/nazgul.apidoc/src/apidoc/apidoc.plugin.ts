import { INazgulPlugin } from "@kfarkashu/nazgul.core";

export class NazgulApidocPlugin implements INazgulPlugin {

    public initialize(): boolean {
        return true;
    }

    public onController(tag: string, path?: string | undefined): boolean {
        return true;
    }

}
