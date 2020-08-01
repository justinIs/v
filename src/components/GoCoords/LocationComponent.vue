<template>
    <div class="full-width center-content location-container">
        <div>
            {{ location.title }}
        </div>
        <div class="coords-container">
            <span class="latitude">{{ location.coordinates.latitude }}</span>
            <span class="longitude">{{ location.coordinates.longitude }}</span>
        </div>
        <div>
            <button @click="$emit('remove')">Remove</button>
        </div>
    </div>
</template>

<script>
    import Location from 'entity/Location';
    import WeatherService from 'repository/WeatherService';

    export default {
        name: "LocationComponent",
        props: {
            location: {
                type: Location,
                required: true
            }
        },
        async created() {
            const weather = await WeatherService.getWeather(this.location.coordinates)
            console.log('Got weather', weather)
        }
    }
</script>

<style lang="stylus" scoped>
    .location-container
        margin 25px 0
        padding 25px
        border 1px solid #eee

        .coords-container
            margin 0 15px

            .latitude
                margin-right 2px

                &:after
                    content ','
</style>
