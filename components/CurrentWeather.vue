<template>
  <div>
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
                <div class="flex items-center px-2 bg-white rounded rounded-md w-80" style="height:34px">
                    <div class="w-full grid grid-cols-3 divide-x">
                        <div class="col-span-2 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search" class="focus:ring-0 focus:outline-none placeholder:italic placeholder:text-slate-400 placeholder:text-xs" />
                        </div>
                        <div @click="isOpen = !isOpen" class="flex items-center cursor-pointer space-x-2 justify-center location-btn" :class="{'open':isOpen}">
                            <div class="text-sm">Location</div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 9l-7 7-7-7" />
                            </svg>
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
  </div>
</template>

<script>
import {COUNTRIES} from "../constants/countries"
export default {
    data() {
        return {
            data: null,
            isOpen:false,
            COUNTRIES
        }
    },
    computed: {
        currentTemperatureRounded() {
            return this.data ? Math.round(this.data.main.temp) : null
        },
        currentCountry() {
            if(this.data) {
                const currCountry = this.COUNTRIES.find((country) => country.code == this.data.sys.country)
                return currCountry.name
            }
            return 'Malaysia'
        },
        weatherIcon() {
            return this.data?.weather[0].icon ?? '02n'
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            navigator.geolocation.getCurrentPosition((pos)=> {
                var crd = pos.coords;

                this.getWeather(crd)
            })

        },
        async getWeather(coords) {
            const response = await this.$axios.$get(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=5f3819b22c7b564e4e62a670f1102556&units=metric`)
            this.data = response
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

</style>