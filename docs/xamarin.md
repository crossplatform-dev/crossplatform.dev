---
title: Xamarin
---

# Xamarin

[Xamarin] is an open-source platform maintained by Microsoft [since 2016] to build applications
for mobile and desktop using [C#]. It is used by companies such as Alaskan Airlines, Coca-Cola and
Honeywell. You can learn about other companies in its case studies page.

Xamarin is actually a brand with several products underneath. At a high level, it provides an
environment where C# code can be executed and interact with the platform. Depending on how much
abstraction the developer wants (from just running C# for business to having a common UI), will
determine the combination of products to use:

- **Xamarin.([iOS]|[Android]|[Mac])**: These projects are the tools (runtimes, compilers, etc.) that
  allow you to run C# code on these platforms and access native APIs.
- **[Xamarin.Essentials]**: It is an abstraction layer to access different common native features
  that are not UI related such as the file system, accelerometer, etc.
- **[Xamarin.Forms]**: It is another abstraction layer of the underlying platforms UI components and
  thus acting effectively as a crossplatform UI framework.

:::note
Unless stated otherwise, the information in the following sections is specific to **Xamarin.Forms**,
which is the part that makes it part of [Platform controls].
:::

<!-- Diagram of abstraction layers -->

The implementation details for the iOS and Android are different and can be checked in the
[Internals] section.

:::tip Xamarin and .NET MAUI
Microsoft is working on [.NET MAUI]:

> .NET MAUI is open-source and is the evolution of Xamarin.Forms, extended from mobile to desktop
> scenarios, with UI controls rebuilt from the ground up for performance and extensibility. If
> you've previously used Xamarin.Forms to build cross-platform user interfaces, you'll notice many
> similarities with .NET MAUI.

While Xamarin products still receive bug fixes and security updates, it is .NET MAUI the product
that is actively being developed.
:::

## Summary

| Characteristic     |                                                                                       |
| ------------------ | :-----------------------------------------------------------------------------------: |
| Website            |             [{{technologies.xamarin.url}}]({{technologies.xamarin.url}})              |
| Platforms          |                                    Mobile, Desktop                                    |
| Rendering strategy |                                  [Platform controls]                                  |
| Code License       | [{{technologies.xamarin.codeLicense.name}}]({{technologies.xamarin.codeLicense.url}}) |
| Copyright          |                                       Microsoft                                       |
| Documentation      |   [{{technologies.xamarin.documentation}}]({{technologies.xamarin.documentation}})    |
| Community          |       [{{technologies.xamarin.community}}]({{technologies.xamarin.community}})        |
| Latest version     |                      {{technologies.xamarin.releases.0.version}}                      |
| Release cadence    |                      Major versions: N/A <br/> Minor/patch: N/A                       |
| Release support    |                                    Latest version                                     |
| Update model       |                                   Developer driven                                    |
| Governance model   |                       Microsoft is the ultimate decission maker                       |

**Platform support:**

{{ table technologies.xamarin.platforms.{} }}

**Language support:**

{{ table technologies.xamarin.languages.{} }}

## Release cadence, version support and update model

As seen earlier, Xamarin has several products, each one with its own release cadence.
For example, [Xamarin.iOS 14] (and its minor versions) is intended for Apple devices running iOS 14
so the releases are somehow related to when Apple releases a new version of the Operating System.
The same happens with [Xamarin.Android].

Because Xamarin.Forms is a UI framework that runs on top of the above and its release cycle does not
depend on any platform schedule. Xamarin.Forms 5 was released in January 2021. Up until that moment
there were minor releases every couple months, with service releases (bug fixes version) as needed.
While v5 has received several service releases, there has not been any minor update. As mentioned
earlier, Microsoft is working on .NET MAUI which is the evolution of Xamarin.Forms and most efforts
seem to be dedicated to it.

## Governance

While Xamarin is OSS
([{{technologies.xamarin.codeLicense.name}}]({{technologies.xamarin.codeLicense.url}}) licensed),
the ultimate decission maker is Microsoft.

## Internals

Even though this page is more about Xamarin.Forms, it is important to understand the underlying
technology that powers it. There are some signficant implementation details between iOS and Android
that are worth calling knowing.

### Xamarin.Android

Android Runtime (ART) is an application runtime environment used by Android. **ART compiles entire
applications into native machine code upon their installation.** This technique is called
[Ahead-of-Time (AOT)] compilation. The pros of this is that applications tend to be faster. The
downside is that they take more space in the device and the installation time is longer because
they need to be compiled.

**Xamarin.Android applications compile from C# into Intermediate Language (IL) which is then
[Just-in-Time (JIT)] compiled to a native assembly when the application launches.** Xamarin.Android
applications run within the Mono execution environment, side by side with the Android Runtime (ART).
Xamarin provides .NET bindings to the Android.\* and Java.\* namespaces. The Mono execution
environment calls into these namespaces via Managed Callable Wrappers (MCW) and provides Android
Callable Wrappers (ACW) to the ART, allowing both environments to invoke code in each other.

![Diagram of Mono and ART above the kernel and below .NET/Java + bidings](https://docs.microsoft.com/en-us/xamarin/android/internals/architecture-images/architecture1.png)

:::tip Managed or Native code?
When using Xamarin.Android, your code is [managed code].
:::

For more information you can visit the official [Xamarin.Android Architecture] page.

### Xamarin.iOS

Xamarin.iOS applications are fully [Ahead-of-Time (AOT)] compiled from C# into native ARM assembly
code. Xamarin uses Selectors to expose Objective-C to managed C# and Registrars to expose managed C#
code to Objective-C. Selectors and Registrars collectively are called "bindings" and allow
Objective-C and C# to communicate.

![Diagram showing a basic overview of the Ahead of Time (AOT) compilation architecture](https://docs.microsoft.com/en-us/xamarin/ios/internals/architecture-images/ios-arch.png)

:::tip Managed or Native code?
When using Xamarin.iOS, your C# code is native code.
:::

While native has a series of improvements over JIT like reduction in the startup time and some other
performance optimizations, it also has some [limitations].

For more information you can visit the official [Xamarin.iOS Architecture] page.

### Xamarin.Forms

As mentioned earlier, Xamarin.Forms is an UI framework that requires a .NET runtime (like the one
used in Xamarin.Android and Xamarin.iOS).

At runtime, Xamarin.Forms utilizes platform renderers to convert the cross-platform UI elements into
native controls on Xamarin.Android, Xamarin.iOS and UWP. This allows developers to get the native
look, feel and performance while realizing the benefits of code sharing across platforms.

Xamarin.Forms applications typically consist of a shared .NET Standard library and individual
platform projects. The shared library contains the XAML or C# views and any business logic such as
services, models or other code. The platform projects contain any platform-specific logic or
packages the application requires.

For more information you can visit the official [Xamarin.Forms internals].

<!-- Ref links -->

[.net maui]: https://docs.microsoft.com/en-us/dotnet/maui/what-is-maui
[ahead-of-time (aot)]: https://en.wikipedia.org/wiki/Ahead-of-time_compilation
[android]: https://docs.microsoft.com/en-us/xamarin/android/
[c#]: https://docs.microsoft.com/en-us/dotnet/csharp/
[case studies]: https://devblogs.microsoft.com/xamarin/category/case-studies/
[internals]: #internals
[ios]: https://docs.microsoft.com/en-us/xamarin/ios/
[just-in-time (jit)]: https://en.wikipedia.org/wiki/Just-in-time_compilation
[limitations]: https://docs.microsoft.com/en-us/xamarin/ios/internals/limitations
[mac]: https://docs.microsoft.com/en-us/xamarin/mac/
[managed code]: https://docs.microsoft.com/en-us/archive/blogs/brada/what-is-managed-code
[objective-c runtime]: https://developer.apple.com/library/mac/documentation/Cocoa/Reference/ObjCRuntimeRef/
[platform controls]: ./platform-controls.md
[since 2016]: https://blogs.microsoft.com/blog/2016/02/24/microsoft-to-acquire-xamarin-and-empower-more-developers-to-build-apps-on-any-device/
[xamarin]: https://docs.microsoft.com/en-us/xamarin
[xamarin.ios 14]: https://docs.microsoft.com/en-us/xamarin/ios/release-notes/14/14.0
[xamarin.android]: https://docs.microsoft.com/en-us/xamarin/android/release-notes/11/11.0
[xamarin.android architecture]: https://docs.microsoft.com/en-us/xamarin/android/internals/architecture
[xamarin.ios architecture]: https://docs.microsoft.com/en-us/xamarin/ios/internals/architecture
[xamarin.forms]: https://docs.microsoft.com/en-us/xamarin/xamarin-forms/
[xamarin.form internals]: https://docs.microsoft.com/en-us/xamarin/xamarin-forms/internals/
[xamarin.essentials]: https://docs.microsoft.com/en-us/xamarin/essentials/
