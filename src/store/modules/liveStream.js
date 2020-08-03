import UserService from 'repository/UserService';

const state = () => ({
    ot_api_key: null,
    ot_session_id: null,
    ot_session_token: null,
    username: null,
    publish: false
})

const mutations = {
    updateUsername(state, username) {
        state.username = username
    },
    setPublisher(state, isPublisher) {
        state.publish = isPublisher
    },
    updateOpenTokInfo(state, {api_key, session_id, session_token}) {
        state.ot_api_key = api_key
        state.ot_session_id = session_id
        state.ot_session_token = session_token
    }
}

const actions = {
    async registerToSession({commit, state}) {
        let openTokInfo = await UserService.getOpenTokInfo(state.username)
        if (openTokInfo && openTokInfo.api_key && openTokInfo.session_id && openTokInfo.session_token) {
            commit('updateOpenTokInfo', openTokInfo)
            return
        }

        const role = state.publish ? 'publisher' : 'subscriber'
        openTokInfo = await UserService.generateOpenTokToken(state.username, role)
        if (openTokInfo == null || !(openTokInfo.api_key && openTokInfo.session_id && openTokInfo.session_token)) {
            console.error('Unable to get OpenTok token')
            return
        }

        commit('updateOpenTokInfo', openTokInfo)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
