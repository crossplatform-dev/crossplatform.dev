---
id: overview
slug: /browser-engine
---

# Overview

Cross-platform technologies that use a browser engine (also called rendering engine) to render
their UI have been around for many years, more precisely since 2009. Chrome was released the year
before and it was already the
fastest browser thanks to its new [V8] JavaScript engine. The web platform is becoming faster and
sites more interactive. At the same time, iPhone (2007) and Android (2008) devices are becoming more
and more popular, but it is complicated to find experienced developers, let alone for both.

To fill this opportunity [Apache Cordova] is created (formerly PhoneGap): a mobile development
platform that uses the platforms’ WebView control (a control that allows you to render web content
inside an application) to create web UI driven applications that also have access to native features
not available in the web.

Since that year, there have been multiple technologies that have been created that use the WebView
provided by the Operating System or even bundle a full browser engine such as [Electron] (2013),
[Chromium Embedded Framework (CEF)][CEF] (2009), [NW.js] (2012), [Capacitor] (2019), [Tauri] (2021),
and more.

The high-level architecture of these technologies is very similar and can be seen as the following:

<p align="center">

![architecture diagram of browser engine based technologies](/img/browser-engine-schema.jpg)

</p>

The application uses a browser engine to render the web content (HTML, CSS, and JavaScript). This
content can be loaded remotely or locally (the iOS store does not permit the application to be
loaded entirely remotely).
To access a feature of the device or the OS that is not available via the Web platform's API, there
is a mechanism to communicate with the "outside world". This mechanism is the Inter-Process
Communication (IPC) layer.

While each project has its own characteristics (is it OSS? what is its release cadence? etc.), the
main technical questions can be grouped in the following categories:

* Platform support and rendering engine
* Hosting language, features and hotpaths
* Inter-Process Communication layer

## Platform support and Rendering engine

At first it can be a bit surprising to group "Platform support" and "Rendering engine". The reason
is that they are intertwined and one impacts the other (and vice-versa). Technologies that bundle
their own rendering engine (Electron, CEF) will only work on platforms that allow engine diversity.
Because iOS devices do not allow that, their teams usually limit themselves to desktop platforms
(Linux, macOS, and Windows). Those that rely on the platform's provided WebView have an easier time
to reach more platforms (i.e.: mobile as well), at the expense, in some cases, of quirks between the
different platforms or if the device is running an older version of the control.

## Hosting language, features and hotpaths

One common thing to this category is that most of the UI, if not all, is created using web
technologies (HTML, CSS and JavaScript). But the host could use a completely different language
like C++, C#, Swift, Java, Rust, Go, JavaScript...

A few questions that can help us make a decission are:

* **Does the technology provide all the needed features out of the box (or via plugins)?** If so the
  team will be spending most of the time working on the web side and while being familiar with the
  hosting language is always good, it might not be necessary to be an expert.
  In the opposite side, if there are gaps does that need to be filled, does the team have the
  experience? Does any of the languages or hosting technologies have any limitation that might
  prevent implementing those features? Is there another technology that can better leverage the
  knowledge they already have?
* **Where are the possible bottlenecks in the application?** If they are going to be in the host, it
  might be worth exploring if there is one that might have an advantage for your particular
  scenario. Another important thing to consider in this situation is how the communication between
  the host and the guest is done (the Inter-Process Communication layer). You could be running the
  fastest possible version of an algorithm on the host and still have poor results if that
  communication is done in an efficient way.

## Inter-Process Communication layer

While there are many browsers and cross-platform technologies, the reality is that there are not
that many browser enginges (more about this in [Web and PWA]). In fact, most of the technologies
rely on Chromium or WebKit. Unsurprisingly, when using the same engine and the same web content all
these technologies show similar performance characteristics (memory, processes, threads...). It
makes sense, the cost of running a browser engine is considerably larger than any “overhead” that
might come with the hosting technology (C++, C#, Node.js, etc.).
But how come that even if the same engine is used, two technologies can show different results? This
difference comes mainly on how the communication with the world outside what is provided by the web
platform is done, basically, how information flows from one process to another.

There are many strategies in here, each one with its pros and cons:

* **Message serialization:** The sender serializes a message into a format that can be understood
  by the receiver (usually a JSON string) and sends it via a built-in mechanism. The received then
  parses this message and creates a copy of the original message.
  For those familiar with JavaScript, it would be similar to `JSON.parse(JSON.serialize(myObject))`
  with an extra step to send the string to another process. This mechanism is commonly used by
  technologies that use a WebView control (e.g.: Apache Cordova, Capacitor) and sometimes is done
  automatically.

<p align="center">

![Diagram of the steps for the message serialization process](/img/stringify.jpg)

</p>

* **Direct clone of object:** But using strings to serialize and desarialize can be costly. If the
  host and the guest use the same technologie (i.e.: JavaScript), why not use a more efficient
  way of cloning an object. This is what some technologies (like Electron).

<p align="center">

![Diagram of the direct cloning process](/img/clone.jpg)

</p>

* **Sockets:** In this case, the host creates a server that the guest can connect to to communicate.
  It could be via [WebSockets], or even via regular HTTP requests (with the [Fetch API]). An example
  that uses this approach is [Blazor Desktop].

<p align="center">

![Diagram for sockets or web server process](/img/sockets.jpg)

</p>

<!-- Reference links. TODO: Update to internal links once they are available -->

[Apache Cordova]: https://en.wikipedia.org/wiki/Apache_Cordova
[Blazor Desktop]: https://devblogs.microsoft.com/dotnet/announcing-net-6-preview-1/#blazor-desktop-apps
[Capacitor]: https://capacitorjs.com/
[CEF]: https://bitbucket.org/chromiumembedded/cef/wiki/Home
[Electron]: https://www.electronjs.org
[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[NW.js]: https://nwjs.io/
[Tauri]: https://tauri.studio/
[V8]: https://en.wikipedia.org/wiki/V8_(JavaScript_engine)
[Web and PWA]: ../web/web.md
[WebSockets]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
