import axios from 'axios'
import Weather from 'entity/Weather'

const WeatherService = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    API_KEY: '05b7168bf5dd69cf1111a44fa38edd0f',

    /**
     * @param {Coordinates} coordinates
     * @return {Promise<AxiosResponse<any>>}
     */
    async getWeather(coordinates) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.API_KEY}`)

            if (response.status !== 200) {
                return null
            }

            return new Weather(response.data)
        } catch (e) {
            console.log('Could not complete getWeather request', e)
            return null
        }
    }
}

export default WeatherService
