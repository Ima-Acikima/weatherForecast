<template>
  <div class="p-4 rounded-md shadow w-1/2 mx-auto bg-white">
      <!-- {{data}} -->
      <img :src="`http://openweathermap.org/img/wn/${weatherIcon}.png`" />
  </div>
</template>

<script>
import WeatherMixin from "../mixins/weather"
export default {
    mixins: [WeatherMixin],
}
</script>

<style>

</style>