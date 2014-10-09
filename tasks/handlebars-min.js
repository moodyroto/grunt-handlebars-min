/*
 * handlebars-min
 * task to strip whitespace from handlebars templates before compilation.
 */

module.exports = function(grunt){
    "use strict";

    var minify = require("../handlebars-min.js");

    grunt.registerMultiTask("handlebars-min", "Minify handlebars", function(){
        var options = this.options();
 
        grunt.verbose.writeflags(options, "Options");

        this.files.forEach(function(file){
            file.src.filter(function(filepath){
                var fileName = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.lastIndexOf("."));

                // Warn on and remove invalid source files (if nonull was set).            
                if (!grunt.file.exists(filepath)){
                    grunt.log.warn("Source file '" + filepath + "' not found.");
                    return false;
                }else{

                    try{
                        grunt.file.write(file.dest + fileName + file.ext, minify(grunt.file.read(filepath)));
                    }catch(err){
                        grunt.warn(fileName + "\n" + err);
                    }

                    return true;
                }
            });
        });
    });
};
