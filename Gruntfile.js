module.exports = function (grunt) {
  grunt.initConfig({
    import_js: {
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'temp/',
        ext: '.js'
      }
    },
    includes: {
      js: {
        options: {
          includeRegexp: /include\(+['"]?([^'"]+)['"]?\)*$/
        },
        src: ['**/*.js'],
        dest: 'temp/',
        cwd: 'src'
      },
      docsjs: {
        options: {
          includeRegexp: /include\(+['"]?([^'"]+)['"]?\)*$/
        },
        src: ['**/main.js'],
        dest: 'docstemp/',
        cwd: 'documentation'
      },
      html: {
        src: [
          'index.html',          
        ],
        dest: 'temp/',
        cwd: 'src/html'
      },
      docshtml: {
        src: [
          'index.html',          
        ],
        dest: 'docstemp/v1',
        cwd: 'documentation/v1/html'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'dist/websy-designs.min.css': 'src/websy-designs.less',
          'public/v1/resources/app.min.css': 'documentation/v1/less.main.less'
        }
      }
    },
    stylelint: {
      simple: {
        options: {
          configFile: '.stylelintrc',
          failOnError: true,
          syntax: 'less'
        },
        src: [
          'src/**/*.less',
          'documentation/**/*.less'
        ]
      }
    },
    eslint: {
      target: ['src/**/*.js', 'documentation/**/*.js', 'index.js'],
      options: {
        configFile: '.eslintrc'
      }
    },
    watch: {
      clientscript: {
        files: ['src/**/*.less', 'src/**/*.js', 'documentation/**/*.less', 'documentation/**/*.js'], // which files to watch
        tasks: ['includes', 'eslint', 'babel', 'stylelint', 'less', 'uglify', 'copy'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      serverscript: {
        files: ['server/**/*.js', 'index.js'], // which files to watch
        tasks: ['includes', 'eslint', 'express'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      views: {
        files: ['src/html/**/*.html', 'documentation/**/*.html'],
        tasks: ['includes', 'minifyHtml'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },
    express: {
      prod: {
        options: {
          port: 9000,
          script: 'index.js'
        }
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-object-assign', '@babel/plugin-transform-async-to-generator']  		
      },						
      dist: {
        files: [
          {
            'dist/websy-designs.js': 'temp/main.js'
          },
          {
            'docstemp/v1/js/app.js': 'docstemp/v1/js/main.js'
          }
        ]
      }
    },
    uglify: {
      options: {
        beautify: false,
        mangle: true,
        compress: true
      },
      build: {
        files: [
          {
            'dist/websy-designs.min.js': ['dist/websy-designs.js']
          },
          {
            'public/v1/resources/app.min.js': ['docstemp/v1/js/app.js']
          }
        ]
      }
    },
    minifyHtml: {
  		options: {
  			cdata: true
  		},
  		dist: {
  			files: [
          {
            'public/v1/index.html': 'docstemp/v1/index.html'
  			  }
        ]
  		}
  	},
    copy: {
      main: {
        files: [
          {
            src: ['temp/main.js'],
            dest: 'dist/websy-designs.debug.js'
          },
          {
            src: ['temp/main.js'],
            dest: 'public/v1/resources/websy-designs.debug.js'
          },
          {
            src: ['src/websy-designs-server.js'],
            dest: 'dist/server/websy-designs-server.js'
          },
          {
            src: ['src/utils.js'],
            dest: 'dist/server/utils.js'
          },          
          {
            expand: true,
            cwd: 'src/helpers',
            src: '**/*', 
            dest: 'dist/server/helpers'
          },
          {
            expand: true,
            cwd: 'src/routes',
            src: '**/*', 
            dest: 'dist/server/routes'
          },
          {
            cwd: 'src/fonts',  
            src: '**/*',       
            dest: 'dist/fonts',
            expand: true       
          },
          {
            src: ['dist/websy-designs.min.js'],
            dest: 'public/v1/resources/websy-designs.min.js'
          },  
          {
            src: ['dist/websy-designs.min.css'],
            dest: 'public/v1/resources/websy-designs.min.css'
          }      
        ]
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-import-js')
  grunt.loadNpmTasks('grunt-includes')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-minify-html')
  grunt.loadNpmTasks('grunt-express-server')
  grunt.loadNpmTasks('grunt-stylelint')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.registerTask('default', ['stylelint', 'less', 'includes', 'eslint', 'minifyHtml', 'babel', 'uglify', 'copy', 'express', 'watch'])
  grunt.registerTask('build', ['stylelint', 'less', 'includes', 'eslint', 'minifyHtml', 'babel', 'uglify', 'copy'])
  grunt.registerTask('buildcss', ['less'])
}
