# `api.lorebooks.wiki` - Community Lorebooks API

## Setup

Deno 2 is what we used to run the API server, especially hosted on Nest and friends.

1. Generate private key for generating OWL through JOSE: `deno run owl:gen-keys`.
2. Copy the output of the key generator into `OWL_PRIVATE_KEY` in `.env`.
3. Generate your own GitHub API token for GitHub API calls (if `YAML_PARSER_MODE` is set to `github-api`)
4. Run dev server: `deno run dev`
