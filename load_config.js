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
 * @copyright © 2013+ William Yeh
 */

"use strict";


/**
 * Module dependencies.
 */
var nconf = require('nconf')
    , jsonminify = require("jsonminify")
    , fs = require('fs')
    , path = require('path')
    ;



// set priorities
nconf.argv()
     .env()
     //.file({ file: 'config.json' });
     ;

var APP_ROOT_PATH = path.dirname(require.main.filename);



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
 * load external config file from config directory & NODE_ENV setting
 *
 * @param {string, optional} config_directory -
 *        should be either absolute or relative to app_root.
 *        default: 'config'.
 *
 * @param {string, optional} operation_mode - override NODE_ENV if given.
 *        use 'default' if missing and NODE_ENV is undefined.
 */
exports.load = function(config_directory, operation_mode) {
    //nconf.file({ file: filename });

    if (typeof config_directory !== 'string') {
        config_directory = 'config';
    }


    var dir_fullpath;
    var regex_root_dir = /^\//;
    if (regex_root_dir.exec(config_directory)) {
        dir_fullpath = config_directory;
    }
    else {
        dir_fullpath = path.join(APP_ROOT_PATH, config_directory);
    }


    var filename;
    if (typeof operation_mode === 'string') {
        filename = operation_mode + '.json';
    }
    else if (typeof process.env.NODE_ENV === 'string') {
        filename = process.env.NODE_ENV + '.json';
    }
    else {
        filename = 'default.json';
    }



    var file_fullpath = path.join(dir_fullpath, filename);
    var data = fs.readFileSync(file_fullpath, { encoding: 'utf8' } );
    loadString(data);

    /*
    fs.readFile(file_fullpath, { encoding: 'utf8' }, function (err, data) {
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
