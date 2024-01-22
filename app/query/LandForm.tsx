"use client"

import { LandFormData, Lands } from "@/lib/entities"
import { ChangeEventHandler, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectItem, Button } from "@nextui-org/react"
import { FaPlay } from "react-icons/fa"
import { IoSwapHorizontal } from "react-icons/io5"

const defaultFormVals = {
  land1: "",
  land2: "",
} as LandFormData

const LandForm = () => {
  const { push } = useRouter()
  const [formValues, setFormValues] = useState<LandFormData>(defaultFormVals)
  const [showValidation, setShowValidation] = useState(false)

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value, name } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setShowValidation(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formValues.land1 || !formValues.land2) {
      setShowValidation(true)
      return
    }
    const shortQuery = `${formValues.land1}-${formValues.land2}`
    push(`/query/${shortQuery}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 md:flex-row items-center max-w-sm mx-auto md:max-w-xl">
        {showValidation && (
          <div className="text-red-500">Please select two countries</div>
        )}
        <Select
          label="Select a country"
          size="md"
          variant="bordered"
          name="land1"
          selectedKeys={[formValues.land1]}
          disabledKeys={[formValues.land2]}
          onChange={handleChange}
        >
          {Object.entries(Lands).map(([code, name]) => {
            return <SelectItem key={code}>{name}</SelectItem>
          })}
        </Select>

        <IoSwapHorizontal className="w-6 h-6 md:w-10 md:h-10" />

        <Select
          label="Select a country"
          size="md"
          variant="bordered"
          name="land2"
          selectedKeys={[formValues.land2]}
          disabledKeys={[formValues.land1]}
          onChange={handleChange}
        >
          {Object.entries(Lands).map(([code, name]) => {
            return <SelectItem key={code}>{name}</SelectItem>
          })}
        </Select>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="px-10 y-6 text-white"
        >
          <FaPlay />
        </Button>
      </div>
    </form>
  )
}

export default LandForm
