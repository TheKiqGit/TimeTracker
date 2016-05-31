var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({
	lazy: true
});

gulp.task('serve-dev', function() {
	serve(true);
});

/**
 * Helper functions
 */

function serve(isDev) {
	var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}