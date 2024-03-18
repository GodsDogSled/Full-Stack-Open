import axios from "axios"
import { useEffect, useState } from "react"

export default function CountryInfo({ country }) {
  const [weatherData, setWeatherData] = useState(null)
  const [icon, setIcon] = useState()

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${import.meta.env.VITE_WEATHER}&units=metric`).then(res => {
      setWeatherData(res.data)
      console.log(weatherData.main.temp)
    })



  }, [])


  return (
    <>
      {weatherData ?
        <>
          <h1>{country.name.common}</h1>
          <p>Capital City: {country.capital[0]}</p>

          <img src={country.flags.png} ></img>

          <div>
            <h2>Weather</h2>
            <p>Termperature: {weatherData.main.temp} C</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="" />
            <p>Wind speed: {weatherData.wind.speed}</p>

          </div></>
        :
        ""
      }
    </>
  )
}