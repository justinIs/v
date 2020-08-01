<template>
    <div class="content">
        <div class="full-width center-content">
            <TextComponent text="Fun Vue Apps" />
        </div>
        <div class="center-content full-width">
            <NavTab
                :routes="routes"
                :current-route-name="currentRouteName"
            />
        </div>
        <div class="full-width center-content">
            <RouterView />
        </div>
    </div>
</template>

<script>
    import NavTab from "components/Nav/NavTab"
    import TextComponent from "components/TextComponent"

    export default {
        name: "App",
        components: {
            NavTab,
            TextComponent
        },
        data: () => ({
            routes: [{
                name: 'Home',
                path: '/'
            }, {
                name: 'Coords',
                path: '/coords'
            }]
        }),
        computed: {
            currentRouteName() {
                return this.routes.find(route => route.path === this.$route.path).name
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
