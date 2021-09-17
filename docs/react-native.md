---
title: React Native
---

# React Native

[React Native] is a popular technology to create cross-platform applications developed mainly
by Facebook. While it is really popular among mobile platforms, developers can also target Windows
and macOS (more about this later).
React Native is used not only at Facebook, but also at other large companies such as
[Microsoft][ms rn], [Shopify][shopify rn], and [Pinterest][pinterest rn].

To better understand how React Native works we should look at [React], a JavaScript library
developed by Facebook for building user interfaces. React uses a Virtual DOM (VDOM), a
representation in memory of the different elements of the UI and how they are related to each other.
When using React on the web, that VDOM updates the web page. In the case of React Native, its VDOM
maps the elements of the UI to platform controls instead of the browser DOM. This allows developers
to reuse their React web skills to create applications. Its moto is “Learn once, write anywhere”.

:::info
The [Document Object Model (DOM)][dom] is a concept from the web browsers. The DOM treats an HTML
document as a tree structure wherein each node is an object representing a part of the document.
While React Native uses the concept of VDOM, there is no "real" DOM in React Native.
:::

While React Native and React for the web both use JavaScript and [JSX], it is worth noting that
there are some difference between them (thus the "write anywhere" part). For example, developers
can use [Grid] and [Flexbox] for layout on the web, but only the later on React Native.

<!-- Talk about extensibility -->

## Summary

| Characteristic     |                                                                                                 |
| ------------------ | :---------------------------------------------------------------------------------------------: |
| Website            |             [{{technologies.react-native.url}}]({{technologies.react-native.url}})              |
| Platforms          |                                         Mobile, Desktop                                         |
| Rendering strategy |                                       [Platform controls]                                       |
| Code License       | [{{technologies.react-native.codeLicense.name}}]({{technologies.react-native.codeLicense.url}}) |
| Copyright          |                                            Facebook                                             |
| Documentation      |   [{{technologies.react-native.documentation}}]({{technologies.react-native.documentation}})    |
| Community          |       [{{technologies.react-native.community}}]({{technologies.react-native.community}})        |
| Latest version     |                        {{technologies.react-native.releases.0.version}}                         |
| Release cadence    |                                               N/A                                               |
| Release support    |                                         Latest version                                          |
| Update model       |                                        Developer driven                                         |
| Governance model   |                            Facebook is the ultimate decission maker                             |

**Platform support:**

{{ table technologies.react-native.platforms.{} }}

:::caution
Windows and macOS are considered out-of-tree platforms React Native platforms. Developers need to
download the packages `react-native-windows` and/or `react-native-macos` (developed
by Microsoft) to target them. You can learn more in [React Native for Windows + macOS][rn desktop].
:::

**Language support:**

{{ table technologies.react-native.languages.{} }}

## Release cadence, version support and update model

While React Native does not have a fixed release cadence, the team's goal is to publish a new
version every few months (3-6). On top of the stable releases, developers have also access to
release candidate and nighlty builds.

While usually only the latest published version is supported, during the `v0.62`-`v0.66` timeframe
there have been updates to previous minor versions. For example, `v0.62.3` was released at the same
time as `v0.64.1`.

React Native applications are self-contained: the runtime is bundled into the application. This
means that updating the React Native version is a developer responsibility (developer driven).

:::caution
Although React Native is a mature project, it has not reach v1. This means that any minor release
can have breaking changes.
:::

## Governance

While React Native is OSS
[{{technologies.react-native.codeLicense.name}}]({{technologies.react-native.codeLicense.url}})
licensed) and has contributors from different companies, the ultimate decission maker is Facebook.

## Internals

In React Native apps, the application code is executed outside of the application main (UI) thread.
This is one of the key elements of React Native architecture and helps with preventing frame drops
in cases where JavaScript has some heavy work to do. While this communication is usually fast and
imperceptible, under certain scenarios there can be some latency or make the API ergonomics a bit
complicated. If updates are happening in a separate thread it is often a case that changes done in
the JavaScript thread cannot be reflected in the same frame. In React Native by default all updates
are delayed by at least one frame as the communication between UI and JavaScript thread is
asynchronous and the UI thread never waits for the JavaScript thread to finish processing events.

