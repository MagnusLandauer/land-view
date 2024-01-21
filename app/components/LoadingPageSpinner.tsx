import { Spinner } from "@nextui-org/react"

interface Props {
  className?: string
}

const LoadingPageSpinner = ({ className = "" }: Props) => {
  return (
    <div className="mx-auto -mt-8 h-screen flex items-center justify-center">
      <Spinner color="secondary" size="lg" />
    </div>
  )
}

export default LoadingPageSpinner
