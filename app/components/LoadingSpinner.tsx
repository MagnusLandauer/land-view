import React from "react"
import { CgSpinner } from "react-icons/cg"

interface Props {
  className?: string
}

const LoadingSpinner = ({ className = "" }: Props) => {
  return <CgSpinner className={`${className} animate-spin`} />
}

export default LoadingSpinner
