---
title: Rendering strategies
---

# Rendering strategies

There are many types of cross-platform technologies. At a high-level, they all work by exposing a
common API to the developers and then taking care of the underlying specific code for each platform.
The main difference is where that common API is implemented and what is exposed to the developers.
It could be an abstraction to how to access common OS features, how to draw in the screen or
anything in between.

In this website we have decided to categorize the technologies by the type of User Interface (UI)
rendering strategy. This is the classification we found creates the less groups and overlappin, and
is easier to rationalize. If you believe there is a better way, please [let us know][GitHub]!

* **[Browser engine]**: This is the category of technologies that use HTML, CSS, and JavaScript to
  render the UI. This includes not only web browsers, but also any other technology
  that users a browser engine to render the content (like [Chromium Embedded Framework], [Electron],
  [Ionic], etc.). There are currently 3 main browser engines that are actively maintained:
  * [Gecko], used by [Firefox]
  * [WebKit], used by [Safari]
  * [Chromium], used by [Chrome]

  While in the past browsers have been limited on what hardware features they could use, these has
  change over the last few years thanks to [Progressive Web Apps] and [web capabilities
  project][Project Fugu] (known also as Project Fugu 🐡). Web developers
  can now access the File System, USB, Bluetooth, and more. It is worth calling out that not all web
  browsers implement the same set of features. Browsers based on [Chromium] expose significant more
  features compared to the rest.
  But there are still features not exposed via the Web API or particular to a given platform. In
  those situations developers need to look at other technologies that use a browser engine to render
  the UI but allow direct access to the platform. Some examples of these technologies are [Electron]
  (used by VS Code), [Chromium Embedded Framework] (used by Spotify), [Apache Cordova], [Ionic],
  [NW.js], [Tauri], [Chromely] etc.

* **[Platform controls]**: In this category the technology uses the controls (buttons, inputs, etc.)
  provided by the Operating System, and provides an abstraction to create these interfaces for all
  the supported platforms. The languages used in this category are diverse. For example,
  [React Native] and [NativeSript] use JavaScript, [Xamarin] uses C# and/or XAML, and so on.
  Applications built using these technologies usually adopt the look and feel of the platform where
  they are running, and thus look different depending on where they are running (e.g.: iOS and
  Android).

* **[Direct drawing]**: In here, the technologies use low-level APIs provided by the Operating
  System to draw directly on the screen. This means that they are also responsible for implementing
  any controls developers might need. For that reason, applications in this category usually have a
  consistent look and feel regardless of where they are running. Some of the technologies here are
  [Qt], [Flutter], [UnoPlatform] and [Avalonia] (mobile support is in public preview).

<!-- TODO: Add a diagram representing the above -->

[Apache Cordova]: https://cordova.apache.org/
[Browser engine]: ./browser-engine.md
[Chromium]: http://www.chromium.org/Home
[Chrome]: https://www.google.com/chrome/index.html
[Chromium Embedded Framework]: https://bitbucket.org/chromiumembedded/cef/wiki/Home
[Direct drawing]: ./direct-drawing.md
[Edge]: https://www.microsoft.com/en-us/edge
[Electron]: https://www.electronjs.org
[Firefox]: https://www.mozilla.org/en-US/firefox/new/
[Flutter]: https://flutter.dev/
[Gecko]: https://developer.mozilla.org/en-US/docs/Mozilla/Gecko
[GitHub]: https://github.com/crossplatform-dev/crossplatform.dev
[Ionic]: https://ionicframework.com/
[NativeScript]: https://nativescript.org/
[NW.js]: https://nwjs.io/
[Platform controls]: ./platform-controls.md
[Progressive Web Apps]: https://web.dev/progressive-web-apps/
[Project Fugu]: https://web.dev/fugu-status/
[Qt]: https://www.qt.io/
[React Native]: https://reactnative.dev
[Safari]: https://www.apple.com/safari/
[Tauri]: https://tauri.studio/
[WebKit]: https://webkit.org/
[Xamarin]: https://dotnet.microsoft.com/apps/xamarin
[Chromely]: https://github.com/chromelyapps/Chromely
[UnoPlatform]: https://platform.uno
[Avalonia]: https://www.avaloniaui.net