<template>
  <div>
    <vueper-slides autoplay>
        <vueper-slide v-for="(slide) in slides"
            :key="slide.id"
            :title="slide.title"
            :content="slide.content" />
        <template #pause>
            <i class="icon pause_circle_outline"></i>
        </template>
    </vueper-slides>
  </div>
</template>

<script>
 import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
    components: { VueperSlides, VueperSlide },
    data() {
        return {
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
            ]
        }
    },

}
</script>

<style>

</style>