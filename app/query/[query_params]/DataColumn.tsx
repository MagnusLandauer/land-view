import { useState } from "react"
import { CountryData } from "@/lib/entities"
import News from "../../components/land-output/News"
import { Card, Divider, Skeleton } from "@nextui-org/react"
import CityData from "@/app/components/land-output/CityData"

interface Props {
  land: CountryData
  isLoading: boolean
}

const DataColumn = ({ land, isLoading }: Props) => {
  const land_name = land.name.common
  const [loadingImg, setLoadingImg] = useState(true)

  return (
    <div className="flex flex-col gap-8">
      <Card>
        {isLoading && (
          <div className="flex gap-6 h-20 p-4">
            <Skeleton className="rounded-lg">
              <div className="w-24 h-16 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-3 w-2/5 rounded-lg bg-default-300" />
              <Skeleton className="h-3 w-3/5 rounded-lg bg-default-200" />
              <Skeleton className="h-3 w-1/5 rounded-lg bg-default-300" />
            </div>
          </div>
        )}
        {land && (
          <div className="flex items-center gap-6 p-4">
            <div
              className={`w-16 h-16 relative ${
                loadingImg ? "hidden" : "block"
              }`}
            >
              <img
                className="max-w-full max-h-full overflow-hidden mx-auto"
                src={land.coatOfArms.svg}
                alt={`${land_name} coat of arms`}
                onLoad={() => setLoadingImg(false)}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-16 h-16 rounded-lg bg-default-300" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl">
                {land_name} {land.flag}
              </h2>
              <p className="text-sm">
                Population:{" "}
                {land.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6 flex-col gap-8">
        <CityData countryName={land_name} capital={land.capital[0]} />
      </Card>

      {/* <Card className="p-6 flex-col gap-8 grow">
        <News land_name={land_name} land_code={land.cca2} />
      </Card> */}
    </div>
  )
}

export default DataColumn
