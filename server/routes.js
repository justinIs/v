const express = require('express')
const axios = require('axios')

module.exports = function (OW_API_KEY) {
    const router = express.Router()

    const OW_BASE_URL = 'https://api.openweathermap.org/data/2.5'

    router.get('/weather', async (req, res) => {
        const {lat, lon} = req.query
        if (lat == null || lon == null) {
            res.status(400)
            res.json({
                message: 'Missing query params'
            })
            return
        }

        try {
            const owResponse = await axios.get(`${OW_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OW_API_KEY}`)

            if (owResponse.status === 200) {
                console.log('success OpenWeather!', owResponse)
            }

            res.status(200)
            res.json({
                message: 'Successfully completed OpenWeather request',
                weather: owResponse.data
            })
        } catch (e) {
            console.error(`Could not make OpenWeather request`, e)

            res.status(400)
            res.json({
                message: 'Could not complete OpenWeather request'
            })
        }


    })

    return router
}
