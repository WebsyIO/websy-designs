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
          includeRegexp: /^include\(+['"]?([^'"]+)['"]?\)*$/
        },
        src: ['**/*.js'],
        dest: 'temp/',
        cwd: 'src'
      },
      html: {
        src: [
          'index.html'
        ],
        dest: 'temp/',
        cwd: 'src/html'
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
          'dist/websy-designs-flttr.min.css': 'src/custom/flttr/flttr.less',
          'dist/websy-designs-pride.min.css': 'src/custom/pride/pride.less'
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
          'src/**/*.less'
        ]
      }
    },
    eslint: {
      target: ['src/**/*.js', 'index.js'],
      options: {
        configFile: '.eslintrc'
      }
    },
    watch: {
      clientscript: {
        files: ['src/**/*.less', 'src/**/*.js'], // which files to watch
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
        files: ['src/html/**/*.html'],
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
          port: 4000,
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
            src: ['src/helpers/basketHelper.js'],
            dest: 'dist/server/helpers/basketHelper.js'
          },														
          {
            src: ['src/helpers/pgHelper.js'],
            dest: 'dist/server/helpers/pgHelper.js'
          },
          {
            src: ['src/helpers/mySqlHelper.js'],
            dest: 'dist/server/helpers/mySqlHelper.js'
          },														
          {
            src: ['src/routing/api.js'],
            dest: 'dist/server/routes/api.js'
          },														
          {
            src: ['src/routing/auth.js'],
            dest: 'dist/server/routes/auth.js'
          },	
          {
            src: ['src/routing/shop.js'],
            dest: 'dist/server/routes/shop.js'
          },	
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
  grunt.registerTask('default', ['stylelint', 'less', 'includes', 'eslint', 'babel', 'uglify', 'copy', 'express', 'watch'])
  grunt.registerTask('build', ['stylelint', 'less', 'includes', 'eslint', 'babel', 'uglify', 'copy'])
  grunt.registerTask('buildcss', ['less'])
}
