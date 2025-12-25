# `registry.lorebooks.wiki`

[![octoDNS Deployments](https://github.com/lorebooks-wiki/registry/actions/workflows/dns.yml/badge.svg)](https://github.com/lorebooks-wiki/registry/actions/workflows/dns.yml)

This repo holds our YAML-based DNS zonefiles for octoDNS, as well as public registry data, the
Community Lorebooks API and an issue tracker for subdomain requests (reservations, DNS records,
public abuse reports etc).

## What's available for use

Here are the domains we currently manage here for our subdomain service:

* `lorebooks.wiki` - @lorebooks-wiki's flagship domain for our subdomain service, primarily
used for digital gardens and wiki/documentation sites.
* `stellapent.wiki` - Maintained by @ajhalili2006, used for all things related to Stellapent Cier
universe in Gildedguy Stories series, although anyone in the Hyun's Dojo community can use it similarly
to `lorebooks.wiki`.

If you do use (not only) Cloudflare as nameservers and/or want to team up with
us to help maintain the service (maybe have some spare domains to donate to us
or jointly maintain with us), email `contact@lorebooks.wiki` for a chat or
[apply to be a project maintainer here].

## Setting up devenv

You need Python 3.13 with `pipenv` installed mainly for managing DNS records, alongside the following tools:

* [`yq-go`](https://github.com/mikefarah/yq) for some CI and maintainer scripts
* [Doppler CLI](https://docs.doppler.com/docs/cli) with access to Community Lorebooks project in Recap Time Squad's workspace.

If you are cooking up with our API, [see its README for details](./api/README.md).

[See the contributing guidelines](./CONTRIBUTING.md) for a more detailed documentation on setting up
your development environment.

## License

MPL-2.0, with the [Community Lorebooks API codebase](./api) under AGPL-3.0

[apply to be a project maintainer here]: https://lorebooks.wiki/docs/maintainers#apply
