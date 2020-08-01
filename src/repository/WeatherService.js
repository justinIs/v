import axios from 'axios'

const WeatherService = {
    // https://api.openweathermap.org/data/2.5/weather?lat=35&lon=32.2&appid=05b7168bf5dd69cf1111a44fa38edd0f
    // https://api.openweathermap.org/data/2.5/weather?lat=32&long=123&appid=05b7168bf5dd69cf1111a44fa38edd0f
    // https://api.openweathermap.org/data/2.5/weather?lat=35.21&lon=32.23232&appid=05b7168bf5dd69cf1111a44fa38edd0f
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    API_KEY: '05b7168bf5dd69cf1111a44fa38edd0f',

    /**
     * @param {Coordinates} coordinates
     * @return {Promise<AxiosResponse<any>>}
     */
    getWeather(coordinates) {
        return axios.get(
            `${this.BASE_URL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.API_KEY}`)
    }
}

export default WeatherService
