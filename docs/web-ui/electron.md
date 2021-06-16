---
title: Electron
---

# Electron

Electron is a popular framework to build cross-platform desktop applications using web
technologies. Some of the most popular applications using it are [Visual Studio Code], [Slack],
[Discord], [InVision], [Figma], or [WhatsApp].

While it was originally created by GitHub in 2013, it is an [OpenJS Foundation][electron-foundation]
project since 2019. It has an [Open Governance] where engineers from different companies and
products (like VS Code, Slack, Teams, RingCentral) and volunteers collaborate in different [Working
Groups].

Electron applications use Chromium as the shell to render the User Interface. Developers
use HTML, CSS and JavaScript to build their apps, which means they can use the libraries and tools
available to the web community such as React, webpack, Babel, etc. One of the main differences with
other technologies under the _[Web UI]_ category, is that JavaScript is used to access the
Operating System features as well. This is because Electron applications come with [Node.js]
support. At a high-level, [Electron adds the Node.js layer to Chromium's JavaScript engine
V8][electron-node]. This means that developers can leverate all its ecosystem and also write C/C++
code to access features not available out of the box or via other modules.

## Release cadence, version support and update model

Electron has three important branches of development: nightly, beta, and stable. The nightly branch
is synced to Chromium's development branch and merged daily or weekly. Nightly Electron is
equivalent to Chrome Canary. The beta and **stable branches of Electron are fixed to their
major-versions of Chromium and release every 12 weeks**. New Electron stable versions typically
release the same day as the equivalent stable Chrome release. Additionally, the team releases weekly
updates (minor and/or patch) for the latest 3 stable versions, bringing the total lifetime of a
stable version to 36 weeks (or about 9 months).

<!-- Insert diagram here -->

:::caution
[Chrome has announced][chrome release cycle] that starting in Chrome 94 (Q3 2021) they will switch
to a 4 week release cadence. Electron will continue releasing every other one and supporting the
latest 3 major versions. This means that the length of support will change from ~9 months to ~6
months.
:::

Electron applications are self-contained: Chromiun abd Node.js are bundled in the application. This
has the advantage for the users to not have to install any pre-requisites, and for developers to
know exactly what dependencies are being run. On the other side, it also means that updating the
Electron version is a developer responsibility (developer driven).

## Governance

Electron is an OpenJS Foundation project with an established Open Governance model. It has several
autonomous [Working Groups] (WG) for different areas (API, releases, security). In the words of the
project:

> A working group is a group of maintainers that is formed to take responsibility for certain
aspects of the Electron project. Normally these groups will meet regularly but in some cases will
only meet as required to fulfill their responsibilities.

While the requirements might change from one WG to another, anyone can eventually become a
maintainer, join, and get their feature added. Electron is created to serve its community, and not
the needs of a particular company or product.

## Summary

| Characteristic |        |
| :------------- | :----: |
| Website | [{{technologies.electron.url}}]({{technologies.electron.url}}) |
| Platforms | Desktop |
| Type | [Web UI] |
| Software type | OSS |
| License | [MIT] |
| Copyright | [OpenJS Foundation][electron-foundation] |
| Documentation | [{{technologies.electron.documentation}}]({{technologies.electron.documentation}}) |
| Community | [{{technologies.electron.community}}]({{technologies.electron.community}}) |
| Latest version | {{technologies.electron.releases.0.version}} |
| Release cadence | Major versions: [12 weeks][release timeline] <br/> Minor/patch: ~weekly |
| Release support | [9 months][release timeline] |
| Update model | Developer driven |
| Governance model | [Open Governance] |

**Platform support:**

{{ table technologies.electron.platforms.{} }}

:::note
While a mobile Electron could be possible, the [Apple Store policy 2.5.6] will prevent it from being
distributed on iOS devices.
:::

**Language support:**

{{ table technologies.electron.languages.{} }}

:::note
While this list is for the "out of the box" languages, there are ways to use others. An example
would be Rust, which can be run via [Neon].
:::

<!-- Ref links -->

[Apple Store policy 2.5.6]: https://developer.apple.com/app-store/review/guidelines/
[chrome release cycle]: https://blog.chromium.org/2021/03/speeding-up-release-cycle.html
[Discord]: https://discord.com/
[electron-foundation]: https://openjsf.org/blog/2019/12/11/electron-joins-the-openjs-foundation/
[electron-node]: https://www.electronjs.org/blog/electron-internals-using-node-as-a-library
[Figma]: https://www.figma.com/
[InVision]: https://www.invisionapp.com/
[MIT]: https://github.com/electron/electron/blob/main/LICENSE
[Neon]: https://github.com/neon-bindings/neon
[Node.js]: https://nodejs.org
[Open Governance]: https://github.com/electron/governance
[release timeline]: https://www.electronjs.org/docs/tutorial/electron-timelines
[Slack]: https://slack.com/
[Visual Studio Code]: https://code.visualstudio.com/
[Web UI]: ./web-ui.md
[WhatsApp]: https://www.whatsapp.com/
[Working Groups]: https://github.com/electron/governance#working-groups
