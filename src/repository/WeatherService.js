import axios from 'axios'
import Weather from 'entity/Weather'

const WeatherService = {
    /**
     * @param {Coordinates} coordinates
     * @return {Promise<AxiosResponse<any>>}
     */
    async getWeather(coordinates) {
        try {
            const response = await axios.get(
                `weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`)

            if (response.status !== 200) {
                return null
            }

            return new Weather(response.data.weather)
        } catch (e) {
            console.log('Could not complete getWeather request', e)
            return null
        }
    }
}

export default WeatherService
