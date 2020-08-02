const state = () => ({
    locations: []
})

const mutations = {
    /**
     * @param {object} state
     * @param {Location} location
     */
    addLocation(state, location) {
        state.locations.push(location)
    },
    removeLocation(state, index) {
        state.locations.splice(index, 1)
    },
    /**
     * @param {object} state
     * @param {Location} location
     * @param {Weather} weather
     */
    addWeather(state, {location, weather}) {
        location.setWeather(weather)
    }
}

const actions = {
    /**
     * @param commit
     * @param {Location} location
     */
    addLocation({commit}, location) {
        commit('addLocation', location)
    },
    /**
     * @param commit
     * @param {number} index
     */
    removeLocation({commit}, index) {
        commit('removeLocation', index)
    },
    /**
     * @param commit
     * @param {Location} location
     * @param {Weather} weather
     */
    addWeather({commit}, {location, weather}) {
        commit('addWeather', {location, weather})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
