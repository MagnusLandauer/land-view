import React from "react"
import Times from "./Times"
import { CountryData } from "@/lib/entities"
import Weather from "./Weather"
import News from "./News"

interface Props {
  land: CountryData
  isLoading: boolean
}

const DataColumn = ({ land, isLoading }: Props) => {
  const land_name = land.name.common
  const land_coords = land.capitalInfo.latlng
  return (
    <div>
      <h2 className="text-xl">
        {land_name} {land.flag}
      </h2>
      <div className="flex items-center w-16 h-16">
        <img
          className="max-w-full max-h-full"
          src={land.coatOfArms.svg}
          alt={`${land_name} coat of arms`}
        />
      </div>

      <Times coordinates={land_coords} city_name={land.capital[0]} />
      <Weather coordinates={land_coords} />
      <News land_name={land_name} land_code={land.cca2} />
    </div>
  )
}

export default DataColumn
