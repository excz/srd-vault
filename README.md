# [SRD Vault](http://#) - Standard Reference Data for Scientific Learning and Research
====

SRD Vault is a simple and powerful mobile platform for viewing scientific data.  Whether you are a science student or a seasoned scientist, our interface strives to bring you the easiest way to get the right information for your work.

This product uses data provided by the National Institute of Standards and Technology (NIST) but is not endorsed or certified by NIST.

## Requirement

 * Node.js - [Install Node.js](http://nodejs.org)
 * Cordova - Install by `npm install cordova`
 * This repository code - `git clone https://github.com/sylvanknave/srd-vault`

## Development Setup

1. Install dependencies

    $ npm install

2. Install Gulp globally

    $ npm install -g gulp

3. Run `gulp serve` and run the web server

    $ gulp serve

You should see running app on browser and you can start to develop your app with Onsen UI.

### Directory Layout

    README.md     --> This file
    gulpfile.js   --> Gulp tasks definition
    www/          --> Asset files for app
      index.html  --> App entry point
      js/
      lib/
        angular/  --> AngularJS dependency
        onsen/
          stylus/ --> Stylus files for onsen-css-components.css
          js/     --> JS files for Onsen UI
          css/    --> CSS files for Onsen UI
      scripts/    --> Cordova scripts directory
    platforms/    --> Cordova platform directory
    plugins/      --> Cordova plugin directory
    merges/       --> Cordova merge directory
    hooks/        --> Cordova hook directory
    scripts/      --> Cordova TS scripts directory and TS definitions

## Gulp Tasks

 * `gulp serve` - Running the app for development.
 * `gulp build` - Build several files for project.
 * `gulp jshint` - Generate [jshint](https://github.com/jshint/jshint) report.


## Notes

- Cleaning up values when displayed, a la http://physics.nist.gov/cgi-bin/cuu/Value?d220sil
