var UglifyJsPlugin = require('uglify-js-plugin');

module.exports = {

    entry: {
    	"demo": ["app/entry.js"]
    },

    output: {
    	path: "js",
        filename: "bundle.js"
    },

    devtool: 'source-map',

    module: {
    	
        loaders: [
        	{ test: /\.(glsl|vs|fs|frag)$/, loader: 'shader' },
            { test: /gui\.js$/, loader: 'exports?GUI' },
            { test: /twgl\.js$/, loader: 'exports?twgl!imports?polyfills/raf,polyfills/performance' },
            { test: /twgldemo\.js$/, loader: 'exports?TWGLDemo!imports?twgl' },
            { test: /detector\.js$/, loader: 'exports?Detector' },
            { test: /rstats\.js$/, loader: 'exports?rStats' }
        ]
    },

    resolve: {
        
        modulesDirectories: [ "js","node_modules"],

        alias: {
        	
        	"domready": "lib/require/domReady",
        	
	        "raf": "lib/raf",
	        
	        "twgldemo": "lib/TWGLDemo",
	        "twgl": "lib/twgl.min",

            "gui": "lib/dat.gui.min",

	        "detector" : "lib/Detector",
	        "rstats" : "lib/rStats"
        }
    },

    watch: false,

    plugins: [
        new UglifyJsPlugin({
            compress: true, 
            debug: true 
        })
    ]
}

