import React from "react"
import Actions from "./Actions"
import Output from "./Output"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/authOptions"

interface Props {
  params: { query_params: string }
}

const LandOutput = async ({ params }: Props) => {
  const { query_params } = params
  const session = await getServerSession(authOptions)
  const isLoggedIn = session ? true : false

  return (
    <div className="max-w-screen-lg mx-auto">
      <Actions isLoggedIn={isLoggedIn} queryString={query_params} />
      <Output queryString={query_params} />
    </div>
  )
}

export default LandOutput
