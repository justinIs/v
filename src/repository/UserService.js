import axios from 'axios'

export default {
    async getOpenTokInfo(username) {
        try {
            const response = await axios.get(`openTokInfo?username=${username}`)

            if (response.status !== 200) {
                console.log('Unexpected response', response)
                return null
            }

            return response.data
        } catch (e) {
            console.log('Could not get OpenTok info', e)
            return null
        }
    },
    async generateOpenTokToken(username, role = 'subscriber') {
        try {
            const response = await axios.post('generateOpenTokToken', {
                username,
                role
            })
            if (response.status !== 200) {
                console.log('Unexpected response', response)
                return null
            }

            return response.data
        } catch (e) {
            console.log('Could not create OpenTok token', e)
            return null
        }
    }
}
