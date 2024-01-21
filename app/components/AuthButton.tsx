"use client"
import { useSession } from "next-auth/react"
import React from "react"
import Link from "next/link"
import { signOut, signIn } from "next-auth/react"
import {
  Avatar,
  Button,
  CircularProgress,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"

const SignInButton = () => {
  const { data: session, status } = useSession()
  if (status === "loading")
    return <CircularProgress color="primary" size="md" />
  if (status === "authenticated") {
    const avatar =
      session?.user?.image === null ? undefined : session?.user?.image
    return (
      <div className="flex gap-4 items-center">
        <Popover backdrop="opaque" placement="bottom">
          <PopoverTrigger>
            <Avatar color="secondary" isBordered src={avatar} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <Button
                onClick={() => signOut()}
                variant="bordered"
                color="primary"
              >
                Sign out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
  return (
    <Button onClick={() => signIn()} color="primary" variant="ghost">
      Sign in
    </Button>
  )
}

export default SignInButton
