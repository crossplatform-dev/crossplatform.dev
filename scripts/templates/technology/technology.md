---
title: ${technology}
---

# ${technology}

<!-- ✍ Please populate the content `/data/technologies/${normalizedTechnology}.json`
first. The text starting with `{{` will be interpolated in build time with
the information in that file. -->

<!-- ✍ Please write about the technology, when it was created, what type of technology is it,
some of the key characteristics for developers, etc. -->

## Release cadence, version support and update model

<!-- ✍ How often is there a new version? Is it predictable? Does it use an evergreen model (i.e.:
it gets updated automatically) or do developers need to take care of that? Does it depend on other
projects to ship? -->

## Governance

<!-- ✍ Please add an introductory paragraph about the governance model of the project: part of a
foundation, company driven, etc. -->

## Summary

| Characteristic |        |
| -------------- | :----: |
| Website | [{{technologies.${normalizedTechnology}.url}}]({{technologies.${normalizedTechnology}.url}}) |
| Platforms | <!-- ✍ Desktop, mobile --> |
| Type | [${category}] |
| Software type | <!-- ✍ OSS, close source --> |
| License | <!-- ✍ If it is OSS, what's the license? Otherwise, how much $$$ and link to page --> |
| Copyright | <!-- ✍ Who owns the ©? A company? Foundation? --> |
| Documentation | [{{technologies.${normalizedTechnology}.documentation}}]({{technologies.${normalizedTechnology}.documentation}}) |
| Community | [{{technologies.${normalizedTechnology}.community}}]({{technologies.${normalizedTechnology}.community}}) |
| Latest version | {{technologies.${normalizedTechnology}.releases.0.version}} |
| Release cadence | Major versions: <!-- ✍ XX weeks/months --> <br/> Minor/patch: <!-- ✍ XX weeks/months --> |
| Release support | <!-- ✍ XX weeks/months --> |
| Update model | <!-- ✍ Does the developer need to update their framework/runtime or is it automatic? --> |
| Governance model | <!-- ✍ Does a company decide everything or is it an open governance model --> |

**Platform support:**

{{ table technologies.${normalizedTechnology}.platforms.{} }}

:::note
<!-- ✍ write down any additional notes about platforms here or delete this part -->
:::

**Language support:**

{{ table technologies.${normalizedTechnology}.languages.{} }}

:::note
<!-- ✍ write down any additional notes about languages here or delete this part -->
:::

<!-- Ref links -->

[${category}]: ./${normalizedCategory}.md
