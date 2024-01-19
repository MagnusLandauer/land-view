import APIService from "@/lib/APIService"
import { CountryData } from "@/lib/entities"
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
    queryKey: ["news", land_code],
    queryFn: () => APIService.getTopNews(land_code),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !newsData) {
    return <div>Something went wrong</div>
  }

  return (
    <div>
      <p>Popular news from {land_name}</p>
      {newsData?.totalResults === 0 && <div>No news found</div>}
      {newsData?.articles?.map((article) => {
        return (
          <div key={article.title}>
            <a className="text-blue-500" href={article.url}>
              {article.title}
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default News
