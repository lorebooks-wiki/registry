import { OpenAPIRoute, OpenAPIRouteSchema, Str } from "chanfana";
import { Context } from "hono";
import { z } from "zod";
import { handleYamlParser } from "../lib/yaml-utils.ts";
import config from "../lib/config.ts";

type FetcherMethod = "local" | "github-api";
const fetcherMethod: FetcherMethod = config.yamlFetcherMethod as FetcherMethod;

export class subNameLookup extends OpenAPIRoute {
  schema = {
      summary: "Look up information about an subdomain",
      description: `
For the documentation about the fields, see [the JSON schema]()`,
      request: {
        params: z.object({
          domain: Str().describe("Domain name to look up for its registry").default("lorebooks.wiki"),
          subname: Str().describe("Subdomain name").default("_root")
        })
      },
      responses: {
          200: {
              description: "Result"
          }
      }
  }
  async handle(c: Context) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { params } = data
    const yamlData = await handleYamlParser(fetcherMethod, params.domain, params.subname)
    console.log(yamlData)
    
    if (yamlData?.error instanceof Deno.errors.NotFound || yamlData?.error?.status == 404) {
      return c.json({
        ok: false,
        error: "Not found",
      }, 404)
    } else if (yamlData?.error) {
      return c.json({
        ok: false,
        error: "Something went wrong",
      })
    }
    
    return c.json({
      ok: true,
      result: yamlData?.data || {}
    })
  }
}

export class generateOWL extends OpenAPIRoute {
  override schema: OpenAPIRouteSchema = {
    
  }
}

export class parseOWL extends OpenAPIRoute {}