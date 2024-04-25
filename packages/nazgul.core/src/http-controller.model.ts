import { HttpHandles } from "./http-handles";

export abstract class BaseHttpController {
    public __handleCandidates: HttpHandles<typeof this> = {};
}
