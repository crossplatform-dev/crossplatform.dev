---
title: Tauri
---

# Tauri

Tauri is a framework to build smaller, faster and more secure desktop apps using web technologies.

Tauri applications use OS provided WebView to render the User Interface, so Developers can leverage the abundance of tools and frameworks such as React, Vue or Vite. The applications backend is written in Rust and allows Developers to manage windows, maintaing app state and mediate Operating System calls in a safe environment.
Security is very important to Tauri, it undergoes regular security audits and [implements many security features][Security Features] not found in other _[Browser engine]_ frameworks.

## Summary

| Characteristic     |                                                                                          |
| :----------------- | :--------------------------------------------------------------------------------------: |
| Website            | [{{technologies.tauri.url}}]({{technologies.tauri.url}})                                 |
| Platforms          | Desktop                                                                                  |
| Rendering strategy | [Browser engine]                                                                         |
| Code License       | [{{technologies.xamarin.codeLicense.name}}]({{technologies.xamarin.codeLicense.url}})    |
| Copyright          | Tauri Programme within The Commons Conservancy                                           |
| Documentation      | [{{technologies.tauri.documentation}}]({{technologies.tauri.documentation}})             |
| Community          | [{{technologies.tauri.community}}]({{technologies.tauri.community}})                     |
| Latest version     | {{technologies.tauri.releases.0.version}}                                                |
| Release cadence    | N/A                                                                                      |
| Release support    | Latest version                                                                           |
| Update model       | Developer driven                                                                         |
| Governance model   | [Open Governance]                                                                        |

**Platform support:**

{{ table technologies.tauri.platforms.{} }}

:::note
While mobile apps aren't currently possible, support for them is [in-progress][Roadmap].
:::

**Language support:**

{{ table technologies.tauri.languages.{} }}

:::note
While Rust and JavaScript will remain the primary languages, [bindings for other languages are planned][Roadmap]. Such as Go, Nim, Python, C++ or even JavaScript through [Deno].
:::

[Browser engine]: ./browser-engine.md
[Security Features]: https://tauri.studio/docs/about/security
[Roadmap]: https://tauri.studio/#roadmap
[Open Governance]: https://tauri.studio/docs/about/governance
[Deno]: https://deno.land