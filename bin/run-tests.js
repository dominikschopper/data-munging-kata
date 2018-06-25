// @ts-nocheck
const Jasmine = require('jasmine');
const jasmine = new Jasmine();

const Reporter = require('jasmine-terminal-reporter');
const reporter = new Reporter({"isVerbose": true})

jasmine.loadConfig({
    "spec_dir": 'src',
    "spec_files": [ '**/*[sS]pec.js' ],
    "helpers": [ 'helpers/**/*.js' ]
});

jasmine.addReporter(reporter);

jasmine.execute();