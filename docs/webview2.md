---
title: WebView2
---

# WebView2

WebView2 (WV2) is a control built by Microsoft that allows developers to render web content in their
native applications. Underneath it uses the Microsoft Edge browser (which is Chromium based). This
control replaces the old [WebBrowser control] (Internet Explorer based) and [WebView control] (based
on EdgeHTML) with a modern and secure rendering engine. It is currently available on Windows
platforms for developers of Win 32 C/C++, .NET, and under development for [UWP] and macOS.

Its first production ready release was in [October 2020][WebView2 GA Blog]. Since then, some
of the most relevant applications and companies that have adopted it are Microsoft Office, Outlook,
and [Morgan Stanley].

## Summary

| Characteristic |        |
| -------------- | :----: |
| Website | [{{technologies.webview2.url}}]({{technologies.webview2.url}}) |
| Platforms | Desktop |
| Rendering strategy | [Browser engine] |
| Code License | [{{technologies.webview2.codeLicense}}] |
| Copyright | Microsoft |
| Documentation | [{{technologies.webview2.documentation}}]({{technologies.webview2.documentation}}) |
| Community | [{{technologies.webview2.community}}]({{technologies.webview2.community}}) |
| Latest version | {{technologies.webview2.releases.0.version}} |
| Release cadence | Major versions: not scheduled <br/> Minor/patch: 6 weeks |
| Release support | 6 weeks |
| Update model | [Evergreen or fixed][WebView2_DistributionDoc] |
| Governance model | Microsoft driven |

**Platform support:**

{{ table technologies.webview2.platforms.{} }}

:::note
[UWP] and macOS support coming soon!
:::

**Language support:**

{{ table technologies.webview2.languages.{} }}

## Release cadence, version support and update model

There are 2 parts to WebView2:

1. The [WebView2 SDK], which comes in the form of a NuGet package.
1. The [WebView2 Runtime], which is essentially an Edge browser binary, optimized for WV2 use.

The SDK and Runtime get updated every 6 weeks, in alignment with Edge. WebView2 offers a pre-release
SDK with up-and-coming experimental features and a stable release SDK with only stable APIs. There
is only 1 major version for the time being, and minor versions get released every 6 weeks. The
reason is that the WV2 team guarantees a stable API with no breaking changes thus why a new major
release is not needed.

One important characteristic of WV2 is the two distribution modes it provides for developer
flexibility:

* **Evergreen**: With the Evergreen model, the WV2 control is updated automatically with the latest
  features, security patches, and bug fixes. There is no need for developer intervention or
  application re-release.
* **Fixed**: For developers wanting more control over their apps updates, WV2 offers the Fixed
  distribution mode. Here, developers are responsible for manually updating the WV2 version used by
  their applications.

:::note
Chrome has announced that starting in Chrome 94 (Q3 2021) they will switch to a 4 week release
cadence. Edge and WebView2 will follow this updated cadence and move to 4 week release cycles as
well.
:::

## Governance

WebView2 is developed by Microsoft, and built on top of the Edge browser platform. It is close
source and developers can provide feedback via this
[GitHub repository]({{technologies.webview2.community}}).

<!-- Ref links -->

[Browser engine]: ./browser-engine.md
[Morgan Stanley]: https://www.youtube.com/watch?v=8y3ZCzw3LtA
[UWP]: https://docs.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide
[WebBrowser control]: https://docs.microsoft.com/en-us/dotnet/desktop/winforms/controls/webbrowser-control-overview?view=netframeworkdesktop-4.8
[WebView Control]: https://docs.microsoft.com/en-us/windows/communitytoolkit/controls/wpf-winforms/webview
[WebView2 GA Blog]: https://blogs.windows.com/msedgedev/2020/10/19/edge-webview2-general-availability/
[WebView2 SDK]: https://www.nuget.org/packages/Microsoft.Web.WebView2
[WebView2 Runtime]: https://developer.microsoft.com/en-us/microsoft-edge/webview2/
[WebView2_DistributionDoc]: https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution?view=webview2-1.0.864.35
[{{technologies.webview2.codeLicense}}]: https://www.nuget.org/packages/Microsoft.Web.WebView2/0.9.430/License