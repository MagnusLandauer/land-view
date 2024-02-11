import React from "react"
import Actions from "./Actions"
import Output from "./Output"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/authOptions"
import Settings from "./Settings"

interface Props {
  params: { query_params: string }
}

const LandOutput = async ({ params }: Props) => {
  const { query_params } = params
  const session = await getServerSession(authOptions)

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex gap-4 mb-8">
        {session && (
          <Actions isLoggedIn={!!session} queryString={query_params} />
        )}
        <Settings />
      </div>
      <Output queryString={query_params} />
    </div>
  )
}

export default LandOutput
