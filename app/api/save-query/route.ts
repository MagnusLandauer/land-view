import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import authOptions from "@/lib/authOptions"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email!
  const { queryString } = await req.json()

  const userId = await prisma.user
    .findUnique({
      where: { email: userEmail },
    })
    .then((user) => user?.id!)

  const record = await prisma.savedComparison.create({
    data: {
      locations: queryString,
      userId,
    },
  })

  return NextResponse.json(record)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()

  const record = await prisma.savedComparison.delete({
    where: {
      id: id,
    },
  })

  return NextResponse.json(record)
}
