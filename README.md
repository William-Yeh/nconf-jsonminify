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
 * load from config file
 */
conf.loadFile('config/development.json');
//conf.loadFile('config/test.json');
//conf.loadFile('config/staging.json');
//conf.loadFile('config/production.json');


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

MIT License.