This is better understood if we look at the threads that are spawned when a React Native application
starts and how they communicate with each other.

<!-- Simplified diagram of the threads -->

1. **Main thread** — This is the main thread which gets spawned as soon as the application launches.
   It loads the app and starts the JavaScript thread to execute the JavaScript code.
   The main thread also listens to the UI events like 'press', 'touch', etc. These events are then
   passed to the JavaScript thread via the “bridge”: a queue of messages encoded as JSON strings
   that communicates both contexts.
   Once the JavaScript loads, its thread sends the information on what needs to be rendered onto the
   screen.
   This information is used by a shadow node thread to compute the layouts. The shadow thread is
   basically like a mathematical engine which finally decides on how to compute the view positions.
   These instructions are then passed back to the main thread to render the view.
1. **JavaScript thread** — The JavaScript thread is where the main bundled JavaScript runs.
   This thread runs all the business logic, i.e., the code written in React Native.
1. **Custom Native Modules** - Apart from the threads spawned by React Native, we can also spawn
   threads on the custom native modules we build to speed up the performance of the application. For
   example — Animations are handled in React Native by a separate native thread to offload the work
   from the JavaScript thread.

Looking at the initial example of a user interacting with the screen, if they tap on a button the
native code sends a message through the bridge to the JavaScript context so the handler the
developer wrote is executed. Any side effect of that execution that changes the UI will be send
again over the bridge.

<!-- Diagram of messages being sent -->

To address some of the concerns lined out earlier, the React Native Core team is working on removing
the “bridge” and replace it with a [new renderer][fabric], called Fabric, and a new mechanism to
communicate the JavaScript thread with native modules, called TurboModules.
This will allow, among other things, opt-in synchronous actions between the JavaScript thread and
the UI and native modules.

:::tip
In [July 2021][facebook fabric] Facebook announced that all its screens are using Fabric already. It
is expected this feature will be enabled in the React Native's open source version in the near
future.
:::

:::note
The following sources where used for this section:

- [React Native Guide]
- [The New React Native Architecture Explained: Part Three] by [Lorenzo Sciandra]
- [React Native Reanimated]
  :::

<!-- Ref links -->

[dom]: https://en.wikipedia.org/wiki/Document_Object_Model
[embedded browser engine]: ./browser-engine.md#embedded-browser-engine
[facebook fabric]: https://twitter.com/joshuaisgross/status/1415099495285608453
[fabric]: https://reactnative.dev/blog/2018/06/14/state-of-react-native-2018
[flexbox]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/GridsS_layout/Flexbox
[grid]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
[jsx]: https://reactjs.org/docs/introducing-jsx.html
[lorenzo sciandra]: https://twitter.com/Kelset
[{{technologies.react-native.codelicense}}]: https://github.com/facebook/react-native/blob/main/LICENSE
[ms rn]: https://twitter.com/safaiyeh/status/1219294459298344961
[pinterest rn]: https://medium.com/pinterest-engineering/supporting-react-native-at-pinterest-f8c2233f90e6
[platform controls]: ./platform-controls.md
[react]: https://reactjs.org/
[react native]: https://reactnative.dev
[react native guide]: https://www.reactnative.guide/3-react-native-internals/3.1-react-native-internals.html
[react native reanimated]: https://docs.swmansion.com/react-native-reanimated/docs/
[rn desktop]: https://microsoft.github.io/react-native-windows/
[rn code]: https://github.com/facebook/react-native
[shopify rn]: https://engineering.shopify.com/blogs/engineering/react-native-future-mobile-shopify
[the new react native architecture explained: part three]: https://formidable.com/blog/2019/fabric-turbomodules-part-3/
