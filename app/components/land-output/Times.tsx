import { CountryData, WeatherData } from "@/lib/entities"
import React, { useState, useEffect } from "react"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import APIService from "@/lib/APIService"
import { Chip, Skeleton } from "@nextui-org/react"
import { AiFillClockCircle } from "react-icons/ai"

interface TimeProps {
  weatherData: WeatherData | undefined
  isLoading: boolean
  isError: boolean
  cityName: string
}

const Times = ({ weatherData, isError, isLoading, cityName }: TimeProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    )
  }

  if (isError) {
    return <div>Something went wrong</div>
  }

  const { localtime } = weatherData?.location ?? {}
  const time = moment(localtime).format("HH:mm DD/MM/YYYY")
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl">Time in {cityName}:</h3>
      <Chip
        startContent={<AiFillClockCircle />}
        variant="faded"
        className="px-3 flex gap-2 items-center"
        radius="sm"
        color="secondary"
      >
        <p>{time}</p>
      </Chip>
    </div>
  )
}

export default Times
