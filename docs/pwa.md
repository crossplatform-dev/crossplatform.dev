---
title: PWA
---

# PWA

:::tip
The content of this page referes to Chromium (the engine with the most features) unless stated
otherwise. This engine is used by many browsers like Chrome and Edge, and other technologies such as
[Electron] and [WebView2].
:::

## Summary

| Characteristic     |                                                                               |
| ------------------ | :---------------------------------------------------------------------------: |
| Website            |             [{{technologies.pwa.url}}]({{technologies.pwa.url}})              |
| Platforms          |                                Desktop, mobile                                |
| Rendering strategy |                               [Browser engine]                                |
| Code License       | [{{technologies.pwa.codeLicense.name}}]({{technologies.pwa.codeLicense.url}}) |
| Copyright          |                               It's complicated                                |
| Documentation      |   [{{technologies.pwa.documentation}}]({{technologies.pwa.documentation}})    |
| Community          |       [{{technologies.pwa.community}}]({{technologies.pwa.community}})        |
| Latest version     |                    {{technologies.pwa.releases.0.version}}                    |
| Release cadence    |             Major versions: 4 weeks <br/> Minor/patch: As needed              |
| Release support    |                                   4-8 weeks                                   |
| Update model       |                             Automatically updated                             |
| Governance model   |                               It's complicated                                |

**Platform support:**

{{ table technologies.pwa.platforms.{} }}

:::warning
Even though browsers based on Chromium (like Chrome and Edge) are available on iOS, the reality is
that they use a different engine. The Apple Store policy only permits browser vendors to use the
Safari WebView.
Unfortunately, this browser engine only has a subset of the features available in Chromium and
updates at a much lower rate.

There is more information about this in "[iOS Engine Choice In Depth]" by [Alex Russell].
:::

**Language support:**

{{ table technologies.pwa.languages.{} }}

## Release cadence, version support and update model

Google releases a major version every 4 weeks. During this period it will receive minor updates as
needed (bug fixes and security).
Additionally there is an Extended Stable option that releases every 8 weeks. This version receives
also security updates (every 2 weeks) but not all the ones that the 4 week version has.
You can read more in [this blog post][speeding-up-release-cycle].

[Firefox release cycle] is also 4 weeks for major versions and Safari does not have a public release
cycle policy.

Chromium based browsers and Firefox update automatically without user intervention while Safari
requires the user to update the Operating System on iOS or accept the update process on macOS.

## Governance

TBD
<!-- ✍ Please add an introductory paragraph about the governance model of the project: part of a
foundation, company driven, etc. -->

<!-- Ref links -->

[Alex Russell]: https://twitter.com/slightlylate
[browser engine]: ./browser-engine.md
[electron]: ./electron.md
[Firefox release cycle]: https://wiki.mozilla.org/Release_Management/Release_Process
[iOS Engine Choice In Depth]: https://infrequently.org/2021/08/webkit-ios-deep-dive/
[speeding-up-release-cycle]: https://blog.chromium.org/2021/03/speeding-up-release-cycle.html
[webview2]: ./webview2.md