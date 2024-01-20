"use client"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import DataColumn from "../../components/land-form/DataColumn"
import APIService from "@/lib/APIService"
import { LandFormData } from "@/lib/entities"
import Currency from "../../components/land-form/Currency"
import { Spinner } from "@nextui-org/react"

interface Props {
  params: { query_params: string }
}

const LandOutput = ({ params }: Props) => {
  const query_params = params.query_params.split("-")
  const query: LandFormData = {
    land1: query_params[0],
    land2: query_params[1],
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

  if (isLoading) {
    return (
      <div className="mx-auto my-52 text-center">
        <Spinner color="secondary" size="lg" />
      </div>
    )
  }

  if (isError) {
    console.log(error)
    return <div>Something went wrong</div>
  }

  if (!landData) {
    return (
      <div className="py-12 mx-auto">No land data. Start a new search!</div>
    )
  }

  const { land1, land2 } = landData
  const base_currency = Object.keys(land1.currencies)[0]
  const target_currency = Object.keys(land2.currencies)[0]

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 gap-16 md:gap-8 md:grid-cols-2">
        <DataColumn land={landData.land1} isLoading={isLoading} />
        <DataColumn land={landData.land2} isLoading={isLoading} />
      </div>
      <Currency
        base_currency={base_currency}
        target_currency={target_currency}
      />
    </div>
  )
}

export default LandOutput
