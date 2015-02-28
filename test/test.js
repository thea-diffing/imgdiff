var assert = require('assert');
var imagediff = require('../imgdiff');

// left vs right
imagediff.calculateImageDifference("test/left.png", "test/right.png").then(function(result) {
  assert.equal(result.total, 10000);
  assert.equal(result.percent, 0.25);
  assert.equal(result.different, 2500);
  assert.equal(result.resultImage.width, 100);
  assert.equal(result.resultImage.height, 100);
  assert.equal(result.resultImage.channels, 4);
  assert.equal(result.resultImage.data.shape[0], 100);
  assert.equal(result.resultImage.data.shape[1], 100);
  assert.equal(result.resultImage.data.shape[2], 4);
}).done();

// right vs left (should be same)
imagediff.calculateImageDifference("test/right.png", "test/left.png").then(function(result) {
  assert.equal(result.total, 10000);
  assert.equal(result.percent, 0.25);
  assert.equal(result.different, 2500);
}).done();

// left vs left (no difference)
imagediff.calculateImageDifference("test/left.png", "test/left.png").then(function(result) {
  assert.equal(result.total, 10000);
  assert.equal(result.percent, 0);
  assert.equal(result.different, 0);
}).done();
