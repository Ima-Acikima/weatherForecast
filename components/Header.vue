<template>
  <div class="static p-2 border bg-black border-b shadow flex justify-between header">
          <div class="flex w-2/3 mx-auto justify-between items-center">
            <div class="flex space-x-2 items-center">
                <img src="~/assets/accuweather.svg" class="w-44"/>
                <h1 v-if="weatherData" class="text-white ml-2">
                    {{weatherData.name}}, {{currentCountry}} {{Math.round(weatherData.main.temp)}}°<span style="font-size:0.5rem">C</span>
                </h1>
                <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`" height="27" width="27"/>
            </div>
         
            <div class="flex items-center space-x-2">
                <div class="btn-dropdown inline-block relative">
                    <div class="flex items-center px-2 bg-white rounded rounded-md w-80" style="height:34px">
                        <div class="w-full grid grid-cols-3 divide-x">
                            <div class="col-span-2 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input @focus="searching = true;blurSearch = false" @blur="blurSearch = true" v-model="searchText" type="text" placeholder="Search" class="focus:ring-0 focus:outline-none placeholder:italic placeholder:text-slate-400 placeholder:text-xs" />
                            </div>
                            <div @click="isOpen = !isOpen" class="flex items-center cursor-pointer space-x-2 justify-center location-btn" :class="{'open':isOpen}">
                                <div class="text-sm">Location</div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                        </div>

                    </div>
                    <div v-if="searching"
                        class="dropwdown-item right w-80 rounded-b-md shadow border text-gray-700 text-sm"
                        v-click-outside="onClickOutside"
                    >
                            <div class="p-2 flex space-x-2 border-b sticky current-location" @click="selectCurrentLocation()">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>
                                    Current Location
                                </span>
                            </div>
                            <div class="city-options">
                                <div v-for="(item, index) in cities" :key="index" class="p-2 item" @click="selectCity(item)">
                                    <span>{{item.city}}</span>
                                </div>
                            </div>
                        
                    </div>
                </div>
                <div class="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </div>
            </div>
          </div>

      </div>
</template>

<script>
import {CITIES_COORDS} from "../constants/malaysiaCitiesCoord"
import {COUNTRIES} from "../constants/countries"
import vClickOutside from 'v-click-outside'
import { mapActions, mapGetters} from "vuex"
export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    computed: {
        ...mapGetters({
            currentCoordinate: "weather/currentCoordinate",
            weatherData: "weather/weatherData"
        }),
        currentCountry() {
            const currCountry = this.COUNTRIES.find((country) => country.code == this.weatherData.sys.country)
            return currCountry.name
        },
        cities() {
            if(this.searchText) {
                const searchUC = this.searchText.toUpperCase()
                const filtered = this.CITIES_COORDS.filter((city) => city.city.toUpperCase().includes(searchUC))
                return filtered
            }else {
                return this.CITIES_COORDS
            }
        },
    },
    data() {
        return {
            CITIES_COORDS,
            COUNTRIES,
            isOpen:false,
            searching:false,
            searchText: null,
            blurSearch:false,
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        ...mapActions({
            setCoordinate: "weather/setCoordinate",
            setWeatherData: "weather/setWeatherData",
            setLoadingData: "weather/setLoadingData"
        }),
        getData() {
            navigator.geolocation.getCurrentPosition((pos)=> {
                this.setCoordinate({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
            
                this.getWeather()
            })

        },
        getWeather() {
            this.setLoadingData(true)
            this.$axios.$get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.currentCoordinate.latitude}&lon=${this.currentCoordinate.longitude}&appid=5f3819b22c7b564e4e62a670f1102556&units=metric`)
            .then((response)=> {
                this.setWeatherData(response)
                this.setLoadingData(false)
            })
        },

        selectCurrentLocation() {
            this.getData()
            this.searching = false
             this.searchText = null
        },
        selectCity(city) {
           
            this.setCoordinate({
                latitude:city.lat,
                longitude:city.lng
            })
            this.getWeather()
            this.searching = false
            this.searchText = city.city
        },
        onClickOutside() {
            if(this.blurSearch) {
                this.searching = false
            }
        }
    }
}
</script>

<style scoped>
.header{
    height:62px
}

::placeholder {
  color: rgb(148 163 184);
  font-size: 14px;
  font-style: italic;
}

.location-btn.open ~ svg{
    transition: all 0.3s ease;
    transform: rotate(180deg);
}

.btn-dropdown .dropwdown-item {
    cursor: pointer;
    background: white;
    left:0;
    position: absolute;
    white-space: nowrap;
    z-index: 10;
    
}

.btn-dropdown .dropwdown-item .item:hover,
.current-location:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

.city-options{
    max-height: 200px;
    overflow-y: auto;
}

</style>