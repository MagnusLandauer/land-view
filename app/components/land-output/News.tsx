import APIService from "@/lib/APIService"
import { CountryData } from "@/lib/entities"
import { Skeleton } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import React from "react"

interface Props {
  land_name: CountryData["name"]["common"]
  land_code: CountryData["cca2"]
}

const News = ({ land_name, land_code }: Props) => {
  const {
    data: newsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", land_name],
    queryFn: () => APIService.getTopNews(land_name),
  })

  const title = `News about ${land_name}`

  if (isLoading) {
    return (
      <div className="space-y-3">
        <h3 className="text-xl mb-6">{title}</h3>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    )
  }

  if (isError || !newsData) {
    return <div>Apologies. Could not fetch news.</div>
  }

  return (
    <div>
      <h3 className="text-xl mb-6">{title}</h3>
      {newsData?.data.length === 0 ||
        (newsData.meta.returned === 0 && <div>No news found</div>)}
      <div className="flex flex-col gap-3">
        {newsData?.data?.map((article) => {
          return (
            <div key={article.title}>
              <a className="text-blue-500" href={article.url}>
                {article.title}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default News
