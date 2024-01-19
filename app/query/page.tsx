"use client"
import { useState } from "react"
import LandForm from "../components/land-form/LandForm"
import LandOutput from "../components/land-form/LandOutput"
import { LandFormData } from "@/lib/entities"

export default function Query() {
  const [query, setQuery] = useState<LandFormData>({
    land1: "USA",
    land2: "NOR",
  })
  return (
    <>
      <LandForm setQuery={setQuery} query={query} />
      <LandOutput query={query} />
    </>
  )
}
