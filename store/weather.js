export const state = () => ({
    currentCoordinate: {},
    weatherData:{
        main: {
            temp:0
        },
        sys:{
            country: 'MY'
        },
        weather: [
            {
                icon: '02n'
            }
        ]
    },
    loadingData: true
})

export const getters = {
    currentCoordinate: (state) => state.currentCoordinate,
    weatherData: (state) => state.weatherData,
    loadingData: (state) => state.loadingData,
}

export const actions = {
    setCoordinate({commit}, payload){
        commit("SET_COORDINATE", payload)
    },
    setWeatherData({commit}, payload) {
        commit("SET_WEATHER_DATA", payload)
    },
    setLoadingData({commit}, payload) {
        commit("SET_LOADING_DATA", payload)
    }
}
  
export const mutations = {
    SET_COORDINATE(state, payload){
        state.currentCoordinate = payload
    },
    SET_WEATHER_DATA(state, payload){
        state.weatherData = payload
    },
    SET_LOADING_DATA(state, payload){
        state.loadingData = payload
    },
}