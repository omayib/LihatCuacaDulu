
import axios from 'axios';
//http://api.openweathermap.org/data/2.5/weather?q=sleman&appid=d714508e67bb45e1804ab1e7d534e7c3
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
class WeatherService {
        url = 'https://api.openweathermap.org/data/2.5/';
        key = 'd714508e67bb45e1804ab1e7d534e7c3';
        city = 'Sleman';
        
    getData(){
        return axios(`${this.url}weather?q=${this.city}&appid=${this.key}&units=metric`,{method:"GET"})
    }

    getDataForecast(){
        return axios(`${this.url}forecast?q=${this.city}&appid=${this.key}&units=metric`,{method:"GET"})
    }
}

export default WeatherService
