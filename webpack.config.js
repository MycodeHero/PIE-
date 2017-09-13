var path = require('path')
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
		path: path.join(__dirname, 'dist'),
		publicPath: 'http://localhost:8080/dist',
		filename: 'debunce.js'		
    },
    module: {
		rules: [
			{test: /js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'}
		]
	}
}
