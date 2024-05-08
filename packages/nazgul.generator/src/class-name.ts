import { CallSite, reflect } from "typescript-rtti";

export namespace NazgulClassName {

    export function getClassName<T>(
        factory: { new (): T },
        callsite?: CallSite
    ): string {
        if (!callsite) return "";
        const reflection = reflect(factory);
        return reflection.class.name
    }

}
