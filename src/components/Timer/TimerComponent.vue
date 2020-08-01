<template>
    <div class="timer-container">
        <h3 class="timer-title">
            {{ title }}
        </h3>
        <button @click.prevent="actionClick">
            {{ buttonTitle }}
        </button>
        <div>
            {{ time }}
        </div>
    </div>
</template>

<script>
    function formatDuration(durationMs) {
        durationMs = Math.round(durationMs / 1000)

        const min = Math.floor(durationMs / 60)
        let sec = (durationMs % 60).toString()
        if (sec.length === 1) {
            sec = `0${sec}`
        }

        return `${min}:${sec}`
    }

    export default {
        name: "TextComponent",
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data: function() {
            return {
                timerCount: 0,
                running: false,
                startTime: 0,
                currentTime: 0
            }
        },
        computed: {
            time() {
                let duration = 0
                if (this.currentTime > this.startTime) {
                    duration = this.currentTime - this.startTime
                }

                return formatDuration(duration)
            },
            buttonTitle() {
                return this.running ? 'Stop' : 'Start'
            }
        },
        methods: {
            actionClick() {
                if (!this.running) {
                    this.running = true
                    this.startTime = new Date()
                    this.timerCount++
                    this.startTimer(this.timerCount)
                } else {
                    this.running = false
                }
            },
            startTimer(timerCount) {
                setTimeout(() => {
                    if (this.running && timerCount === this.timerCount) {
                        this.currentTime = new Date()
                        this.startTimer(timerCount)
                    }
                }, 1000)
            }
        }
    }

</script>

<style scoped>

</style>
