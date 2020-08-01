<template>
    <div class="content nav-container">
        <div
            v-for="route in routes"
            :key="route.name"
            class="nav-wrapper"
        >
            <router-link
                class="nav-link"
                :class="{selected: route.name === currentRouteName}"
                :to="route.path"
            >
                {{ route.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavTab',
        props: {
            routes: {
                type: Array,
                required: true
            },
            currentRouteName: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="stylus">
    .nav-container
        padding: 0 15px
        font-size: 0

        .nav-wrapper
            display: inline-block
            font-size: 18px
            padding: 0 10px

            .nav-link.selected
                box-shadow: 0 0 3px 3px #23d9be

        .nav-wrapper + .nav-wrapper
            border-left: solid black 1px
</style>
