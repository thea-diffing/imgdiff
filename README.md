# imgdiff [![Build Status](https://travis-ci.org/VisualTesting/imgdiff.svg?branch=master)](https://travis-ci.org/VisualTesting/imgdiff)
> A pure javascript image comparison tool

Install this globally and you'll have access to the `imgdiff` command anywhere on your system.

```shell
npm install -g imgdiff
```

or use as a dependency in your js app

```shell
npm install imgdiff --save
```

Example

```
var imagediff = require('imgdiff');

imagediff.calculateImageDifference("test/left.png", "test/right.png")
  .then(function(result) {
    console.log("Total Pixels: ", result.total);
    console.log("Different Pixels", result.different);
    console.log("Percent Different", result.percent);
    console.log("Image Width", result.resultImage.width);
    console.log("Image Height", result.resultImage.height);
    console.log("Image Channels", result.resultImage.channels);
    // result.resultImage.data is a ndarray suitable for use with save-pixels
});
```

CLI
```
$ imgdiff
Usage: [original file] [new file] {--result=[output file]} {--diff-image-only}

$ imgdiff test/left.png test/right.png
{total: 10000, different: 2500, percent: 0.25}

$ imgdiff test/left.png test/right.png --result=result.png
{total: 10000, different: 2500, percent: 0.25}

$ imgdiff test/left.png test/right.png --result=result.png --diff-image-only
{total: 10000, different: 2500, percent: 0.25}

$ imgdiff test/left.png test/right.png --result=_ | hexdump -C
00000000  89 50 4e 47 0d 0a 1a 0a  00 00 00 0d 49 48 44 52  |.PNG........IHDR|
00000010  00 00 00 64 00 00 00 64  08 06 00 00 00 70 e2 95  |...d...d.....p..|
00000020  54 00 00 00 02 49 44 41  54 78 01 ec 1a 7e d2 00  |T....IDATx...~..|
00000030  00 00 f4 49 44 41 54 ed  c1 51 0d c2 00 00 c5 c0  |...IDAT..Q......|
00000040  f2 32 47 b3 81 5c 6c a0  09 90 c0 0f 4b 43 7a 77  |.2G..\l.....KCzw|
00000050  7b 7d 10 8d 11 95 11 95  11 95 11 95 11 95 11 95  |{}..............|
00000060  11 95 11 95 11 95 11 95  11 95 11 95 11 95 11 95  |................|
*
00000080  11 95 11 95 83 2b dc 9f  fc 85 c7 c9 af 8d a8 8c  |.....+..........|
00000090  a8 8c a8 8c a8 8c a8 8c  a8 8c a8 8c a8 8c a8 8c  |................|
*
000000e0  a8 8c a8 8c a8 8c a8 8c  a8 8c a8 8c a8 8c a8 1c  |................|
000000f0  5c e1 71 92 ef 8c a8 8c  a8 8c a8 8c a8 8c a8 8c  |\.q.............|
00000100  a8 8c a8 8c a8 8c a8 8c  a8 8c a8 8c a8 8c a8 8c  |................|
*
00000120  a8 8c a8 8c a8 bc 01 bf  b5 07 af 03 42 11 01 00  |............B...|
00000130  00 00 00 49 45 4e 44 ae  42 60 82                 |...IEND.B`.|
0000013b

```