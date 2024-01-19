import APIService from "@/lib/APIService"
import { CountryData } from "@/lib/entities"
import { useQuery } from "@tanstack/react-query"
import React from "react"

interface WeatherProps {
  coordinates: CountryData["capitalInfo"]["latlng"]
}

const Weather = ({ coordinates }: WeatherProps) => {
  const {
    data: weatherData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weather", coordinates],
    queryFn: () => APIService.getLandWeather(coordinates.join(",")),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !weatherData) {
    return <div>Something went wrong</div>
  }

  const { temperature, feelslike, weather_descriptions, weather_icons } =
    weatherData.current ?? {}
  return (
    <div>
      <h3>Weather</h3>
      <p>{weather_descriptions[0]}</p>
      <p>
        {temperature}°c{" "}
        <img src={weather_icons[0]} alt={`${weather_descriptions[0]} icon`} />
      </p>
      <p>Feels like {feelslike}°c</p>
    </div>
  )
}

export default Weather
