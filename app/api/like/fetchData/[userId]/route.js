import prisma from "@/app/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    const gifLikes = await prisma.gifLike.findMany({
      where: {
        userId: userId,
      },
      include: {
        gif: true,
      },
    });

    return NextResponse.json(gifLikes, { status: 200 });
  } catch (error) {
    return NextResponse.json("Error while fetching favorite",{status:400})
  }
};
