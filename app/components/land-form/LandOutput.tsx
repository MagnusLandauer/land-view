"use client"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import DataColumn from "./DataColumn"
import APIService from "@/lib/APIService"
import { LandFormData } from "@/lib/entities"
import Currency from "./Currency"

const LandOutput = () => {
  const url_params = new URLSearchParams(window.location.search)
  const query_params = Object.fromEntries(url_params.entries())

  const {
    data: landData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["query"],
    queryFn: () =>
      APIService.getLandData({
        land1: query_params.land1,
        land2: query_params.land2,
      } as LandFormData),
  })

  if (!landData) {
    return <div>No land data. Start a new search!</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    console.log(error)
    return <div>Something went wrong</div>
  }

  const { land1, land2 } = landData
  const base_currency = Object.keys(land1.currencies)[0]
  const target_currency = Object.keys(land2.currencies)[0]

  return (
    <div className="flex gap-8">
      <DataColumn land={landData.land1} isLoading={isLoading} />
      <DataColumn land={landData.land2} isLoading={isLoading} />
      <Currency
        base_currency={base_currency}
        target_currency={target_currency}
      />
    </div>
  )
}

export default LandOutput
