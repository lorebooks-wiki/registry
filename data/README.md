# Community Lorebooks Subdomain Registry Data

> [!WARNING]
>
> The YAML schema and registry metadata stored in this directory are not yet finalized.
> Please do not rely on them for anything yet while we working on them behind the scenes,
> alongside the [Registry API](../api).

## YAML Schema

We're working on a web-based documentation for the schema at <https://lorebooks.wiki/docs/reference/subdomain-registry#data-yaml-schema>.
In the meanwhile, you can poke around the JSON schema [here](./registry-schema.json).

## Using OWL for registrant contact details privacy

> [!WARNING]
>
> Since the `is-a.dev` no longer use OWL strings (see this [commit][owl-no-longer-used] for context),
> we may decide to deprecate them and require publishing contact details in the repository alongside
> looking for ways towards privacy-preserving alternatives.

We currently don't have a user-friendly way of generating JOSE-compliant OWL strings yet
like `is-a.dev` project did, but our API support OWL string generation for you.

Here's a simple `curl` command snippet based off the API docs:

```bash
# Email address is required to generate a OWL string, but
# feel free to add anything else too. Note that you still
# need to add your GitHub username to the main
# registry data for transparency.
curl -X POST -H "Content-Type: application/json" \
    -d "{\"email\":\"your-mom@domain.tld\"}" \
    https://api.lorebooks.wiki/owl/generate
```

Although we do not store the OWL string (yet) on Deno KV for obvious reasons and instead kept
at this directory through the YAML files inside, you still need to call the API
to decrypt them since only we hold the backing private keys to encrypt and sign JWTs.

```bash
# Currently only those on @lorebooks-wiki/api-admins GitHub
# team can decrypt them to minimize abuse.
curl -X POST -d "owl=[...]" \
    -H "Authentication: Bearer ghp_..." \
    https://api.lorebooks.wiki/owl/validate
```

[owl-no-longer-used]: https://github.com/is-a-dev/register/commit/b68ba10e9556a70f81e97a934ef94666a60b44ab
