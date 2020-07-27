<template>
    <div>
        <div class="full-width center-content">
            <TextComponent text="asdf"/>
        </div>
        <div class="full-width center-content">
            <TimerComponent title="New Timer"/>
        </div>
    </div>
</template>

<script>
    import TextComponent from "./components/TextComponent";
    import TimerComponent from "./components/Timer/TimerComponent";

    export default {
        name: "App",
        components: {
            TextComponent,
            TimerComponent
        }
    }
</script>

<style scoped>

</style>
