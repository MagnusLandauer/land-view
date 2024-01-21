"use client"
import { Button } from "@nextui-org/react"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import Error from "next/error"

interface ErrorContentProps {
  error?: Error
  reset?: () => void
}

const ErrorContent = ({ error, reset }: ErrorContentProps) => {
  const { push } = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-screen -mt-8">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-3xl">Oh no!</h1>
        <p>The system is fighting bugs at the moment.</p>
        <Button color="primary" variant="ghost" onClick={() => push("/")}>
          Run away from bug
        </Button>
        {!!reset && (
          <Button color="primary" variant="ghost" onClick={() => reset()}>
            Try again
          </Button>
        )}
      </div>
    </div>
  )
}

export default ErrorContent
