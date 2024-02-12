import { WeatherData } from "@/lib/entities"
import { Chip, Skeleton } from "@nextui-org/react"
import Image from "next/image"
import { FaTemperatureEmpty } from "react-icons/fa6"
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"

interface WeatherProps {
  weatherData: WeatherData | undefined
  isLoading: boolean
  isError: boolean
  tempUnit: "C" | "F"
}

const Weather = ({
  weatherData,
  isError,
  isLoading,
  tempUnit,
}: WeatherProps) => {
  if (isLoading) {
    return (
      <>
        <div className="flex gap-6 h-20">
          <Skeleton className="rounded-lg">
            <div className="w-24 h-16 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-3 w-2/5 rounded-lg bg-default-300" />
            <Skeleton className="h-3 w-3/5 rounded-lg bg-default-200" />
            <Skeleton className="h-3 w-1/5 rounded-lg bg-default-300" />
          </div>
        </div>
        <Skeleton className="h-3 w-3/5 rounded-lg bg-default-200" />
      </>
    )
  }

  if (isError || !weatherData) {
    return <div>Something went wrong</div>
  }

  const { temperature, feelslike, weather_descriptions, weather_icons } =
    weatherData.current ?? {}
  return (
    <div>
      <h3 className="text-xl mb-6">Weather</h3>
      <div className="flex gap-6">
        <div className="w-16 h-16 relative">
          <Image
            src={weather_icons[0]}
            alt={`${weather_descriptions[0]} icon`}
            objectFit="contain"
            fill
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>{weather_descriptions[0]}</p>
          <Chip
            startContent={<FaTemperatureEmpty />}
            endContent={
              tempUnit === "C" ? (
                <TbTemperatureCelsius />
              ) : (
                <TbTemperatureFahrenheit />
              )
            }
            variant="faded"
            color="secondary"
            radius="sm"
            className="px-3 flex gap-2 items-center"
          >
            <p>{temperature}</p>
          </Chip>
        </div>
      </div>
      <p className="mt-4">
        Feels like {feelslike}°{tempUnit.toLocaleLowerCase()}
      </p>
    </div>
  )
}

export default Weather
