import { CountryData } from "@/lib/entities"
import React, { useState, useEffect } from "react"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import APIService from "@/lib/APIService"

interface Props {
  coordinates: CountryData["capitalInfo"]["latlng"]
  city_name: string
}

const Times = ({ coordinates, city_name }: Props) => {
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

  if (isError) {
    return <div>Something went wrong</div>
  }

  const { localtime } = weatherData?.location ?? {}
  const time = moment(localtime).format("HH:mm DD/MM/YYYY")
  return (
    <div>
      <p>Time in {city_name}</p>
      <p>{time}</p>
    </div>
  )
}

export default Times
