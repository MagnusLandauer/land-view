import APIService from "@/lib/APIService"
import { CountryData } from "@/lib/entities"
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { FaMoneyBillTransfer } from "react-icons/fa6"

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
    <Card className="p-3">
      <CardHeader className="text-xl flex gap-2">
        Exchange rate <FaMoneyBillTransfer className="text-secondary" />
      </CardHeader>
      <CardBody>
        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        )}
        {isError && <p>Apologies. Error getting currency exchange.</p>}
        {data && (
          <p>
            1 {base_currency} = {data[target_currency]} {target_currency}
          </p>
        )}
      </CardBody>
    </Card>
  )
}

export default Currency
