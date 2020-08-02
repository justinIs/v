<template>
    <div class="location-container">
        <div class="header">
            <div class="title">
                {{ location.title }}
            </div>
            <button @click="$emit('remove')">Remove</button>
        </div>
        <div class="body">
            <div v-if="location.weather !== null">
                {{ location.weather }}
            </div>
            <div v-else>
                Loading weather...
            </div>
        </div>
        <div class="coords-container">
            <span class="latitude">{{ location.coordinates.latitude }}</span>
            <span class="longitude">{{ location.coordinates.longitude }}</span>
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
            await this.$store.dispatch('locations/addWeather', {location: this.location, weather})
        }
    }
</script>

<style lang="stylus" scoped>
    .location-container
        padding = 10px
        borderColor = #eee

        width 600px
        margin 25px 0 25px
        border 1px solid borderColor

        .header
            display flex
            padding padding
            margin-bottom 15px
            border 1px solid borderColor

            .title
                font-weight bold
                flex-grow 1
        .body
            padding padding

        .coords-container
            margin 0 15px

            .latitude
                margin-right 2px

                &:after
                    content ','
</style>
