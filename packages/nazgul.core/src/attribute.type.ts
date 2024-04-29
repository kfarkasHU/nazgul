import { BaseHttpController } from "./http-controller.model";

export type INazgulFilterAttribute = <T extends BaseHttpController>(controller: T, functionName: keyof T) => void;
