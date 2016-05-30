
#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
const request = require('request');

const pkg = require('./package.json');

const repoName = pkg['name'];
// removing `-bikes` inserted in the first place to avoid npm name conflicts.
const link = repoName.slice(0, repoName.length - 6);

const api = `http://api.citybik.es/${link}.json`;

const cli = meow(`
  Usage:
    bikes <station-id>
    or
    bikes (to get list of stations id, name)
    -v/--version    Print version
    -h/--help       Print help
  `, {
    alias: {
      v: 'version',
      h: 'help'
    },
    string: ['_']
});

// with only `bikes` command > all ids and names should be rendered
let query = cli.input.join(' ');
query = query.toLowerCase().trim();

request(api, function (error, response, body) {
  const rawData = JSON.parse(body);
  if (!error && response.statusCode == 200) {
    // if station is empty automatically render list of id and respective names else pull info
    // about a specific station - bikes available - free docks available
    if (query.length < 1) {
      process.stdout.write(`
  --- List of all station's names and ids ---
  --- current Time: ${ new Date() } ---
        `);

      rawData.forEach( station => {
        process.stdout.write(`
          id: ${ station.id } - station: ${ station.name }
        `);
      })
    } else {
      // no need to coerce query into a number == is enough
      let result = rawData.filter( station => station.id == query );

      if (result.length < 1) throw new Error( chalk.bold.red('The id you entered is not valid.') );

      process.stdout.write(`
        Station: ${ chalk.bold( result[0].name )  }
          - n. available bikes: ${ result[0].bikes > 1 ? chalk.bold.green(result[0].bikes) : chalk.bold.red(result[0].bikes) }
          - n. available docks: ${ result[0].free > 1 ? chalk.bold.green( result[0].free ) : chalk.bold.green( result[0].free ) }
      `);

      process.stdout.write(`Have a nice ride and be safe!`);
      process.exit(1)
    }
  }
});
