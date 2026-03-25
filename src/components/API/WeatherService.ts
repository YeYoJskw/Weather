import axios from 'axios';

export default class WeatherService {
  static async getWeather(city: string) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    return response;
  }
}
