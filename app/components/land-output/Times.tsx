import { WeatherData } from "@/lib/entities"
import moment from "moment"
import { Chip, Skeleton } from "@nextui-org/react"
import { AiFillClockCircle } from "react-icons/ai"

interface TimeProps {
  weatherData: WeatherData | undefined
  isLoading: boolean
  isError: boolean
  cityName: string
  time_format: "12" | "24"
}

const Times = ({
  weatherData,
  isError,
  isLoading,
  cityName,
  time_format,
}: TimeProps) => {
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
  const formatStr =
    time_format === "12" ? "hh:mma DD/MM/YYYY" : "HH:mm DD/MM/YYYY"
  const time = moment(localtime).format(formatStr)
  console.log(time_format, time)
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
