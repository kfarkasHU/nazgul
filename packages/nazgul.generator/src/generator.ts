import { Property } from "@kfarkashu/nazgul.core";
import { CallSite, ReflectedTypeRef, reflect } from "typescript-rtti";

export namespace NazgulGenerator {

    export function generateMetadataFor<T>(callsite?: CallSite): Property {
        const reflection = reflect(callsite!);
        const type = reflection.typeParameters[0];
        if (!["object", "interface"].includes(type.kind)) {
            throw `E_NOTSUPPORTED_KIND`;
        }
        return getProperties(type);
    }

    function getProperties(
        ref: ReflectedTypeRef
    ): Property {
        if (ref.isClass(String)) return { type: "primitive", propertyType: "string", isNullable: ref.isNull() || ref.isUndefined(), format: "" };
        if (ref.isClass(Number)) return { type: "primitive", propertyType: "number", isNullable: ref.isNull() || ref.isUndefined(), format: "" };
        if (ref.isClass(Boolean)) return { type: "primitive", propertyType: "boolean", isNullable: ref.isNull() || ref.isUndefined(), format: "" };
        if (ref.isClass(Date)) return { type: "primitive", propertyType: "string", isNullable: ref.isNull() || ref.isUndefined(), format: "date" };

        if (ref.kind === "array") {
            const arrRef = ref.as("array");
            return {
                type: "array",
                items: getProperties(arrRef.elementType)
            }
        }

        if (ref.kind === "interface") {
            const ifRef = ref.as("interface");
            const props = ifRef
                .reflectedInterface
                .properties
                .map(m => ({ name: m.name, type: getProperties(m.type) }))
                .reduce((a, c) => ({ ...a, [c.name]: c.type }) , {})
            ;
            return {
                type: "complex",
                properties: props
            }
        }

        throw `Type is not supported!`;
    }

}
