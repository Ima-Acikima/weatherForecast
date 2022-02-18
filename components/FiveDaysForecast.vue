<template>
    <div class="w-1/2 mx-auto mt-4 ">
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
             <!-- <div class="p-4 rounded-md shadow bg-white grid-grid-cols-6">
                {{getDateMonth(groupedData.secondDay)}}
            </div>
             <div class="p-4 rounded-md shadow bg-white grid-grid-cols-6">
                {{getDateMonth(groupedData.thirdDay)}}
            </div>
             <div class="p-4 rounded-md shadow bg-white grid-grid-cols-6">
                {{getDateMonth(groupedData.fourthDay)}}
            </div>
             <div class="p-4 rounded-md shadow bg-white grid-grid-cols-6">
                {{getDateMonth(groupedData.fifthDay)}}
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        coords: Object
    },
    computed: {
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
    mounted() {
        this.getWeather()
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