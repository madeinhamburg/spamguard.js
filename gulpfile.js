const
	package = require("./package.json"),
	fs = require("fs"),
	gulp = require("gulp"),
	concat = require("gulp-concat"),
	replace = require("gulp-replace"),
	uglify = require("gulp-uglify");


gulp.task("version", function(cb) {
	fs.readFile("bower.json", "utf8", function(err, content) {
		if (err) throw err;
		var regex = /(\"version\": \")([0-9a-z_\-\.]+)(\",)/i;
		fs.writeFile("bower.json", content.replace(regex, "$1" + package.version + "$3"), "utf8", function() {});
	});

	cb();
});


gulp.task("js", function() {
	return gulp
		.src("./src/spamguard.js")
		.pipe(replace(/\@version/g, package.version))
		.pipe(replace(/\@homepage/g, package.homepage))
		.pipe(uglify({
			output: {
				comments: "/^!/"
			}
		}))
		.pipe(concat("jquery.spamguard.js"))
		.pipe(gulp.dest("./dist/"));
});


gulp.task("watch", function() {
	gulp.watch("./src/spamguard.js", gulp.parallel("js"));
});

gulp.task("build", gulp.parallel("js", "version"));
