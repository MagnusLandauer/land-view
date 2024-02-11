"use client"
import { Button, Skeleton, Spinner, Switch, Tooltip } from "@nextui-org/react"
import React, { useCallback, useEffect, useState } from "react"
import APIService from "@/lib/APIService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"

const Actions = ({
  isLoggedIn,
  queryString,
}: {
  isLoggedIn: boolean
  queryString: string
}) => {
  const [showError, setShowError] = useState(false)
  const queryClient = useQueryClient()
  const hasLandData = queryClient.getQueryData(["query"]) !== undefined

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => APIService.getUser(),
    enabled: isLoggedIn,
  })

  const [isSaved, setIsSaved] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (queryStr: string) => APIService.addSavedQuery(queryStr),
    onSuccess: () => {
      setIsSaved(true)
      refetch()
    },
    onError: (error: any) => {
      setShowError(true)
    },
  })

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }
  }, [showError])

  useEffect(() => {
    const { comparisons } = user || {}
    const checkSaved = comparisons?.some((comparison) => {
      return comparison.locations === queryString
    })
    setIsSaved(!!checkSaved)
  }, [user])

  const handleSave = useCallback(() => {
    mutate(queryString)
  }, [queryString])

  return (
    <div className="flex gap-4 mb-8">
      {isLoggedIn && isLoading ? (
        <div className="h-4 flex mb-8">
          <Skeleton className="w-1/5 rounded-lg" />
        </div>
      ) : isLoggedIn && user ? (
        <Tooltip
          isOpen={showError}
          placement="bottom-start"
          showArrow
          content={
            <p className="text-danger p-3">
              Something went wrong while saving your query
            </p>
          }
        >
          <Button
            variant="ghost"
            color="secondary"
            onClick={handleSave}
            isLoading={isPending}
            isDisabled={isSaved}
            spinner={<Spinner size="sm" color="secondary" />}
          >
            {isSaved ? "Saved" : "Save"}
          </Button>
        </Tooltip>
      ) : null}

      {hasLandData && false && (
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
        >
          Tempurature unit
        </Switch>
      )}
    </div>
  )
}

export default Actions
