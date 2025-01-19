import { OpenAPIRouteSchema } from "chanfana";
import { OpenAPIRoute } from "chanfana";

export class pingOps extends OpenAPIRoute {
  override schema: OpenAPIRouteSchema = {
    summary: "Cookery",
    request: {},
    responses: {
      "200" : {
        description: "We're up"
      }
    }
  }
}