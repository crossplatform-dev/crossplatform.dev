---
title: Overview
sidebar_position: 1
---

# Overview

<!-- ✍ Please populate the content `/data/technologies/${normalizedTechnology}.json`
first. The text starting with `{{` will be interpolated in build time with
the information in that file. -->


<!-- ✍ Please add an introductory paragraph about the project, when it was created, etc. -->

* Latest version: {{technologies.${normalizedTechnology}.releases.0.version}}
* [Website]({{technologies.${normalizedTechnology}.url}})
* [Documentation]({{technologies.${normalizedTechnology}.docs}})


## Cross-platform support


{{ table technologies.${normalizedTechnology}.platforms.{} }}

:::caution

<!-- ✍ Indicate here any gotchas (i.e. minimum suported versions) -->

:::

## Governance

<!-- ✍ Please add an introductory paragraph about the governance model of the project: part of a foundation, company driven, etc. -->

|          |      |
| -------- | ---- |
| Cost | ✍ |
| License | ✍ | <!-- If OSS, please indicate the license(s) -->
| Governance model | ✍ |
| Contribution model | ✍ | <!-- How can someone that is not part of the core team contribute? Is it open to anyone? -->
| Support | ✍ | <!-- Is there any type of paid support or do people go to SO, forums, GitHub? -->

## Release cadence

<!-- ✍ How often is there a new version? Is it predictable? Does it use an evergreen model (i.e.: it gets updated automatically) or do developers need to take care of that? Does it depend on other projects to ship? -->

{{ table technology.${normalizedTechnology}.releases.[] }}
