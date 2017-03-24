var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

module.exports = {

	entry: {
		"demo": [
        "app/entry.js"
      ]
	},

	output: {
		path: path.resolve(__dirname, "js"),
		filename: "bundle.js"
	},

	devtool: 'source-map',

	module: {

		rules: [

			{
				test: /\.(glsl|vs|fs|frag)$/,
				use: [{
					loader: 'shader-loader'
				}]
            },

			{
				test: /twgl\.js$/,
				use: [{
					loader: 'exports?twgl!imports?polyfills/raf, polyfills/performance'
				}]
      },

			{
				test: /twgldemo\.js$/,
				use: [{
					loader: 'exports?TWGLDemo!imports?twgl'
				}]
      },

			{
				test: /detector\.js$/,
				use: [{
					loader: 'exports?Detector'
				}]
      },

			{
				test: /rstats\.js$/,
				use: [{
					loader: 'exports?rStats'
				}]
      }
    ]

	},

	resolve: {

		modules: [
          path.resolve(__dirname, "js"),
          "node_modules"
    ],

		extensions: [".js", ".glsl", ".css"],

		alias: {
			"domready": "lib/require/domReady",
			"raf": "lib/raf",
			"twgldemo": "lib/TWGLDemo",
			"datgui": "lib/dat.gui.min",
			"twgl": "lib/twgl.min",
			"detector": "lib/Detector",
			"rstats": "lib/rStats"
		}

	},

	devServer: {
		contentBase: path.join(__dirname, '.'), // boolean | string | array, static file location
		compress: true, // enable gzip compression
		historyApiFallback: true, // true for index.html upon 404, object for multiple paths
		hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
		https: true, // true for self-signed, object for cert authority
		noInfo: true, // only errors & warns on hot reload
    port:9090
	},

	watch: false,

	plugins: [
    new UglifyJsPlugin({
			sourceMap: true,
			warnings: true
		})
  ]

}
