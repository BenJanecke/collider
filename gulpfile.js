var fs = require('fs')
  , gulp = require('gulp')
  , header = require('gulp-header')
  , footer = require('gulp-footer')
  , concat = require('gulp-concat')
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

gulp.task('build', function () {
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

})

gulp.task('collide', [
  'atoms',
  'molecules',
  'organisms',
  'templates',
  'pages',
  'build'
], function (done) {
});

gulp.task('serve', serve('build'));

