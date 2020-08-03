<template>
    <div class="live-stream-container">
        <div class="center-content full-width">
            Live Streaming!
        </div>
        <div class="full-width center-content controls">
            <input v-model="username">
            <label>Publisher: <input v-model="isPublisher" type="checkbox">{{ isPublisher }}</label>
            <button :disabled="shouldDisableRegister" @click="registerToSession">Register</button>
        </div>
        <div class="videos-container center-content">
            <div ref="subscriber" class="subscriber" />
            <div ref="publisher" class="publisher" />
        </div>
    </div>
</template>

<script>
    import OT from '@opentok/client'
    import {createNamespacedHelpers} from 'vuex';

    const {mapState, mapMutations, mapActions} = createNamespacedHelpers('liveStream')

    export default {
        name: "LiveStream",
        data: () => ({
            publisher: null,
            session: null
        }),
        computed: {
            username: {
                get() {
                    return this.$store.state.liveStream.username
                },
                set(username) {
                    this.updateUsername(username)
                }
            },
            isPublisher: {
                get() {
                    return this.$store.state.liveStream.publisher
                },
                set(isPublisher) {
                    this.setPublisher(isPublisher)
                }
            },
            ...mapState({
                apiKey: state => state.ot_api_key,
                sessionId: state => state.ot_session_id,
                sessionToken: state => state.ot_session_token
            }),
            shouldDisableRegister() {
                return !(this.username && this.username.length)
            }
        },
        created() {
            this.unsubscribe = this.$store.subscribe((mutation) => {
                if (mutation.type === 'liveStream/updateOpenTokInfo') {
                    this.startOtStreams()
                }
            })
        },
        beforeDestroy() {
            this.unsubscribe()
        },
        methods: {
            ...mapMutations([
                'updateUsername',
                'setPublisher'
            ]),
            ...mapActions([
                'registerToSession'
            ]),
            startOtStreams() {
                function handleError(error) {
                    if (error) {
                        alert(error.message)
                    }
                }

                this.session = OT.initSession(this.apiKey, this.sessionId)

                this.session.on('streamCreated', event => {
                    this.session.subscribe(event.stream, this.$refs['subscriber'], {
                        insertMode: 'append',
                        width: '100%',
                        height: '100%',
                    }, handleError)
                })

                this.publisher = OT.initPublisher(this.$refs['publisher'], {
                    insertMode: 'append',
                    width: '100%',
                    height: '100%'
                }, handleError)

                this.session.connect(this.sessionToken, error => {
                    if (error) {
                        handleError(error)
                    } else {
                        this.session.publish(this.publisher, handleError)
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .live-stream-container
        width 1200px
        padding 25px

        .controls
            padding 15px

        .subscriber, .publisher
            width 250px
            height 250px
</style>
