"use client"
import LoadingPageSpinner from "@/app/components/LoadingPageSpinner"
import APIService from "@/lib/APIService"
import { LandFormData } from "@/lib/entities"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import DataColumn from "./DataColumn"
import Currency from "@/app/components/land-output/Currency"

interface Props {
  queryString: string
}

const Output = ({ queryString }: Props) => {
  const query_arr = queryString.split("-")
  const query: LandFormData = {
    land1: query_arr[0],
    land2: query_arr[1],
  }
  const {
    data: landData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["query"],
    queryFn: () => APIService.getLandData(query as LandFormData),
  })

  if (isLoading) return <LoadingPageSpinner />

  if (isError) throw new Error(error.message)

  if (!landData) {
    return (
      <div className="py-12 mx-auto">No land data. Start a new search!</div>
    )
  }

  const { land1, land2 } = landData
  const base_currency = Object.keys(land1.currencies)[0]
  const target_currency = Object.keys(land2.currencies)[0]
  return (
    <>
      <div className="grid grid-cols-1 gap-16 md:gap-8 md:grid-cols-2">
        <DataColumn land={landData.land1} isLoading={isLoading} />
        <DataColumn land={landData.land2} isLoading={isLoading} />
        <Currency
          base_currency={base_currency}
          target_currency={target_currency}
        />
      </div>
    </>
  )
}

export default Output
