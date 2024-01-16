"use client"
import { useSession } from "next-auth/react"
import React from "react"
import LoadingSpinner from "./LoadingSpinner"
import Link from "next/link"
import Image from "next/image"
import { signOut, signIn } from "next-auth/react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  const { className } = props
  return (
    <button
      {...props}
      className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-300 transition-colors duration-3"
    >
      {children}
    </button>
  )
}

export const SignInButton = () => {
  const { data: session, status } = useSession()
  if (status === "loading")
    return <LoadingSpinner className="text-blue-100 h-6 w-6" />
  if (status === "authenticated") {
    return (
      <div className="flex gap-4 items-center">
        <Link href="/account">
          <Image
            src={session?.user?.image ?? "/avatar.png"}
            alt="user avatar"
            width={40}
            height={40}
            className="rounded-full bg-white"
          />
        </Link>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }
  return <Button onClick={() => signIn()}>Sign in</Button>
}

export default Button
