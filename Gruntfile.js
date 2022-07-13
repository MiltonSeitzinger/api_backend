module.exports = function(grunt) {
    grunt.initConfig({
			/* Configure  jshint para comprobar la sintaxis de los archivos */
			jshint: {
				files: ['network/*.js','components/users/*.js','components/posts/*.js', 'services/*.js', 'tests/*.js', 'db.js', 'server.js'],
				options: {
					globals: {
						jQuery: true
					}
				}
			},
      // Configure a mocha-test para realizar el test correspondiente
      mochaTest : {
        test : {
          options : {
            reporter : 'spec',
            timeout : 5000,
            quiet : false 
          },
          src : ["tests/post.test.js"]
        }
      }
    });
		grunt.loadNpmTasks('grunt-contrib-jshint')
		grunt.loadNpmTasks('grunt-mocha-test')
    grunt.registerTask('automatic', ['mochaTest', 'jshint']);
    //grunt.registerTask('automatic', ['jshint']);
};