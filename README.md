# nconf-jsonminify

A simple wrapper for [nconf](https://www.npmjs.org/package/nconf) + [jsonminify](https://github.com/fkei/JSON.minify):

- **nconf**: to read config data from various prioritized sources:

  1. Command-line arguments;
  2. Environment variables;
  3. Optional string or external file (JSON with optional comments).

- **jsonminify**: to remove comments and whitespace within JSON string.



## Install

```
npm install nconf-jsonminify
```


## Usage

```
// import the module
var conf = require('nconf-jsonminify');


/*
 * load from config directory
 */

// load: config/{NODE_ENV}.json or config/default.json
conf.load();

// load: config/{NODE_ENV}.json or config/default.json
conf.load('config');

// load: config/development.json
conf.load('config', 'development');


/*
 * load from config file
 */

conf.loadFile('config/development.json');
conf.loadFile('config/testing.json');
conf.loadFile('config/staging.json');
conf.loadFile('config/production.json');


/*
 * load from string
 */
conf.loadString('{ "users": [ "Alice", "Bob", "Carol" ] }');


/*
 * obtain individual config item
 */
var host  = conf.get('host');
var port  = conf.get('port');
var users = conf.get('name');
//...

```








## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/).

Copyright © 2013+ William Yeh [https://github.com/William-Yeh](https://github.com/William-Yeh).
