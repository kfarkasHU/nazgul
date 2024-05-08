import { writeFileSync } from "fs";
import { HttpHandles, NazgulControllerPlugin } from "nazgul.core";

export class NazgulSwadocPlugin extends NazgulControllerPlugin {

    private readonly _contexts: Array<unknown> = [];

    constructor(
        private readonly outPath: string
    ) {
        super();
    }

    public initialize(): boolean | Promise<boolean> {
        return true;
    }

    public onController<T>(
        path: string,
        factory: { new (): T },
        className: string
    ): boolean | Promise<boolean> {
        try {
            const metadataList: HttpHandles<T> = factory.prototype["__handleCandidates"];
            Object.keys(metadataList).forEach(m => {
                metadataList[m].path = `${path}${metadataList[m].path}`;
            })
            this._contexts.push(metadataList);
            writeFileSync(process.cwd() + "/" + this.outPath, JSON.stringify(this._contexts, undefined, 2))
            return true;
        } catch {
            return false;
        }

    }

}
