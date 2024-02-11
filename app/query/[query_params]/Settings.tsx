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

  return (
    <div>
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
        Tempurature unit
      </Switch>
    </div>
  )
}

export default Settings
