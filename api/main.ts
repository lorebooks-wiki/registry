import { Context, Hono } from "hono"
import { fromHono } from 'chanfana';
import config from "./lib/config.ts";
import { pingOps } from "./routes/ping.ts";
import { subNameLookup } from "./routes/regtstry.ts";
const app = new Hono()
export const openapi = fromHono(app, {
  docs_url: "/docs",
  schema: {
    info: {
      title: "Community Lorebooks API",
      version: "0.1.0",
      contact: {
        name: "Recap Time Squad",
        url: "https://github.com/lorebooks-wiki/meta/issues",
        email: "support@recaptime.dev"
      },
      summary: "Find information behind a `lorebooks.wiki` subdomain and more.",
      description: `The Community Lorebooks API, including the subdomain registry, TriageOps tooling and some internal APIs that [Recap Time Squad](https://recaptime.dev) and friends use. Backend code maintained by [Andrei Jiroh](https://github.com/ajhalili2006) as part of the [subdomains registry repo](${config.registryRepo}/tree/main/api).`,
      license: {
        name: "Mozilla Public License v2",
        identifier: "MPL-2.0"
      }
    },
  }
})

import yamlSchema from "../data/registry-schema.json" with { type: "json" }
app.get("/", (context: Context) => {
  return context.redirect(config.registryRepo)
})
app.get("/yaml-schema", (context: Context) => {
  return context.json(yamlSchema)
})

openapi.get("/ping", pingOps)
openapi.get("/registry/:domain/:subname", subNameLookup)

Deno.serve({
  port: config.port
}, app.fetch)