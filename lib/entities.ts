export enum Lands {
  USA = "United States of America",
  NOR = "Norway",
  SWE = "Sweden",
  FIN = "Finland",
  DEN = "Denmark",
  GBR = "United Kingdom",
  FRA = "France",
  IRL = "Ireland",
  NLD = "Netherlands",
  BEL = "Belgium",
  CAN = "Canada",
  MEX = "Mexico",
  BRA = "Brazil",
  ARG = "Argentina",
  CHL = "Chile",
  PER = "Peru",
  VEN = "Venezuela",
}

export interface User {
  id: string
  email: string
  name: string
  image: string
  createdAt: Date
  updatedAt: Date
  comparisons: Comparison[]
}

export interface Comparison {
  id: string
  locations: string
  userId: string
}

export interface LandFormData {
  land1: string
  land2: string
}

export interface CountryData {
  [key: string]: unknown
  name: {
    common: string
    official: string
    nativeName: unknown
  }
  cca2: string
  latlng: [number, number]
  landlocked: boolean
  borders: string[]
  area: number
  demonyms: unknown
  flag: string
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
  population: number
  gini: unknown
  fifa: string
  car: {
    signs: string[]
    side: string
  }
  capital: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  coatsOfArms: {
    png: string
    svg: string
  }
  timezones: string[]
  continents: string[]
  flags: {
    png: string
    svg: string
    alt: string
  }
  coatOfArms: {
    png: string
    svg: string
  }
  startOfWeek: string
  capitalInfo: {
    latlng: [number, number]
  }
  postalCode: {
    format: string
    regex: string
  }
}

export interface WeatherData {
  current: {
    [key: string]: unknown
    feelslike: number
    observation_time: string
    temperature: number
    weather_descriptions: string[]
    weather_icons: string[]
  }
  location: {
    [key: string]: unknown
    country: string
    lat: string
    localtime: string
    localtime_epoch: number
    lon: string
    name: string
    region: string
    timezone_id: string
    utc_offset: string
  }
}

type Article = {
  author: string | null
  content: string | null
  description: string | null
  publishedAt: string | null
  source: {
    id: string | null
    name: string | null
  }
  title: string
  url: string
  urlToImage: string | null
}

export interface NewsData {
  articles: Article[]
  status: string
  totalResults: number
}

export interface CurrencyExchangeData {
  [key: string]: number
}
