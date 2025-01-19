import { OpenAPIRoute, OpenAPIRouteSchema } from "chanfana";
import { Context } from "hono";
import { z } from "zod";

export class subNameLookup extends OpenAPIRoute {
  schema = {
      summary: "Look up",
      request: {
        params: z.object({
          domain: z.string().describe("TBD")
        })
      },
      // parameters: [
      //   {
      //     name: "domain",
      //     in: "path",
      //     required: true,
      //     examples: [
      //       { 
      //         summary: "Community Lorebooks main domain",
      //         value: "lorebooks.wiki"
      //       },
      //       { 
      //         summary: "Stellapent Cier Community Wiki",
      //         value: "stellapent.wiki",
      //         example: "root"
      //       }
      //     ]
      //   },
      //   {
      //     name: "subname",
      //     in: "path"
      //   }
      // ],
      responses: {
          200: {
              description: "Result"
          }
      }
  }

  override async handle(c: Context) {
    const data = await this.getValidatedData<typeof this.schema>();
    console.log(data)
    return c.json({ok: true})
  }
}