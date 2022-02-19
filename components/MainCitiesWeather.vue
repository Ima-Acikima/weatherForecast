<template>
  <div>
    <vueper-slides autoplay>
        <vueper-slide v-for="(slide) in mainCitiesWeather"
            :key="slide.id"
            :title="slide.title"
            :content="slide.content"
            :style="'background-color: ' + slide.color" />
        <template #pause>
            <i class="icon pause_circle_outline"></i>
        </template>
    </vueper-slides>
  </div>
</template>

<script>
 import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import {CITIES_COORDS} from "../constants/malaysiaCitiesCoord"
export default {
    components: { VueperSlides, VueperSlide },
    data() {
        return {
            CITIES_COORDS,
            mainCities: [
                { name:"Butterworth", color: '#25e8d7', },
                { name:"Ipoh", color: "#e825b0", },
                { name:"Johor Bahru", color:"#1a9b8c", },
                { name:"Kuala Lumpur", color:"#1a9b1a", },
                { name:"Putrajaya", color: "#ed7a63", },
            ],
           slides: [
                {
                title: 'Slide #1',
                content: 'Slide content.'
                },
                 {
                title: 'Slide #2',
                content: 'Slide content.'
                },
                 {
                title: 'Slide #3',
                content: 'Slide content.'
                }
            ],
            mainCitiesWeather: []

        }
    },
    mounted() {
        this.getMainCitiesWeather()
    },
    methods: {
        getMainCitiesWeather() {
            this.mainCities.forEach((city)=> {
                const coords = this.CITIES_COORDS.find((e)=>e.city == city.name)
                this.$axios.$get(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=5f3819b22c7b564e4e62a670f1102556&units=metric`)
                .then((response)=> {
                    this.mainCitiesWeather.push({
                        title:`<span class='text-6xl font-bold text-white'>${Math.round(response.main.temp)}°C</span>`,
                        content: `<span class='text-2xl font-bold text-white'>${response.name}</span>`,
                        color: city.color })
                })

            })
        }
    }

}
</script>

<style>
.vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
}

</style>