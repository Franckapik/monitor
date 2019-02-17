module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // configuration des tâches grunt


    watch: {
           files: 'public/stylesheets/*.css',
           tasks: ['styles']
       },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'public/stylesheets/*.css',
            'views/*.ejs'
          ]
        },
        options: {
          watchTask: true,
          proxy: 'localhost:3000'
        }
      }
    }

  });

  //Les taches dépendantes sont chargées ici
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');


  // Les tâches sont enregistrées ici
  grunt.registerTask('default', ['browserSync', 'watch']);
};
