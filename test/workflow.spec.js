var assert = require('assert'),
	vfs = require('vinyl-fs'),
	through = require('through2'),
	swfs  = require('../index');

describe('gulp-aws-apig-swfs', function() {
	it('should not throw an error when all sources are provided', function(done) {
		vfs.src('./test/*.json')
			.pipe(swfs('test.index.json'))
			.on('error', assert.fail)
			.on('end', function() {
				done();
			});
	});

	it('should update array of references', function(done) {
		vfs.src('./test/*.json')
			.pipe(swfs('test.index.json'))
			.on('end', function(output) {
				var actual = JSON.parse(output.contents.toString());
				assert(actual.paths['/item/{id}'].get);
				assert(actual.paths['/item/{id}'].get.responses['200'].headers['Access-Control-Allow-Headers']);
				done() 
			});
	});

});
