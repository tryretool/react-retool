# react-retool

A React wrapper for embedding Retool apps.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn publish:npm`

Builds the project in the `/dist` directory & publishes with to npm. 

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
  return (
    <Retool url="https://retoolin.tryretool.com/embedded/public/f7607e1f-670a-4ebf-9a09-be54cf17181e"/>
  );
}

export default App;
```

### Options
`<Retool>` expects a `url` prop pointing to an embedded Retool application. You can generate this URL in the editor mode of a Retool app by clicking "Share" then "Public".


### Example

Running `yarn start` will start an application with a basic Retool app embeded. 

There is a live example here: [https://react-retool.surge.sh](https://react-retool.surge.sh)