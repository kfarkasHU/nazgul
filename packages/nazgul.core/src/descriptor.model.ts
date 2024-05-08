interface BaseProperty {
    type: string;
}

export interface PropertyDescriptor extends BaseProperty {
    type: "primitive";
    propertyType: string;
    format: string;
    isNullable: boolean;
}

export type Property = PropertyDescriptor | ObjectDescriptor | ArrayDescriptor

export interface ArrayDescriptor extends BaseProperty {
    type: "array";
    items: Property;
}

interface PropertyMap {
    [key: string]: Property;
}

export interface ObjectDescriptor extends BaseProperty {
    type: "complex";
    name: string;
    properties: PropertyMap
}

