# OS2ConTicki display

## Description

A react frontend that display conference-data.

## Installation

Add the package:

```sh
yarn add @os2conticki/display-react
```

Use it:

```html
<link ref="stylesheet" href="node_modules/@os2conticki/npm-test/dist/entry.css"></script>
…
<script src="node_modules/@os2conticki/npm-test/dist/entry.js"></script>
```

Or get it directly from a cdn:

```sh
<link ref="stylesheet" href="https://cdn.jsdelivr.net/npm/@os2conticki/display-react@latest/dist/entry.css"></script>
…
<script src="https://cdn.jsdelivr.net/npm/@os2conticki/display-react@latest/dist/entry.js"></script>
```

## Example

```html
<!doctype html>
<html lang="da">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My conference</title>
    <link ref="stylesheet" href="https://cdn.jsdelivr.net/npm/@os2conticki/display-react@latest/dist/entry.css"></script>
  </head>
  <body>
    <div id="app"></div>

    <script src="https://cdn.jsdelivr.net/npm/@os2conticki/display-react@latest/dist/entry.js"></script>
    <script>
     ConferenceApp.render({
       element: document.getElementById('app'),
       basename: '/my-conference',
       // Url to conference api.
       url: '…'
     })
    </script>
  </body>
</html>

```

## Development

```sh
yarn install
yarn dev-server
```

## Building

```sh
yarn install
yarn build
```

## Publishing to npmjs.com

```sh
npm adduser os2conticki
npm version «some version»
npm publish --access public
```

## Code linting

When PRs are created towards the develop branch all coding styles are checked by Github Actions.

To check for coding standards, run the following:

```sh
yarn coding-standards-check
```

To automatically apply coding standards, run:

```sh
yarn coding-standards-apply`
```

## Something about test-data
