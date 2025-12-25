# YAML-based DNS zonefiles

These YAML files are used and processed by [octoDNS](https://github.com/octodns/octodns)
through the [Cloudflare provider](https://github.com/octodns/octodns-cloudflare). To make things
organized, we seperate DNS configs first by project/org basis before merged back during production
deployments using [`script/merge-zonefiles`](../script/merge-zonefiles).

## Supported DNS record types

[From the README](https://github.com/octodns/octodns-cloudflare/blob/main/README.md):

> CloudflareProvider supports A, AAAA, ALIAS, CAA, CNAME, DS, LOC, MX, NAPTR, NS, PTR, SPF, SRV, SSHFP, TXT, and URLFWD. There are restrictions on CAA tag support.

## Managing DNS records for contributors

> [!IMPORTANT]
> Do not edit any `<domain>.yaml` files here! They are generated via the [`merge-zonefiles`](../script/merge-zonefiles)
> shell script, thus losing any changes once the CI is running. Instead, go through the partials
> as described below.

1. [Check if your subdomain is reserved](./partials/lorebooks.wiki/reserved.yml). If it is, [request to claim it] in the issue tracker first.
2. At the seperate branch or your personal fork, create a YAML file at `dns/partials/lorebooks.wiki` directorywith format `your-name-or-org-here.yml`, replacing `your-name-or-org-here.yml` with either your GitHub username or your team/organization's GitHub organization slug.
3. [Follow the YAML template](./partials/template.yml) in writing your YAML file for your project or organization.

## Managing DNS records for maintainers

The Cloudflare API key is stored through Doppler on the meta project which in turns imported into Community
Lorebooks' production environment secrets, so the Doppler CLI is needed if you need to use `octodns-*`
commands manually. To help simplify how you type, we configure scripts in our Pipfile with the `dns-` prefix
[alongside the maintainer and CI scripts](../script).
