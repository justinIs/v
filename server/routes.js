const express = require('express')
const axios = require('axios')
const OpenTok = require('opentok')

module.exports = {
    openWeatherRoutes(OW_API_KEY) {
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
    },
    openTokRoutes(OT_API_KEY, OT_API_SECRET, OT_SESSION_ID) {
        const router = express.Router()
        const openTok = new OpenTok(OT_API_KEY, OT_API_SECRET)
        const sessionInfo = {
            sessionId: OT_SESSION_ID, // TODO: make dynamic
            sessionTokens: []
        }

        router.get('/openTokInfo', async (req, res) => {
            const { username } = req.query
            console.log(`\tusername: ${username}`)
            if (!username) {
                res.status(400)
                res.json({
                    message: 'Missing username'
                })
                return
            }

            const userSessionToken = sessionInfo.sessionTokens.find(sessionToken => sessionToken.username === username)
            if (!userSessionToken) {
                res.status(404)
                res.json({
                    message: 'No session token for user'
                })
                return
            }

            res.status(200)

            const response = {
                api_key: OT_API_KEY,
                session_id: sessionInfo.sessionId,
                session_token: userSessionToken.token
            };
            res.json(response)
        })

        router.post('/generateOpenTokToken', async (req, res) => {
            const { username, role } = req.body
            console.log(`\treceived request: ${JSON.stringify(req.body)}`)
            if (!username) {
                res.status(400)
                res.json({
                    message: 'Missing username'
                })
                return
            }
            if (!role || !['subscriber', 'publisher'].includes(role)) {
                res.status(400)
                res.json({
                    message: 'Missing or invalid role'
                })
                return
            }

            const tokenOptions = {
                role,
                data: `username=${username}`
            }
            const token = openTok.generateToken(sessionInfo.sessionId, tokenOptions)

            sessionInfo.sessionTokens.push({
                username,
                token
            })

            res.status(200)
            res.json({
                api_key: OT_API_KEY,
                session_id: sessionInfo.sessionId,
                session_token: token
            })
        })

        return router
    }
}
