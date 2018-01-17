module.exports = function (grunt) {

    // var sassStyle = 'expanded';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            // 开发环境
            development: {
                options: {
                    paths: ['less'],  // @import 加载文件的路径
                    compress: false,
                    cleancss: true,     // 压缩css文件
                    yuicompress: false
                },
                files: {
                    'style.css': 'less/style.less'  // 将path/to/source.less编译为path/to/result.css
                }
            }
            // ,
            // 线上环境
            // production: {
            //     options: {
            //         paths: ["assets/css"],  // @import 加载文件的路径
            //         cleancss: true,     // 压缩css文件
            //         modifyVars: {   // 重新定义全局变量
            //             imgPath: '"http://mycdn.com/path/to/images"',
            //             bgColor: 'red'
            //         }
            //     },
            //     files: {
            //         "path/to/result.css": "path/to/source.less"
            //     }
            // }
        },
        // sass: {
        //     output: {
        //         options: {
        //             style: sassStyle
        //         },
        //         files: {
        //             './style.css': './scss/style.scss'
        //         }
        //     }
        // },
        concat: {
            dist: {
                src: ['./src/plugin.js', './src/plugin2.js'],
                dest: './global.js',
            },
        },
        uglify: {
            compressjs: {
                files: {
                    './global.min.js': ['./global.js']
                }
            }
        },
        jshint: {
            options: {
                reporterOutput: ''
            },
            all: ['./global.js']
        },
        watch: {
            scripts: {
                files: ['./src/plugin.js', './src/plugin2.js'],
                tasks: ['concat', 'jshint', 'uglify']
            },
            // sass: {
            //     files: ['./scss/style.scss'],
            //     tasks: ['sass']
            // },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'index.html',
                    'style.css',
                    'js/global.min.js'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // grunt.registerTask('outputcss', ['sass']);
    grunt.registerTask('outputcss', ['less']);
    grunt.registerTask('concatjs', ['concat']);
    grunt.registerTask('compressjs', ['concat', 'jshint', 'uglify']);
    // grunt.registerTask('watchit', ['sass', 'concat', 'jshint', 'uglify', 'connect', 'watch']);
    grunt.registerTask('watchit', ['less', 'concat', 'jshint', 'uglify', 'connect', 'watch']);
    grunt.registerTask('default');

};