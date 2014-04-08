/**
 * A simple wrapper for nconf + jsonminify.
 *
 * [nconf]
 * read config data from various prioritized sources:
 *
 *   1. Command-line arguments
 *   2. Environment variables
 *   3. Optional string or external file (JSON with optional comments).
 *
 * [jsonminify]
 * Simple minifier for JSON to remove comments and whitespace.
 *
 *
 * @author William Yeh <william.pjyeh@gmail.com>
 * @license MIT License
 */

"use strict";


/**
 * Module dependencies.
 */
var nconf = require('nconf')
  , jsonminify = require("jsonminify")
  , fs = require('fs')
  ;



// set priorities
nconf.argv()
     .env()
     //.file({ file: 'config.json' });
     ;


//------------------------------------//
/**
 * load config string
 *
 * @param {string} str config content in JSON
 */
var loadString = function(str) {
    //nconf.defaults(JSON.parse(str));

    var config_content = JSON.minify(str);
    //console.log(config_content);
    nconf.defaults(JSON.parse(config_content));
};

exports.loadString = loadString;



//------------------------------------//
/**
 * load external config file
 *
 * @param {string} filename
 */
exports.loadFile = function(filename) {
    //nconf.file({ file: filename });

    var data = fs.readFileSync(filename, { encoding: 'utf8' } );
    loadString(data);

    /*
    fs.readFile(filename, { encoding: 'utf8' }, function (err, data) {
        if (err)  throw err;
        //console.log(data);
        loadString(data);
    });
    */
};



//------------------------------------//
/**
 * get specific config item
 *
 * @param {string} key
 * @returns value
 */
exports.get = function(key) {
    return nconf.get(key);
};

