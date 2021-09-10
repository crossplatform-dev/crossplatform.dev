# Crossplatform.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/94c5bec4-b9c5-4afb-bdc3-bbc10d237598/deploy-status)](https://app.netlify.com/sites/musing-turing-85b4c5/deploys)

This repository contains the code and contents of https://crossplatform.dev.

It is built using [Docusaurus 2](https://docusaurus.io/) and deployed on Netlify.

Table of contents:

* [Installation](#installation)
* [Local development](#local-development)
* [Writing code examples](#writing-code-examples)
* [Adding a new technology](#adding-a-new-technology)

## Installation

To install it locally, you will need to:

* Install [Git] and [Node.js] installed on your machine
* Clone and install the dependencies of the project:

  ```console
  git clone https://github.com/crossplatform-dev/crossplatform.dev
  cd crossplatform.dev
  npm install
  ```

## Local Development

The project has the following folder structure:

```console
crossplatform.dev
 |
 ├─ blog → Markdown files with the blogposts
 |
 ├─ docs → Markdown files with the contents of the documentation
 |
 ├─ scripts → JavaScript with the technology scaffolders and such
 |
 ├─ src → Docusaurus code
 |
 ├─ static → Docusaurus static assets
```

The following command will start a local development server and
open up a browser window:

```console
npm start
```

Most changes, like markdown modifications, `sidebars.js`, etc. are
reflected live without having to restart the server.

## Writing code examples

The website also has a couple remark plugins that make it easier to have examples side by side.
They live under the [`/src/transformers`][transformers] folder:

- `import-code` allows you to reference a code file an "import" it automatically when building
  the website. This is useful to separate the code from the text. You can use it as follows:

  ````md
  Look at this JavaScript code:

  ```js (./path/to/code.js)
  ```
  ````

  The contents of `./path/to/code.js` will be loaded and place inside the codeblock using the
  indicated language. There is no need to have any content in the codeblock.

- `partial-content` allows you to include the contents of a markdown file into another file. That
  way you can have a markdown file per technology:

  ```md
  # This is an example

  {@import ./path/to/example.pmd}
  ```

  Although the extension is `.pmd` (Partial MarkDown), the contents are the same as a regular
  markdown file. The reason to change the extension is to avoid building it with Docusaurus.
  When using it in combination with [Docusaurus tabs] and writting MDX, you can end up with
  something like the following:

  ```jsx
  import Tabs from '@theme/Tabs';
  import TabItem from '@theme/TabItem';

  <Tabs>
    <TabItem value="electron" label="Electron" default>

      {@import ./electron.pmd}

    </TabItem>
    <TabItem value="pwa" label="PWA">

      {@import ./pwa.pmd}

    </TabItem>
    <TabItem value="wv2" label="WebView2">

      {@import ./wv2.pmd}

    </TabItem>
  </Tabs>;
   ```

**CAUTION:** It is important to leave a blank link before and after `{@import}, otherwise it
will not work.

`partial-content` files can also make use of `import-code`.


## Adding a new technology

To create a new technology overview, run the following command:

```console
npm run add-technology
```

You will be prompted the technology name and once provided:

- a new folder will be created under `/docs/` with its name
- the folder will have a few markdown files for you to complete
- `sidebars.js` will be updated to include the new technology
- a new file will be created under `/data/technologies/TECHNOLOGY.js`
  for you to complete

![video of "npm run add-technology" running](./static/img/add-technology.webp)

Additionally, there are a few markdown extensions that you
can use to interpolate and access the data under `/data/`
from markdown so it's easier to update the content.

### Interpolating data

The contents of `/data/` are accessible from markdown as a
JavaScript object that follows the same path structure and with the
contents of the json files loaded.

For example:

```console
|- technologies
|   |- electron.json
|   |- ionic.json
```

Will return an object like:

```json
{
  "technologies": {
    "electron": { contents of electron.json},
    "ionic": { contents of ionic.json}
  }
}
```

You can access this data in a couple different ways;

#### Accessing a property

To print the value of a property you need to write something like:

```text
{{ path.fileName.property1.property2 }}
```

Following the previous example, to access the property
`url` under `technologies/electron.json` the markup will be:

```text
{{ technologies.electron.url }}
```

If you want to access a particular item on an array you can also
do it. The following will print the most recent version of Electron:

```text
{{ technologies.electron.releases.0.version }}
```

#### Creating a table

The following are a series of examples of different ways to
create tables interpolating data:

##### Comparison table

To create a table that compares a property accross different
categories you use the following syntax:

```text
{{ table folder.{}.property }}
```

For example, to generate a table that shows the platform support
of all the technologies the code is:

```text
{{ table technologies.{}.platforms }}
```

##### Details table

To create a table for a property that is an object you can do this:

```text
{{ table folder.filename.objectProperty.{} }}
```

For example, to list the platforms supported by Electron you have to
write the following:

```text
{{ table technologies.electron.platforms.{} }}
```

##### List table

To create a table for a particular property that is an Array you
can do the following:

```text
{{ table folder.filename.arrayProperty.[] }}
```

For example, the following will creata a list table with the latest
Electron releases.

```text
{{ table technologies.electron.releases.[] }}
```

This assumes that `releases` is an Array of the same type of items
and it will generate a table using the property names of the 1st
object as the column names, adding a new line per item in the Array:

```markdown
| Version | Date       |
| ------- | ---------- |
| vX.Y.Z  | 2021/10/01 |

...
```

If you want to just list one of the properties you can do the following:

```text
{{ table technologies.electron.releases.[].version }}
```

and the output will be:

```markdown
| Version |
| ------- |
| vX.Y.Z  |

...
```

<!-- Reference links -->

[Docusaurus tabs]: https://docusaurus.io/docs/markdown-features/tabs
[git]: https://git-scm.com/downloads
[node.js]: https://nodejs.org/en/download/
[transformers]: https://github.com/crossplatform-dev/crossplatform.dev/tree/main/src/transformers
