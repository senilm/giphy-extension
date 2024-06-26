import prisma from "@/app/db";

export const POST = async (req, { params }) => {
  try {
    const reqData = await req.json();
    const { userId } = params;
    const { friendId } = reqData;

    if (!userId || !friendId) {
      return new Response(
        JSON.stringify({ message: "Please provide required details" }),
        { status: 400 }
      );
    }

    const existingFriendship = await prisma.friends.findUnique({
        where: {
          unique_friends:{
            userId: userId,
            friendId: friendId,
          }
        }
      });
    
      if (existingFriendship) {
        await prisma.friends.delete({
          where: {
            unique_friends: {
              userId: userId,
              friendId: friendId,
            }
          }
          });
          return new Response(
            JSON.stringify({ message: "Remove" }),
            { status: 200 }
          );
      }
    
      const friendship = await prisma.friends.create({
        data: {
          user: {
            connect: { id: userId }
          },
          friend: {
            connect: { id: friendId }
          }
        },
      });

      if(!friendship){
        return new Response(JSON.stringify({ message: "Failed to add friend" }), {
            status: 400,
          });
      }
    
    return new Response(
      JSON.stringify({ message: "Add" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    const friends = await prisma.friends.findMany({
        where: {
          OR: [
            { userId: userId },
            { friendId: userId }
          ]
        },
        include: {
          user: true,  // Include the user details where current user is userId
          friend: true // Include the friend details where current user is friendId
        }
      });

      const allFriends = friends.map(friendship => {
        return friendship.userId === userId ? friendship.friend : friendship.user;
      });

    return new Response(JSON.stringify(allFriends), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};
