#!/usr/bin/env node

var imgdiff = require("./imgdiff");
var fs = require("fs");

var printHelp = function() {
  console.log("Usage: [original file] [new file] {--result=[output file]} {--diff-image-only}");
};

if (require.main === module) {
  var argv = require('minimist')(process.argv.slice(2));

  if (argv._.length !== 2) {
    printHelp();
    return;
  }

  var options = {};
  
  var useStdOut = false;
  if (argv.result) {
    if (argv.result == '_') {
      useStdOut = true;
      options.output = process.stdout;
    } else {
      options.output = fs.createWriteStream(argv.result);
    }
  }

  if (argv['diff-image-only']) {
    options.diffOnlyImage = true;
  }

  var diffPipeline = imgdiff.calculateImageDifference(argv._[0], argv._[1], options)
    if (!useStdOut) {
      diffPipeline.then(function(diff) {
        console.log("{total: %s, different: %s, percent: %s}", diff.total, diff.different, diff.percent);
      });
    }
  diffPipeline.done();
}
