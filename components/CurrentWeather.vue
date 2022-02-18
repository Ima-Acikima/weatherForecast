<template>
  <div class="bg-gray-100 h-screen">
      <div class="static p-2 border bg-black border-b shadow flex justify-between header">
          <div class="flex w-2/3 mx-auto justify-between items-center">
            <div class="flex space-x-2 items-center">
                <img src="~/assets/accuweather.svg" class="w-44"/>
                <h1 v-if="data" class="text-white ml-2">
                    {{data.name}}, {{currentCountry}} {{currentTemperatureRounded}}°<span style="font-size:0.5rem">C</span>
                </h1>
                <img :src="`http://openweathermap.org/img/wn/${weatherIcon}.png`" height="27" width="27"/>
            </div>
         
            <div class="flex items-center space-x-2">
                <div class="btn-dropdown inline-block relative">
                    <div class="flex items-center px-2 bg-white rounded rounded-md w-80" style="height:34px">
                        <div class="w-full grid grid-cols-3 divide-x">
                            <div class="col-span-2 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input @focus="searching = true" type="text" placeholder="Search" class="focus:ring-0 focus:outline-none placeholder:italic placeholder:text-slate-400 placeholder:text-xs" />
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
                    >
                            <div class="p-2 flex space-x-2 border-b sticky" @click="selectCurrentLocation()">
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
      {{data}}
      <WeatherCard  />
  </div>
</template>

<script>
import WeatherMixin from "../mixins/weather"
import {CITIES_COORDS} from "../constants/malaysiaCitiesCoord"
export default {
    mixins: [WeatherMixin],
    data() {
        return {
            cities:CITIES_COORDS
        }
    },
    methods: {
        selectCurrentLocation() {
            this.getData()
            this.searching = false
        },
        selectCity(city) {
            const params = {
                latitude:city.lat,
                longitude:city.lng
            }
            this.getWeather(params)
            this.searching = false
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
    z-index: 2;
    
}

.btn-dropdown .dropwdown-item .item:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

.city-options{
    max-height: 200px;
    overflow-y: auto;
}

</style>