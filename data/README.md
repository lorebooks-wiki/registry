# Community Lorebooks Subdomain Registry Data

## YAML Schema

We're working on a documentation for the schema at <https://lorebooks.wiki/docs/reference/subdomain-registry#data-yaml-schema>.

## Using OWL for registrant contact details privacy

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
