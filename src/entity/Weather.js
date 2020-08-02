export default class Weather {
    constructor(rawJson) {
        this.rawJson = rawJson
    }

    summaryText() {
        if (this.rawJson.weather && this.rawJson.weather.length) {
            const weather1 = this.rawJson.weather[0]
            return weather1.main
        }

        return null
    }
}
