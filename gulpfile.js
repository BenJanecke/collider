var fs = require('fs')
  , gulp = require('gulp')
  , header = require('gulp-header')
  , footer = require('gulp-footer')
  , concat = require('gulp-concat')
  , sass = require('gulp-sass')
  , del = require('del')
  , serve = require('gulp-serve')
  , matter = [ 'Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages' ];

matter.forEach(function (typeOfMatter) {
    gulp.task(typeOfMatter, function() {
      return gulp.src('style-guide/' + typeOfMatter + '/**/*.html')
                 .pipe(header('<div class="styleguide--matter-item">'))
                 .pipe(footer('</div>'))
                 .pipe(concat(typeOfMatter + '.html'))
                 .pipe(header('<div id="<%= type %>"><h1 class="styleguide--heading"><%= type %></h1><hr/>', { "type": typeOfMatter }))
                 .pipe(footer('</div>'))
                 .pipe(gulp.dest('build/matter/'));
  });
});

gulp.task('materialize', matter, function () {
  var head
    , foot
    , matterFiles;

  head = fs.readFileSync(__dirname + '/style-guide/header.html', { "encoding": "utf-8" });
  foot = fs.readFileSync(__dirname + '/style-guide/footer.html', { "encoding": "utf-8" });
  matterFiles = matter.map(function (type) {
   return './build/matter/' + type + '.html'
  });

  return gulp.src(matterFiles)
             .pipe(concat('style-guide.html'))
             .pipe(header(head))
             .pipe(footer(foot))
             .pipe(gulp.dest('build'));

});

gulp.task('build-styles', function () {
  return gulp.src('./style-guide/**/*.scss')
             .pipe(sass())
             .pipe(gulp.dest('./build/css'));
});

gulp.task('cleanup', [ 'materialize' ], function (done) {
  del('./build/matter', done);
});

gulp.task('collide', [
  'Atoms',
  'Molecules',
  'Organisms',
  'Templates',
  'Pages',
  'materialize',
  'build-styles',
  'cleanup'
], function () {
});

gulp.task('serve', serve('build'));