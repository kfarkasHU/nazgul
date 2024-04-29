# nazgul

Nazgul is a routing library for NodeJS express applications.
The full featureset:
* controller > method level routing system
* filter attributes
* runtime SWAGGER hosting
* SWAGGER generation

## Get Started

To install nazgul run the following script:
```sh

yarn add -D @nazgul/hub @nazgul/core

```

### To use the routing system:

1. Create a controller class.
   1. Add the respective `@HttpController` decorator to it
   2. Add the proper http decorator to the endpoint implementation

```ts
import { HttpController, HttpGet }  from "@nazgul/hub";

@HttpController("/api/v1")
export class MyController {

    @HttpGet("/my-method")
    public async myMethod(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // add your custom implementation here
    }

}

```

2. Configure the main entry point to use Nazgul
    1. Create an express application
    2. Initialize NazgulHub to use the server
    3. Import the controller
    4. Start your server

```ts
import express from "express";

const server = express();

NazgulHub.addServer(server);

import { MyController } from "./my.controller";

server.listen(9000, () => {
    console.log("http://localhost:9000");
});

```

### To use the filter attributes

At first, create your first attribute by using `FilterAttributeFactory` from `@nazgul/routing`

To install `@nazgul/routing`:
```sh

yarn add -D @nazgul/routing

```

To create a filter attribute:

```ts
import { FilterAttributeFactory } from "@nazgul/routing";

export const WithTokenOnly = (token: string) => FilterAttributeFactory.create(
    (req, res, next) => {
        const requestToken = req.query.token;
        if (token !== requestToken) {
            res.status(401).send();
            return false;
        }
        return true;
    }
)

```
The filter attributes can return `boolean` or `Promise<boolean>`, so DB reads, 3rd party API calls are possible.
For application-level behavoiur for example request-logging or error handling there is no such way in Nazgul by design. For such features it is strongly suggested to use express' native middleware functionality.


Then add your newly create filter to one of your controller methods.

```ts
import { HttpController, HttpGet }  from "@nazgul/hub";

@HttpController("/api/v1")
export class MyController {

    @HttpGet("/my-method")
    @WithTokenOnly("my-secret-token")
    public async myMethod(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // add your custom implementation here
    }

}

```