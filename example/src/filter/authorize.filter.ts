import { FilterAttributeFactory } from "nazgul.hub";

export const Authorize = (token: string) => FilterAttributeFactory.create(
    (req, res, _next) => {
        const headers = req.query;
        const header = headers["token"];
        if (!header) {
            res.status(400).send({ errors: ["E_NO_TOKEN"] });
            return false;
        }
        if (Array.isArray(header)) {
            res.status(400).send({ errors: ["E_TOKEN_TYPE_ARRAY"] });
            return false;
        }
        if (typeof header !== "string") {
            res.status(400).send({ errors: ["E_TOKEN_TYPE_NOT_STRING"] });
            return false;
        }
        if (header !== token) {
            res.status(400).send({ errors: ["E_WRONG_TOKEN"] });
            return false;
        }
        return true;
    }
)
