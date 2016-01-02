## Intro

This plugin can be used as a build step to enable the use of local file paths in the $ref property of Swagger.io JSON files.  The resulting single JSON file can be uploaded with the AWS API Gateway import tool as part of a CI environment that makes use of standard development practices (such as keeping source files in source control).

AWS API Gateway import tool: https://github.com/awslabs/aws-apigateway-importer .

## Installation

Install package with NPM, and add it to your development dependencies:

```npm install --save-dev gulp-aws-apig-swfs```

## Usage
A sample workflow:

```.
+-- gulpfile.js
+-- build
|       +-- swagger.json
+-- src
|       +-- headers.cors.json
|       +-- index.json
|       +-- x-amz-headers.cors.json
|       +-- operations
|       |       +-- get.myitems.json
```

The following task could be used to generate a swagger.json file from multiple, reusable files--for importing as the definition for an AWS API Gateway service implementation.

```
var gulp = require('gulp'),
    path = require('path'),
	rename = require('gulp-rename'),
    swfs = require('gulp-aws-apig-swfs');
    
gulp.task('swagger', function() {
	var basePath = 'src',
		rootDocument = 'index.json';

	return gulp.src(path.join(basePath, '/**/*.json'), { base: basePath })
				.pipe(swfs(rootDocument))
				.pipe(rename('swagger.json'))
				.pipe(gulp.dest('build'));
});
```

### Example Output

```

```


## Note About AWS-Flavored Swagger

The AWS API Gateway Importer requires custom Swagger sections to perform the task of integration with the API Gateway.  See the tests folder for an example of what that looks like.

Also: https://github.com/awslabs/aws-apigateway-importer .

## LICENSE

The MIT License (MIT)

Copyright (c) 2015 The Krazy Coupon Lady

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


