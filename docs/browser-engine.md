---
id: browser-engine
---

# Browser engine

Developers of this category use mainly HTML, CSS, and JavaScript to create their applications,
which are executed on a "browser engine". There are currently 3 actively maintained browser engines:

* [Gecko]
* [WebKit]
* [Chromium]

These browser engines power not only "web browsers", but also any technology that uses these
language to create a User Interface ("Embedded browser engine"). While the foundation might be the
same, there are some key differences between these two sub-categories.

<!-- Venn diagram of browser engines, web browsers, embedded browser engine -->

## Web browsers

With more than 4 billion internet users and 1.7 billion websites, the web is one (if not the most)
popular platform.

While websites started as a way to render documents back in 1990, they have come a long way. They
provide rich experiences with real time communication, video, and 3D graphics. They also adapt
dynamically to any form factor, work offline, send notifications, and more.
With all these new features and capabilities, browsers have had to evolve and become more like mini
OSes, protecting users from malicious attacks and poorly written code.

The [most used ones][statcounter] are [Chrome] ([Chromium]), [Safari] ([WebKit]), and [Firefox]
([Gecko]). But even though they all are considered modern engines, they are not the same. Even for
the same browser there can be significant differences accross platforms (more notably on iOS where
they are force to be a wrapper around the WebKit's WebView).

As with all other technologies, there are pros and cons that developers need to evaluate. The main
questions to ask are around:

* Feature requirements and platform support
* Distribution and infrastructure

### Feature requirements and platform support

As mentioned earlier, the Web API has become richer over the last few years. Yet there are features
that are still not available (nor they will be, like platform specific features).

It is important for developers to know what are the required features and if there is an API to
enable that. The [capabilities status][Project Fugu] website is a good place to learn about what is
already available or in development. Not all these APIs are supported by all browsers at the same
time, so developers need to additionally take into account what does their user base look like, if
there are alternatives that could be use, or if the experience they are planning could be
[progressively enhanced][Progressive enhancement] instead of rely entirely on it.

### Distribution and infrastructure

:::caution

This sections needs to be written. Some talking points are:

* _Talk about server vs install file_
* _Requiring a web server to deliver the app_

:::

## Embedded browser engine

This sub-category has been around since 2009. Chrome was released the year before and it was already
the fastest browser thanks to its new [V8] JavaScript engine. The web platform is becoming faster
and sites more interactive. At the same time, iPhone (2007) and Android (2008) devices are becoming
more and more popular, but it is complicated to find experienced developers, let alone for both.

To fill this opportunity [Apache Cordova] is created (formerly PhoneGap): a mobile development
platform that uses the platforms’ WebView control (a control that allows you to render web content
inside an application) to create web UI driven applications that also have access to native features
not available in the web.

Since that year, there have been multiple technologies that have been created that use the WebView
provided by the Operating System or even bundle a full browser engine such as [Electron] (2013),
[Chromium Embedded Framework (CEF)][CEF] (2009), [NW.js] (2012), [Capacitor] (2019), [Tauri] (2021),
[Chromely] (2018) and more.

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

### Platform support and Rendering engine

At first it can be a bit surprising to group "Platform support" and "Rendering engine". The reason
is that they are intertwined and one impacts the other (and vice-versa). Technologies that bundle
their own rendering engine (Electron, CEF) will only work on platforms that allow engine diversity.
Because iOS devices do not allow that, their teams usually limit themselves to desktop platforms
(Linux, macOS, and Windows). Those that rely on the platform's provided WebView have an easier time
to reach more platforms (i.e.: mobile as well), at the expense, in some cases, of quirks between the
different platforms or if the device is running an older version of the control.

### Hosting language, features and hotpaths

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

### Inter-Process Communication layer

While there are many browsers and cross-platform technologies, the reality is that there are not
that many browser enginges as we have seen before. In fact, most of the technologies that render web
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
[Chromium]: http://www.chromium.org/Home
[Chrome]: https://www.google.com/chrome/index.html
[Edge]: https://www.microsoft.com/en-us/edge
[Electron]: https://www.electronjs.org
[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[Gecko]: https://developer.mozilla.org/en-US/docs/Mozilla/Gecko
[Firefox]: https://www.mozilla.org/en-US/firefox/new/
[NW.js]: https://nwjs.io/
[Progressive enhancement]: https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
[Project Fugu]: https://web.dev/fugu-status/
[Safari]: https://www.apple.com/safari/
[statcounter]: https://gs.statcounter.com/browser-market-share
[Tauri]: https://tauri.studio/
[V8]: https://en.wikipedia.org/wiki/V8_(JavaScript_engine)
[WebKit]: https://webkit.org/
[WebSockets]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
[Chromely]: https://github.com/chromelyapps/Chromely