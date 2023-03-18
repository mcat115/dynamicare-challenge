import React, { useState, useEffect } from "react"
import Header from "./Header"

const App = (props) => {
  const [currentForecast, setCurrentForecast] = useState({
    main: {},
    weather: [{}],
    wind: {},
  })
  const [pastSearches, setPastSearches] = useState([])

  const fetchWeather = async (zip) => {
    try {
      const response = await fetch(`api/v1/forecast?zip=${zip}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const weatherForecast = await response.json()
      if ("message" in weatherForecast) {
        if (
          weatherForecast.message ===
          "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
        ) {
          throw new Error(weatherForecast.message)
        }
      }
      setCurrentForecast(weatherForecast)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const fetchMap = async (zip) => {
    try {
      const response = await fetch(`api/v1/map?zip=${zip}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const map = await response.blob()
      let img = URL.createObjectURL(map)
      document.getElementById("img").setAttribute("src", img)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const fetchPastSearches = async () => {
    try {
      const response = await fetch("/past_searches")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      let searches = await response.json()
      let output = searches.map((zip) => {
        return zip.replace("\n", "")
      })
      setPastSearches(output)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const postSearch = async (zip) => {
    try {
      const response = await fetch("/past_searches/new", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zip }),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchWeather("02109")
    fetchMap("02109")
    fetchPastSearches()
  }, [])

  const onSubmission = (zip) => {
    fetchWeather(zip)
    fetchMap(zip)
    postSearch(zip)
  }

  if (currentForecast.message !== "city not found") {
    const convertKToF = (temp) => {
      return (temp - 273.15) * (9 / 5) + 31
    }

    let actualTemp = convertKToF(currentForecast.main.temp).toFixed(2)
    let feelsLike = convertKToF(currentForecast.main.feels_like).toFixed(2)

    return (
      <div>
        <Header
          onSubmission={onSubmission}
          pastSearches={pastSearches}
          fetchWeather={fetchWeather}
          fetchMap={fetchMap}
        />
        <h2>{currentForecast.name} Weather</h2>
        <p>Temperature: {actualTemp} degrees Farenheit</p>
        <p>Feels Like: {feelsLike} degrees Farenheit</p>
        <p>Sky: {currentForecast.weather[0].description}</p>
        <p>Humidity: {currentForecast.main.humidity}%</p>
        <p>Wind Speed: {currentForecast.wind.speed} mph</p>
      </div>
    )
  } else {
    return (
      <div>
        <Header
          onSubmission={onSubmission}
          pastSearches={pastSearches}
          fetchWeather={fetchWeather}
          fetchMap={fetchMap}
        />
        <h2>We're sorry, we couldn't find any weather data!</h2>
        <p>
          Make sure the zip code is comprised of 5 numeric digits, and is a
          valid location in the United States.
        </p>
      </div>
    )
  }
}

export default App
