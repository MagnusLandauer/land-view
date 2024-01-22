"use client"
import { Button, Link } from "@nextui-org/react"
import Brand from "./components/land-output/Brand"
import { MdOutlineAttribution, MdStart } from "react-icons/md"
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
        <div className="mt-16">
          <p>
            A country information viewer and comparison tool made by{" "}
            <Link href="https://github.com/MagnusLandauer" isExternal>
              Magnus Landauer
            </Link>
          </p>
          <Link href="/attributions" className="mt-8">
            Attributions
            <MdOutlineAttribution className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  )
}
