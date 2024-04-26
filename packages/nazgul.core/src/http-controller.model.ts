import { HttpHandles } from "./http-handles";

export abstract class BaseHttpController {          // TODO: Move this to hub mb
    public __handleCandidates: HttpHandles<typeof this> = {};
}
