---
title: Types of technologies
---

# Types of technologies

As mentioned earlier, there are many types of cross-platform technologies. The most common types
are:

* **[Web]**: Web browsers are available in a wide range of devices (like some smart appliances).
  While in the past they have been limited on what hardware features they could use, these has
  change over the last few years thanks to [Progressive Web Apps] and [Project Fugu]: File System,
  USB, Bluetooth...Not all web browsers implement the same set of features. The browsers based on
  [Chromium] (like [Chrome] and [Edge]) expose significant more features compared to those based on
  [Gecko] ([Firefox]) or [WebKit] ([Safari]).
* **[Browser engine]**: These technologies use a browser engine to render their user interface. This
  means that HTML, CSS, and JavaScript are most likely the main technologies to drive use
  interaction. Some examples are [Electron], [Chromium Embedded Framework], [NW.js], [Tauri], etc.
* **[JavaScript projection]**: In this case, most (if not all) of  the app  logic and UI is written
  using JavaScript. One significant difference with _Browser engine_ is that instead of using the
  web DOM to draw the UI, it uses other UI primitives and controls. These primitives and controls
  could be provided by the Operating System or by another graphical framework. [React Native],
  [NativeScript], and [NodeGui] are some examples of this category.
* **[Compiled]**: These technologies have a compilation step that transform the code closer to the
  CPU. The languages are usually not web related, like C#, Dart, or C++. Some of them use the OS
  provided controls, while in others they take care of paining all the pixels in the screen. Some
  examples are [Flutter], [Xamarin], [Qt]

<!-- TODO: Add a diagram representing the above -->

[Browser engine]: ./browser-engine/browser-engine.md
[Chromium]: http://www.chromium.org/Home
[Chrome]: https://www.google.com/chrome/index.html
[Chromium Embedded Framework]: https://bitbucket.org/chromiumembedded/cef/wiki/Home
[Compiled]: ./compiled/compiled.md
[Edge]: https://www.microsoft.com/en-us/edge
[Electron]: https://www.electronjs.org
[Firefox]: https://www.mozilla.org/en-US/firefox/new/
[Flutter]: https://flutter.dev/
[Gecko]: https://developer.mozilla.org/en-US/docs/Mozilla/Gecko
[JavaScript projection]: ./javascript-projection/javascript-projection.md
[NativeScript]: https://nativescript.org/
[NodeGui]: https://docs.nodegui.org/
[NW.js]: https://nwjs.io/
[Qt]: https://www.qt.io/
[React Native]: https://reactnative.dev
[Safari]: https://www.apple.com/safari/
[Tauri]: https://tauri.studio/
[Web]: ./web/web.md
[WebKit]: https://webkit.org/
[Xamarin]: https://dotnet.microsoft.com/apps/xamarin
