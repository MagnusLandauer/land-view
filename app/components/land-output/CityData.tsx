"use-client"
import React, { useEffect, useState } from "react"
import Times from "./Times"
import { Autocomplete, AutocompleteItem, Divider } from "@nextui-org/react"
import Weather from "./Weather"
import { useQuery } from "@tanstack/react-query"
import APIService from "@/lib/APIService"

interface FormValues {
  city: string
  state: {
    name: string
    cities: string[]
  }
}

interface CityDataProps {
  capital: string
  countryName: string
}

const CityData = ({ capital, countryName }: CityDataProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")

  const [displayCity, setDisplayCity] = useState<FormValues["city"]>(capital)

  const {
    data: states,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["states", countryName],
    queryFn: () => APIService.getStatesByCountry(countryName),
    enabled: !!countryName,
  })

  const {
    data: cities,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["city_data", selectedState],
    queryFn: () => APIService.getCitiesByState(countryName, selectedState),
    enabled: !!selectedState && !!countryName,
  })

  const {
    data: weatherData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weather", displayCity],
    queryFn: () => APIService.getLandWeather(displayCity),
    enabled: !!displayCity,
  })

  useEffect(() => {
    if (selectedCity && selectedState) {
      setDisplayCity(selectedCity)
    }
  }, [selectedCity])

  return (
    <>
      <div className="grid gap-4">
        <h3 className="text-xl">Select region and city</h3>
        <Autocomplete
          label="Select a state"
          placeholder="Select a state"
          onSelectionChange={(id) => setSelectedState(id as string)}
        >
          {states?.map((state) => (
            <AutocompleteItem key={state.name} value={state.name}>
              {state.name}
            </AutocompleteItem>
          )) || <AutocompleteItem key="" value="Loading..." />}
        </Autocomplete>
        {selectedState && (
          <Autocomplete
            label="Select a city"
            placeholder="Select a city"
            onSelectionChange={(id) => setSelectedCity(id as string)}
          >
            {cities?.map((city) => (
              <AutocompleteItem key={city} value={city}>
                {city}
              </AutocompleteItem>
            )) || <AutocompleteItem key="" value="Loading..." />}
          </Autocomplete>
        )}
      </div>
      <Times
        weatherData={weatherData}
        isLoading={isLoading}
        isError={isError}
        cityName={displayCity}
      />
      <Divider />
      <Weather
        weatherData={weatherData}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}

export default CityData
