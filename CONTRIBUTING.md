
# Contribution Guide

## Reporting Bugs
Having issues or want to report a bug? Email (help@addthis.com)[mailto:help@addthis.com].

## Dependencies
Make sure you have the following installed:
 - Node.js
 - npm
 - Git

Use npm to install the following:
 - gulp `npm install -g gulp`
 - karma `npm install -g karma`

## Installation
Get the source code by cloning to git repository via:
```
git clone https://github.com/addthis/jquery-addthis
```

Navigate into the git repository and install all the needed dependencies via npm:
```
npm install
```

## Building
There are a few commands to help automate the development process

### <code>gulp watch</code>
Rebuilds things as files change

### <code>gulp build</code>
Builds everything, including documentation

### <code>gulp test</code>
Runs tests

### <code>gulp jslint</code>
Lints the JavaScript

### <code>npm run docs</code>
Builds the documentaiton

### <code>node server.js</code>
Serves all the code, documentation and examples sites locally at `http://localhost:3003`

Built Code: http://localhost:3003/dist/official-addthis-angularjs.js
Documentation: http://localhost:3003/docs/
Test Reports: http://localhost:3002/test/reports/
Example Site: http://localhost:3003/examples/index.html