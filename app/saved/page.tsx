import authOptions from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"
import SavedList from "./SavedList"

const Saved = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div>
      <SavedList />
    </div>
  )
}

export default Saved
