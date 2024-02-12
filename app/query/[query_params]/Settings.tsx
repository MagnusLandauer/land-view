"use client"
import { SettingsContext } from "@/app/Providers"
import { Switch } from "@nextui-org/react"
import React, { useContext } from "react"
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"

const Settings = () => {
  const settingsContext = useContext(SettingsContext)
  if (settingsContext === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  const { settings, setSettings } = settingsContext

  const handleTempUnitChange = (val: boolean) => {
    setSettings({
      ...settings,
      temp_unit: val ? "C" : "F",
    })
  }

  const handleTimeFormatChange = (val: boolean) => {
    setSettings({
      ...settings,
      time_format: val ? "24" : "12",
    })
  }

  return (
    <div className="flex gap-5 items-center">
      <Switch
        defaultSelected
        size="lg"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <TbTemperatureCelsius className={className} />
          ) : (
            <TbTemperatureFahrenheit className={className} />
          )
        }
        onValueChange={handleTempUnitChange}
      >
        Temp. Unit
      </Switch>
      <Switch
        defaultSelected
        size="lg"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <span className={className}>24</span>
          ) : (
            <span className={className}>12</span>
          )
        }
        onValueChange={handleTimeFormatChange}
      >
        Hour format
      </Switch>
    </div>
  )
}

export default Settings
