(function(exports){

  var getPixels = require("get-pixels");
  var savePixels = require("save-pixels");
  var q = require("q");

  var R = 0;
  var G = 1;
  var B = 2;
  var A = 3;

  var PINK_0 = 255;
  var PINK_1 =  75;
  var PINK_2 = 204;
  var PINK_3 = 255;

  var loadImage = function(image) {
    var defer = q.defer();

    var cb = function(err, pixels) {

      if (err) {
        return defer.reject(err);
      }

      return defer.resolve({
        width: pixels.shape[0],
        height: pixels.shape[1],
        channels: pixels.shape[2],
        data: pixels
      });
    };

    getPixels(image, cb);

    return defer.promise;
  }

  var loadImages = function(leftImageFile, rightImageFile) {
    return q.all([leftImageFile, rightImageFile].map(loadImage));
  }

  var validateImages = function(left, right) {
    var width = left.width;
    var height = left.height;
    var channels = left.channels;

    if (right.width !== width) {
      throw new Error("widths are not the same.");
    }

    if (right.height !== height) {
      throw new Error("heights are not the same.");
    }

    if (right.channels !== channels) {
      throw new Error("channels are not the same.");
    }

    return [left, right, width, height, channels];
  }

  var processImages = function(options) {
    return function(left, right, width, height, channels) {
      var total = height * width;
      var different = 0;

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var diff = false;
          channelLoop: for (var c = 0; c < channels; c++) {
            if (left.data.get(x, y, c) !== right.data.get(x, y, c)) {
              diff = true;
              break channelLoop;
            }
          }

          if (diff) {
            different++;
            left.data.set(x, y, R, PINK_0);
            left.data.set(x, y, G, PINK_1);
            left.data.set(x, y, B, PINK_2);
            left.data.set(x, y, A, PINK_3);
          } else if (options.diffOnlyImage) {
            left.data.set(x, y, R, 0);
            left.data.set(x, y, G, 0);
            left.data.set(x, y, B, 0);
            left.data.set(x, y, A, 0);
          }
        }
      }

      return {
        total: total,
        different: different,
        percent: different / total,
        resultImage: left
      };
    };
  };

  var saveImage = function(output) {
    return function(result) {
        savePixels(result.resultImage.data, "png").pipe(output);
    };
  } 

  var calculateImageDifference = function(leftImageFile, rightImageFile, options) {
    var options = options || {};
    var pipeline = loadImages(leftImageFile, rightImageFile)
      .spread(validateImages)
      .spread(processImages(options));
    if (options.output) {
      pipeline.then(saveImage(options.output))
    }
    return pipeline;
  };
  exports.calculateImageDifference = calculateImageDifference;

})(module.exports);


