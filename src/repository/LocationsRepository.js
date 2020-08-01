import Location from 'entity/Location'
import Coordinates from "entity/Coordinates";

const rawLocations = [{
    title: 'LA',
    coordinates: {
        latitude: 64,
        longitude: 32
    }
}]

const LocationsRepository = {
    /**
     * @return {Location[]}
     */
    savedLocations() {
        const locations = []
        for (location in rawLocations) {
            const {title, coordinates} = location
            locations.push(new Location(title, new Coordinates(coordinates.latitude, coordinates.longitude)))
        }

        return locations
    }
}

export default LocationsRepository
