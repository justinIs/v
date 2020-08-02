export default class Location {
    /**
     * @constructor
     * @param {string} title
     * @param {Coordinates} coordinates
     */
    constructor(title, coordinates) {
        this.title = title
        this.coordinates = coordinates
        this.weather = null
    }

    /**
     * @param {Weather} weather
     */
    setWeather(weather) {
        this.weather = weather
    }
}
