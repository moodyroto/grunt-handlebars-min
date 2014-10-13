/*
 * handlebars-min
 * task to strip whitespace from handlebars templates before compilation.
 */

module.exports = function(grunt){
    "use strict";

    var 
        chalk = require("chalk"),
        maxmin = require("maxmin"),
        minify = require("../handlebars-min.js");

    grunt.registerMultiTask("handlebarsmin", "Minify handlebars", function(){
        var options = this.options();
 
        grunt.verbose.writeflags(options, "Options");

        this.files.forEach(function(file){
            var 
                min, max,
                dest = file.dest,
                src = file.src[0];

            if (!grunt.file.exists(src)){
                return grunt.log.warn("Source file " + chalk.cyan(filepath) + " not found.");
            }

            max = grunt.file.read(src);

            if (max.length === 0){
                grunt.log.warn("Destination " + chalk.cyan(src) + " not written because source file was empty.");
            }

            try{
                min = minify(max);
            }catch(err){
                return grunt.warn(src + "\n" + err);
            }

            if (min.length === 0){
                grunt.log.warn("Destination " + chalk.cyan(src) + " not written because there was nothing to minify.");
            }

            grunt.file.write(dest, min);
            grunt.log.writeln("File " + chalk.cyan(dest) + " created: " + maxmin(max, min, options.report === "gzip"));
        });
    });
};
