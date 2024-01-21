import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import authOptions from "@/lib/authOptions"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email!

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      comparisons: true,
    },
  })

  return NextResponse.json(user)
}
