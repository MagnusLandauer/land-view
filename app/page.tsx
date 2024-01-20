"use client"
import { Button } from "@nextui-org/react"
import Brand from "./components/land-form/Brand"
import { MdStart } from "react-icons/md"
import { useRouter } from "next/navigation"

export default function Home() {
  const { push } = useRouter()
  return (
    <>
      <Brand />
      <div className="text-center">
        <Button
          variant="bordered"
          size="lg"
          endContent={<MdStart />}
          onClick={() => push("/query")}
        >
          START
        </Button>
      </div>
    </>
  )
}
