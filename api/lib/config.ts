const config = {
    registryRepo: "https://github.com/lorebooks-wiki/registry",
    gh: {
        token: Deno.env.get("GITHUB_TOKEN"),
        owner_namespace: "lorebooks-wiki",
        repo: "registry"
    },
    port: Number(Deno.env.get("PORT")) || 8080,
    yamlFetcherMethod: Deno.env.get("YAML_FETCHER_METHOD") || "local"
}

export default config