# Chatapp widget admin client.
Example application: Chat app widget admin client is a client-side part for a Chat Application using React, Redux, Redux-Saga, and Jexia's Real Time Communication.

[Widget is a server-side part of this Chat Application](https://github.com/jexia/chatapp-widget)

## Features
 - React 
 - Redux (data management)
 - Redux-Saga (side effects management)
 - Jexia:
   - Project integration
   - Dataset CRUD operations
   - Authentication service
   - Real Time Communication

## Built With
### Dependencies
| Name| Description | |
|--|--|:--:| 
|[axios]|Promise based HTTP client for the browser and node.js|🌐
|[jexia-sdk-js]|Jexia Javascript SDK|🐝
|[react]|React is a JavaScript library for building user interfaces.|📚
|[react-dom]|React package for working with the DOM.|📚
|[react-redux]|Official React bindings for Redux|📚
|[react-router-dom]|DOM bindings for React Router|📚
|[react-scripts]|Configuration and scripts for Create React App.|🛠️
|[redux]|Predictable state container for JavaScript apps|📚
|[redux-saga]|Saga middleware for Redux to handle Side Effects|🛠️
|[styled-components]|Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress|🎨
|[uuid]|RFC4122 (v1, v4, and v5) UUIDs|🛠️
|[rxjs]|Reactive Extensions for modern JavaScript|📚

## Installation & Setup
### Clone repository
```
git clone git@github.com:jexia/chatapp-widget-admin-client.git
cd chatapp-widget-admin-client
```

### Start
If you don't have installed Node.js on your computer use this link https://nodejs.org/en/ to download the latest version and install it.

### Install dependencies
```
npm install
```
### Setup Jexia project
```
1. Create project
2. Create dataset 
3. Create RTC channel
4. Create API-key
5. Create CRUD policy for all users and all datasets
6. Update [/src/consts/config.js] with your project-id, API-key and API-secret:
    export const projectID = "your-project-id";
    export const key =  "your-key";
    export const secret = "your-secret";

```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm build
```

### Test and fixes files
```
npm test
```
## License
[MIT](./LICENSE) &copy; jexia
