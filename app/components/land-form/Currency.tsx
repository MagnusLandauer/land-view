import APIService from "@/lib/APIService"
import { CountryData } from "@/lib/entities"
import { useQuery } from "@tanstack/react-query"
import React from "react"

interface Props {
  base_currency: string
  target_currency: string
}

const Currency = ({ base_currency, target_currency }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currency exhange rate", base_currency, target_currency],
    queryFn: () =>
      APIService.getCurrencyExchange({
        base: base_currency,
        target: target_currency,
      }),
  })

  return (
    <div>
      <p>Exchange rate</p>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong</div>}
      {data && (
        <div>
          <p>
            1 {base_currency} = {data[target_currency]} {target_currency}
          </p>
        </div>
      )}
    </div>
  )
}

export default Currency
