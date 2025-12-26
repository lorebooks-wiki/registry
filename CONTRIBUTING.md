# Contributing to the registry

Thanks for your interest in using Community Lorebooks subdomain service and/or
helping to maintain [the registry data](./data/).

## Pre-requisites / Pre-flight Checks

* By contributing, you agree to abide by the [Code of Conduct](https://policies.recaptime.dev/conduct)
and [the Linux Developer Certificate of Origin (DCO)](https://developercertificate.org/).
* [Review the AUP and subdomain terms of use](https://lorebooks.wiki/legal/tos) before setting or updating one.

## Components for beginners

Each component has its own documentation here in the registry monorepo and linked here for convenience:

* [DNS records zonefile](./dns/README.md) - the heart of this repository, used by [octoDNS](https://github.com/octodns/octodns)
* [Subdomain registry data](./data/) - manually-maintained YAML files for `lorebooks.wiki` and `stellapent.wiki` subdomains
* [Community Lorebooks API](./api/README.md) - the API for the registry data, among other things. ([api docs](https://api.lorebooks.wiki/docs))

## General contributing steps

1. Create your fork to easily publish your branches and send patches easily. (optional if you're going through the Git email flow).
2. Create a branch seperate from the main branch to keep things organized. While the project maintainers
usually commit directly to the main branch, we recommend creating a branch for your changes to avoid
conflicts.
3. Start hacking around. :)
