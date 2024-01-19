import {
  LandFormData,
  CountryData,
  NewsData,
  WeatherData,
  CurrencyExchangeData,
} from "./entities"

interface LandData {
  land1: CountryData
  land2: CountryData
}

interface CurrencyExchangeParams {
  base: string
  target: string
}

export class APIService {
  getLandData = async (formData: LandFormData): Promise<LandData> => {
    const { land1, land2 } = formData || {}
    if (!land1 || !land2) throw new Error("Invalid form data")
    const landData = {
      land1: {} as CountryData,
      land2: {} as CountryData,
    } as LandData

    const land1data = await this.getRestCountries(land1)
    const land2data = await this.getRestCountries(land2)

    landData["land1"] = land1data
    landData["land2"] = land2data

    return landData
  }

  getRestCountries = async (land: string): Promise<CountryData> => {
    if (!land) throw new Error("Invalid country code")
    try {
      const land_res = await fetch(
        `https://restcountries.com/v3.1/alpha/${land}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json())
      return land_res[0]
    } catch (error) {
      console.error(error)
    }
    return {} as CountryData
  }

  getLandWeather = async (location_coord: string): Promise<WeatherData> => {
    if (!location_coord) throw new Error("Invalid location coordinates")
    try {
      const weather_res = await fetch(
        `http://api.weatherstack.com/current?access_key=${
          process.env.NEXT_PUBLIC_WEATHER_API_KEY ?? ""
        }&query=${location_coord}&units=m`,
        {
          method: "GET",
        }
      ).then((res) => res.json())
      return weather_res
    } catch (error) {
      console.error(error)
    }
    return {} as WeatherData
  }

  getTopNews = async (landStr: CountryData["cca2"]): Promise<NewsData> => {
    if (!landStr) throw new Error("Cannot fetch News. Invalid country code")
    try {
      const base_url = "https://newsapi.org/v2/top-headlines"
      const api_key = process.env.NEXT_PUBLIC_NEWS_API_KEY ?? ""
      const news_res = await fetch(
        `${base_url}?country=${landStr}&pageSize=10&sortBy=popularity`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        }
      ).then((res) => res.json())
      return news_res
    } catch (error) {
      console.error(error)
    }
    return {} as NewsData
  }

  getCurrencyExchange = async ({
    base,
    target,
  }: CurrencyExchangeParams): Promise<CurrencyExchangeData> => {
    if (!base || !target) throw new Error("Invalid currency exchange params")
    try {
      const base_url = "https://api.freecurrencyapi.com/v1/latest"
      const api_key = process.env.NEXT_PUBLIC_CURRENCY_KEY ?? ""
      const currency_res = await fetch(
        `${base_url}?base_currency=${base}&currencies=${target}&apikey=${api_key}`,
        {
          method: "GET",
        }
      ).then((res) => res.json())
      return currency_res.data
    } catch (error) {
      console.error(error)
    }
    return {} as CurrencyExchangeData
  }
}

export default new APIService()
