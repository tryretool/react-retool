# react-retool

A React wrapper for embedding Retool apps.

## Install

```
// with npm
$ npm install react-retool  --save

// with yarn
$ yarn add react-retool
```

## Usage

```
import Retool from 'react-retool';

function App() {
  const sample = { name: 'Sample data' }
  return (
    <Retool 
      url="https://retoolin.tryretool.com/embedded/public/f7607e1f-670a-4ebf-9a09-be54cf17181e"
      data={sample}
    />
  );
}

export default App;
```

### Options

`<Retool>` expects a `url` prop pointing to an embedded Retool application. You can generate this URL in the editor mode of a Retool app by clicking "Share" then "Public".

`<Retool>` will accept an optional `data` object, which is made available to the embedded application. When an embedded Retool application runs a Parent Window Query, `<Retool>` will check if `data` contains a key matching the Parent Window Query's selector, and if so, return that value to the query.

`<Retool>` will accept optional `height` and `width` props which will be used for the dimensions of the embedded window.

`<Retool>` will accept an optional `onData` callback that will be called with the data of an event that is sent from the embedded Retool app. These events can be sent from a JavaScript query inside of Retool by using the `parent.postMessage()` syntax.

### Example

Running `yarn start` will start an application with a basic Retool app embeded.

There is a live example here: [https://react-retool.surge.sh](https://react-retool.surge.sh)

## Development

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Publishing

1. Bump version with `npm version [major|minor|patch]`
2. Run `yarn publish:npm`. This will build the project in the `/dst` directory.
3. Navigate to `/dst` directory.
4. Publish to npm with `npm publish`

## Support

Need help? Please report issues or requests to support@retool.com, through in app chat, or on https://community.retool.com/
