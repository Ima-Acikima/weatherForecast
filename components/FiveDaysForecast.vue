<template>
    <div v-if="Object.keys(coords).length">
        <span class="font-semibold capitalize">
            {{todayDate}} - {{nextFiveDaysDate}}
        </span>
        <div class="space-y-2 mt-2">
            <div v-for="weather in groupedData" :key="weather" class="p-4 rounded-md shadow bg-white grid grid-cols-6">
                <div class="font-semibold place-self-center">
                    {{getDateMonth(weather)}}
                </div>
                <div class="place-self-center">
                    <img :src="`http://openweathermap.org/img/wn/${getWeatherIcon(weather)}@2x.png`" />
                </div>
                <div class="place-self-center capitalize col-span-2">
                    {{getDescription(weather)}}
                </div>
                <div class="col-span-2 place-self-center text-3xl font-bold text-right">
                    {{getTemperature(weather)}}°C

                </div>
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
            coords: "weather/currentCoordinate",
            weatherData: "weather/weatherData"
        }),
        todayDate() {
            var nowDate = new Date(); 
            var date = nowDate.getDate()+' '+(this.month[nowDate.getMonth()])+' '+nowDate.getFullYear(); 
            return date;
        },
        nextFiveDaysDate() {
            var nowDate = new Date(); 
            var date = (nowDate.getDate()+4)+' '+(this.month[nowDate.getMonth()])+' '+nowDate.getFullYear(); 
            return date;
        },
        groupedData() {
            const firstDay = this.data?.list[0]
            const secondDay = this.data?.list[8]
            const thirdDay = this.data?.list[16]
            const fourthDay = this.data?.list[24]
            const fifthDay = this.data?.list[32]
            return {firstDay, secondDay, thirdDay, fourthDay, fifthDay}
        }
    },
    data() {
        return {
            data: null,
            month:["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]
        }
    },
    watch: {
        coords: {
            handler(val) {
                if(val.latitude)
                this.getWeather()
            },
            immediate: true
        }
    },
    methods: {
         async getWeather() {
            const response = await this.$axios.$get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.coords.latitude}&lon=${this.coords.longitude}&appid=5f3819b22c7b564e4e62a670f1102556&units=metric`)
            this.data = response
        },
        getDateMonth(data) {
            if(data) {

                var currDate = new Date(data.dt_txt)
                return currDate.getDate()+'/'+(currDate.getMonth()+1)
            }
            return ""
        },
        getWeatherIcon(data) {
            if(data) {
                return data.weather[0].icon
            }
            return '02n'
        },
        getDescription(data) {
            if(data) {
                return data.weather[0].description
            }
            return ""
        },
        getTemperature(data) {
            if(data) {
                return Math.round(data.main.temp)
            }
            return 0
        }
    }

}
</script>

<style>

</style>