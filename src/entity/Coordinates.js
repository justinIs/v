export default class Coordinates {
    constructor(lat, long) {
        this.latitude = lat
        this.longitude = long
    }

    toString() {
        return `${this.latitude},${this.longitude}`
    }
}
