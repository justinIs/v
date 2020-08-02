<template>
    <div class="content">
        <h2>GoCoords</h2>
        <div class="center-content">
            <label for="titleInput">Title:</label>
            <input id="titleInput" v-model="titleStr" type="text" @keypress.enter="tryAddLocation">
            <label for="coordsInput">Coordinates:</label>
            <input id="coordsInput" v-model="coordsStr" type="text" @keypress.enter="tryAddLocation">
            <button @click="tryAddLocation">Add</button>
        </div>
        <div class="locations-list">
            <LocationComponent
                v-for="(location, index) in locations"
                :key="location.coordinates.toString()"
                :location="location"
                :index="index"
                @remove="removeLocation(index)"
            />
        </div>
    </div>
</template>

<script>
    import LocationComponent from 'components/GoCoords/LocationComponent'
    import Coordinates from 'entity/Coordinates'
    import Location from 'entity/Location'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState } = createNamespacedHelpers('locations')

    export default {
        name: "GoCoords",
        components: {
            LocationComponent
        },
        data: function () {
            return {
                coordsStr: '',
                titleStr: ''
            }
        },
        computed: {
            ...mapState({
                locations: state => state.locations
            })
        },
        methods: {
            tryAddLocation() {
                if (this.titleStr.length === 0) {
                    return
                }

                const coords = this.parseCoords()
                if (coords === null) {
                    return
                }

                const location = new Location(this.titleStr, coords)
                this.$store.dispatch('locations/addLocation', location)
                this.titleStr = ''
                this.coordsStr = ''
            },
            parseCoords() {
                if (this.coordsStr.length === 0) {
                    return null
                }
                const coordsArray = this.coordsStr.split(',')
                if (coordsArray.length !== 2) {
                    return null
                }
                const latitude = parseFloat(coordsArray[0].trim())
                if (Number.isNaN(latitude)) {
                    return null
                }
                const longitude = parseFloat(coordsArray[1].trim())
                if (Number.isNaN(longitude)) {
                    return null
                }

                return new Coordinates(latitude, longitude)
            },
            removeLocation(index) {
                this.$store.dispatch('locations/removeLocation', index)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .locations-list
        padding 25px
</style>
