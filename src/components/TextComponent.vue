<template>
    <h1>{{ text }}</h1>
</template>

<script>
    export default {
        name: "TextComponent",
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    h1
        color: red
</style>
