var extname = require('path').extname
  , Metalsmith = require('metalsmith')
  , sass = require('metalsmith-sass');

/**
 * Build.
 */

Metalsmith(__dirname + '/style-guide')
.use(sass({
  "outputDir": '/public/css'
}))
.build(function(err){
  if (err) throw err;
});
