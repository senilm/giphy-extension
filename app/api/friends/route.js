import prisma from "@/app/db";
import { cookies } from "next/headers";

export const GET = async (req, res) => {
  try {
    const userId = cookies().get("userId");

    const friends = await prisma.friends.findMany({
      where: {
        userId: userId.value,
      },
      select: {
        friendId: true,
      },
    });

    const friendIds = friends.map((friend) => friend.friendId);

    const suggestedFriends = await prisma.user.findMany({
      where: {
        id: {
          notIn: [...friendIds, userId.value],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return new Response(JSON.stringify(suggestedFriends), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};
