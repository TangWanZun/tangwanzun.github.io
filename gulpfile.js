let gulp = require('gulp'),
	//加载插件
	less = require('gulp-less'), //less转css
	autoprefixer = require('gulp-autoprefixer'), //补全浏览器前缀
	uglify = require('gulp-uglify') //js压缩
	babel = require("gulp-babel"), // 用于ES6转化ES5
	connect = require("gulp-connect"); //用于服务器热更新
/**
 * 对less进行css 并补全代码
 */
gulp.task('less', function(done) {
	gulp.src('src/css/*.less')
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 20 versions']
		}))
		.pipe(gulp.dest('dist/css'))
	done();
});

/**
 * 对js进行es5转化，并压缩
 */
gulp.task('script', function(done) {
	gulp.src('src/js/*.js')
		.pipe(babel({
			"presets": ["es2015"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
	done();
})

/**
 * 用于服务器热更新
 */
gulp.task('serve', function(done) {
	connect.server({
		root: "./",
		livereload: true,
		port: 8030
	})
	done()
})

gulp.task("reload", function(done) {
	gulp.src("./*.html")
		.pipe(connect.reload());
	done();
})

//监控
gulp.task('watch', function() {
	gulp.watch('src/css/*.less', gulp.series('less'));
	gulp.watch('src/js/*.js', gulp.series('script'));
	gulp.watch('dist/**/*.*', gulp.series('reload'));
	gulp.watch('index.html', gulp.series('reload'));
});


gulp.task('default', gulp.series('serve', 'watch', function(done) {
	done();
}));
