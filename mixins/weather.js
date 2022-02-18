import {COUNTRIES} from "../constants/countries"
export default {
    data() {
        return {
            data: null,
            isOpen:false,
            allLocations: [
                'Kuala Lumpur',
                'Ipoh',
                'Johor Bharu'
            ],
            searching:false,
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
            console.log("getdata");
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