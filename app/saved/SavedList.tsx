"use client"
import APIService from "@/lib/APIService"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Skeleton,
  Spinner,
} from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"
import { MdOutlineDeleteOutline } from "react-icons/md"

const SavedList = () => {
  const { push } = useRouter()
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => APIService.getUser(),
  })

  const [actionId, setActionId] = useState<string | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => APIService.deleteSavedQuery(id),
    onSuccess: () => {
      setActionId(null)
      refetch()
    },
    onError: (error: any) => {
      setActionId(null)
      console.log(error)
    },
  })

  const handleDelete = useCallback(
    (id: string) => {
      setActionId(id)
      mutate(id)
    },
    [mutate]
  )

  const { comparisons } = user || {}
  return (
    <Card className="p-2 max-w-md">
      <CardHeader>
        <h1 className="text-3xl">Saved queries</h1>
      </CardHeader>
      <CardBody>
        {isLoading && (
          <div className="w-full flex flex-col gap-4">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        )}
        {comparisons?.length === 0 && (
          <div>
            <p className="mb-4">No saved queries</p>
            <Button
              variant="ghost"
              color="primary"
              onClick={() => {
                push("/query")
              }}
            >
              Start a new query
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-3" data-testid="queries-wrapper">
          {comparisons?.map((comparison) => {
            const { id, locations } = comparison
            return (
              <div key={id} className="flex justify-between">
                <Link href={`/query/${locations}`}>{locations}</Link>
                <div className="flex gap-4">
                  <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    aria-label="Delete"
                    onClick={() => handleDelete(id)}
                  >
                    {isPending && actionId === id ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      <MdOutlineDeleteOutline />
                    )}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}

export default SavedList
