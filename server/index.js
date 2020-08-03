const path = require('path')
const express = require('express')
const multer = require('multer')
const mulitpart = multer()

const morgan = require('morgan')

require('dotenv').config()

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../build/webpack.dev.config.js')

const routesFactory = require('./routes')

const app = express()
const PORT = process.env.PORT || 8080
const HTML_FILE = path.join(__dirname, '../dist/index.html')

console.log(`Starting up node server. NODE_ENV = ${process.env.NODE_ENV}`)
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'

if (IS_DEVELOPMENT) {
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    }))

    app.use(webpackHotMiddleware(compiler))
}

app.use(morgan('dev'))

app.use(express.json())

app.use(express.static('./dist'))

app.use(routesFactory.openWeatherRoutes(process.env.OW_API_KEY))

const {
    OT_API_KEY,
    OT_API_SECRET,
    OT_SESSION_ID
} = process.env
app.use(routesFactory.openTokRoutes(OT_API_KEY, OT_API_SECRET, OT_SESSION_ID))

app.get('/userInfo', (req, res) => {
    res.json({weather_key: 'asdf'})
})

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
