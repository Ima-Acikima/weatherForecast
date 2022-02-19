<template>
  <div class="bg-gray-100 h-full ">
      <Header  />
      <div class="grid grid-cols-3 gap-4 py-4 px-8">
          <div class="col-span-2">
            <WeatherCard />
            <FiveDaysForecast class="mt-8" />
          </div>
          <MainCitiesWeather />
      </div>
      

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>