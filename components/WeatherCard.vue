<template>
  <div v-if="!loadingData" class="p-4 rounded-md shadow bg-white grid grid-cols-3 divide-x">
  
    <div class="col-span-2">
        <div>
            CURRENT WEATHER IN <span class="uppercase font-semibold">{{weatherData.name}}</span> 
        </div>
        <div class="flex justify-center items-end">
            <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`" height="100" width="100"/>
            <div class="text-9xl bold">
                {{Math.round(weatherData.main.temp)}}°
            </div>
            <div class="items-baseline text-2xl mb-3">
                C
            </div>
        </div>
        <div class="capitalize font-medium">
            {{weatherData.weather[0].description}}
        </div>
    </div>
    <div class="grid grid-cols-1 divide-y text-gray-700 text-sm">
        <div  class="grid grid-cols-2 ">
            <div class="place-self-center">
                Feels Like
            </div>
            <div class="place-self-center font-semibold">
                {{Math.round(weatherData.main.feels_like)}}°C
            </div>
        </div>
        <div  class="grid grid-cols-2 ">
            <div class="place-self-center">
                Min Temp.
            </div>
            <div class="place-self-center font-semibold">
                {{Math.round(weatherData.main.temp_min)}}°C
            </div>
        </div>
        <div  class="grid grid-cols-2 ">
            <div class="place-self-center">
                Max Temp.
            </div>
            <div class="place-self-center font-semibold">
                {{Math.round(weatherData.main.temp_max)}}°C
            </div>
        </div>
        <div class="grid grid-cols-2">
            <div class="place-self-center">Humidity</div>
            <div class="place-self-center font-semibold">{{weatherData.main.humidity}}%</div>
        </div>
        
    </div>
  </div>
  <div v-else class="p-4 rounded-md shadow w-1/2 mx-auto bg-white mt-4">
    <div class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    computed: {
        ...mapGetters({
            weatherData: "weather/weatherData",
            loadingData: "weather/loadingData"
        }),
    }
}
</script>

<style>

</style>