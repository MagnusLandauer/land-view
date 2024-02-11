import {
  LandFormData,
  CountryData,
  NewsData,
  WeatherData,
  CurrencyExchangeData,
  User,
  Comparison,
} from "./entities"

import MockData from "./MockData.json"

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

  getLandWeather = async ({
    query,
    options,
  }: {
    query: string
    options?: { temp_unit: string }
  }): Promise<WeatherData> => {
    if (!query) throw new Error("Invalid weather query")
    const temp_unit = options?.temp_unit === "F" ? "f" : "m"
    try {
      const weather_res = await fetch(
        `https://api.weatherstack.com/current?access_key=${
          process.env.NEXT_PUBLIC_WEATHER_API_KEY ?? ""
        }&query=${query}&units=${temp_unit}`,
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

  getTopNews = async (landStr: string): Promise<NewsData> => {
    if (!landStr) throw new Error("Cannot fetch News. Invalid country code")
    try {
      const base_url = "https://api.thenewsapi.com/v1/news/top"
      const api_key = process.env.NEXT_PUBLIC_NEWS_API_KEY ?? ""
      const news_res = await fetch(
        `${base_url}?api_token=${api_key}&search=${landStr}&limit=3&search_fields=keywords&sort=published_at`,
        {
          method: "GET",
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

  addSavedQuery = async (queryString: string): Promise<Comparison> => {
    if (!queryString) throw new Error("Invalid query string")
    try {
      const res = await fetch("/api/save-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryString }),
      })
      return res.json()
    } catch (error) {
      console.error(error)
    }
    return {} as Comparison
  }

  deleteSavedQuery = async (id: string): Promise<void> => {
    if (!id) throw new Error("Cannot delete comparison where id is undefined")
    try {
      const res = await fetch("/api/save-query", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      return res.json()
    } catch (error) {
      console.error(error)
    }
  }

  getUser = async (): Promise<User> => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return res.json()
    } catch (error) {
      console.error(error)
    }
    return {} as User
  }

  getCitiesByState = async (
    country: string,
    state: string
  ): Promise<string[]> => {
    if (!state) throw new Error("Invalid state code")
    try {
      const res = await fetch(
        `https://countriesnow.space/api/v0.1/countries/state/cities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country, state }),
        }
      ).then((res) => res.json())
      return res.data
    } catch (error) {
      console.error(error)
    }
    return []
  }

  getStatesByCountry = async (
    country: string
  ): Promise<{ name: string; state_code: string }[]> => {
    if (!country) throw new Error("Invalid country code")
    try {
      const res = await fetch(
        `https://countriesnow.space/api/v0.1/countries/states`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country }),
        }
      ).then((res) => res.json())
      return res.data.states
    } catch (error) {
      console.error(error)
    }
    return []
  }
}

export default new APIService()
