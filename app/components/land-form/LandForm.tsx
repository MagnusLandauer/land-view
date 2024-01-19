"use client"

import { LandFormData, Lands } from "@/lib/entities"
import { FormEvent, useState } from "react"
import Button from "../Buttons.component"
import { useMutation } from "@tanstack/react-query"
import APIService from "@/lib/APIService"
import { useQueryClient } from "@tanstack/react-query"

const defaultFormVals = {
  land1: "USA",
  land2: "NOR",
} as LandFormData

const LandForm = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (formData: LandFormData) => APIService.getLandData(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["query"], data)
    },
  })

  const url_params = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  )
  const query_params = {
    land1: url_params.land1 || defaultFormVals.land1,
    land2: url_params.land2 || defaultFormVals.land2,
  }

  const [formValues, setFormValues] = useState(query_params)

  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formValues)
    const params = new URLSearchParams(
      `land1=${formValues.land1}&land2=${formValues.land2}`
    )
    window.location.search = params.toString()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="land1">Land 1</label>
      <select
        name="land1"
        id="land1"
        value={formValues.land1}
        onChange={handleChange}
      >
        {Object.entries(Lands).map(([code, name], i) => {
          return (
            <option key={`land1-${1}-${code}`} value={code}>
              {name}
            </option>
          )
        })}
      </select>

      <label htmlFor="land2">Land 2</label>
      <select
        name="land2"
        id="land2"
        value={formValues.land2}
        onChange={handleChange}
      >
        {Object.entries(Lands).map(([code, name]) => {
          return (
            <option key={`land2-${1}-${code}`} value={code}>
              {name}
            </option>
          )
        })}
      </select>
      <Button type="submit">Go!</Button>
    </form>
  )
}

export default LandForm
