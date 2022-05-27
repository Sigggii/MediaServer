const colorPalette = require('src/postcss/colorPalette')
const simplevars = require('postcss-simple-vars')({variables: colorPalette})
const autoprefixer = require('autoprefixer')

const config = {
	plugins: [simplevars,autoprefixer]
}

module.exports = config
