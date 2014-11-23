var fs = require('fs')
  , gulp = require('gulp')
  , header = require('gulp-header')
  , footer = require('gulp-footer')
  , concat = require('gulp-concat')
  , sass = require('gulp-sass')
  , del = require('del')
  , serve = require('gulp-serve');

[ 'atoms',
  'molecules',
  'organisms',
  'templates',
  'pages' ].forEach(function (typeOfMatter) {
    gulp.task(typeOfMatter, function() {
      return gulp.src('style-guide/' + typeOfMatter + '/**/*.html')
                 .pipe(concat(typeOfMatter + '.html'))
                 .pipe(gulp.dest('build/matter/'))
                 .pipe(header('<div id="<%= type %>">', { "type": typeOfMatter }))
                 .pipe(footer('</div>'))
  });
});

gulp.task('build-matter', function () {
  var head
    , foot
    , matter;

  head = fs.readFileSync(__dirname + '/style-guide/header.html', { "encoding": "utf-8" });
  foot = fs.readFileSync(__dirname + '/style-guide/footer.html', { "encoding": "utf-8" });
  matter = [ 'atoms', 'molecules', 'organisms', 'templates', 'pages' ].map(function (type) {
   return './build/matter/' + type + '.html'
  });

  gulp.src(matter)
      .pipe(concat('style-guide.html'))
      .pipe(header(head))
      .pipe(footer(foot))
      .pipe(gulp.dest('build'));

});

gulp.task('build-styles', function () {
  gulp.src('./style-guide/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./build/css'));
});

gulp.task('cleanup', function (done) {
  del('./build/matter', done);
});

gulp.task('collide', [
  'atoms',
  'molecules',
  'organisms',
  'templates',
  'pages',
  'build-matter',
  'build-styles',
  'cleanup'
], function () {
});

gulp.task('serve', serve('build'));

