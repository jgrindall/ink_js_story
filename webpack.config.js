const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	entry: './public/src/index.ts',
	plugins: [
		new VueLoaderPlugin()
	],
	mode: "development",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader',
				]
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: "file-loader"
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
				},
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					esModule: false,
				}
			}
		]
	},
	resolve: {
		extensions: [
			'.tsx',
			'.ts',
			'.js',
			'.vue'
		],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/dist'),
	}
};


