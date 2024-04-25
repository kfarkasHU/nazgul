interface BaseProperty {
    type: string;
}

export interface PropertyDescriptor extends BaseProperty {
    type: "primitive";
    name: string;
    format: string;
    isNullable: string;
}

export type Property = PropertyDescriptor | ObjectDescriptor | ArrayDescriptor


export interface ArrayDescriptor extends BaseProperty {
    type: "array";
    items: Property;
}

export interface ObjectDescriptor extends BaseProperty {
    type: "complex";
    properties: Array<Property>;
}

