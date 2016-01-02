var through = require('through2'),
	gutil = require('gulp-util'),
	File = gutil.File;

function updateChildren(node, cache, errorHandler) {
	for (var key in node) {
		if (node[key] && typeof node[key] == 'object') {
			if (typeof node[key].push == 'undefined') {
				updateChildren(node[key], cache);
				continue;
			}
		}

		if (key != '$ref') {
			continue;
		}

		var value = [].concat(node[key]), 
			foundFileRef = false;

		for (var i = 0, length = value.length; i < length; i++) {
			var current = value[i];

			if (current.indexOf('#') == 0) {
				continue;
			}

			var cachedValue = cache[current];
			if (!cachedValue) {
				throw new Error('Missing cached value for ' + current);
			}

			for (var childKey in cachedValue) {
				node[childKey] = cachedValue[childKey];	
				foundFileRef = true;
				updateChildren(node[childKey], cache, errorHandler);
			}
		}

		if (foundFileRef) {
			delete node[key];
		}
	}
}

module.exports = function(rootFileName) {
	var rootFileName = rootFileName || 'index.json',
		rootFile = null,
		cache = {};

	function cacheFiles(file, enc, cb) {
		if (file.relative == rootFileName) {
			rootFile = file;
		}
		cache[file.relative] = JSON.parse(file.contents.toString());
		cb();
	}

	function finalize(cb) {
		try {
			updateChildren(cache[rootFileName], cache);
		}
		catch (error) {
			this.emit('error', error);
			throw new PluginError('gulp-aws-apig-swfs', error, {showStack:true});
		}
		var outputFile = new File(rootFile);
		outputFile.contents = new Buffer(JSON.stringify(cache[rootFileName], null, '  '));
		this.push(outputFile);
		this.emit('end', outputFile);
		cb();
	}
	
	return through.obj(cacheFiles, finalize);
};

