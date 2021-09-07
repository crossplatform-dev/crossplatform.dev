---
id: platform-controls
---

# Platform controls

:::note
Crossplatform technologies work by providing abstractions to the developers. In this section we will
learn more about those that operate at the platform controls level.
:::

All platforms provide a set of controls or components for developers to use so their application
is more integrated with the look and feel of the platform where they are running. For example, Apple
provides its [Human Interface Guidelines] and Android is [Material Design].

There are some foundational pieces that are "universal": links, buttons, images, labels, etc.

<p align="center">

<!-- Resize these images -->

![Buttons in Apple's Human Interface Guidelines](/img/design-buttons-hig.png)
![Buttons in Android's Material Design](/img/design-buttons-material.png)

</p>

But there are other controls or interactions that are completely different and cannot be translated
from one platform to another.

Technologies in this category focus on make it easy to:

- share the business logic code, which should be (mostly) the same accross all platforms
- write custom UI for a particular platform if needed

While this means that you might still have to write custom code per platform, it will be using
mostly the same technology, and it will also allow you to provide a more integrated experience to
your users by "fine tuning" the UI to where the application is running.

:::tip
The percentage of code share accross platforms will depend a lot in your application. In some cases
it can be really high (over 95%!), in others it might be a bit lower.

When evaluating these type of technologies consider how much "tweaks" you want to do per platform to
have a better idea on how much code you will be capable of reusing.
:::

Contrary to technologies under [Browser engine], the architecture of this category can vary vastly
from one to another. Even for the same technology the implementations could be different accross
platforms (like [Xamarin]). For that reason each technology will have its own internals section to
explain how they work.

## Technologies

The following is a non-exhaustive list of technologies under this category. If you know of more,
please [report them in GitHub][new-technology]!

|   Technology   |
| :------------: |
| [React Native] |
|   [Xamarin]    |

<!-- Reference links -->

[browser engine]: browser-engine.md
[human interface guidelines]: https://developer.apple.com/design/human-interface-guidelines/ios/controls/buttons/
[material design]: https://material.io/components?platform=android
[new-technology]: https://github.com/crossplatform-dev/crossplatform.dev/issues/new
[react native]: react-native.md
[xamarin]: xamarin.md
