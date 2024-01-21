"use client"
import React from "react"
import ErrorContent from "@/app/components/ErrorContent"
import Error from "next/error"

interface Props {
  error: Error
  reset: () => void
}

const error = (props: Props) => {
  return <ErrorContent {...props} />
}
export default error
