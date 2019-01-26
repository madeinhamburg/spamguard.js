const
	package = require("./package.json"),
	gulp = require("gulp"),
	concat = require("gulp-concat"),
	replace = require("gulp-replace"),
	uglify = require("gulp-uglify");



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

gulp.task("build", gulp.parallel("js"));
