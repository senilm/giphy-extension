import prisma from "@/app/db";
import { ObjectId } from "bson";

export const PATCH = async (req, { params }) => {
  try {
    const { userId } = params;
    const body = await req.json();

    const { name, email, profilePicture, bio } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name,
        email,
        profilePicture,
        bio,
      },
    });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });

  }
};


export const GET = async (req, {params}) => {
  try {
      const {userId} = params;
      const data  = await prisma.user.aggregateRaw({
        pipeline:[
          {
            $match:
              {
                _id: {
                  $oid: userId
                }
              }
          },
          {
            $lookup:
              {
                from: "Comment",
                localField: "_id",
                foreignField: "userId",
                as: "comments"
              }
          },
          {
            $lookup:
              {
                from: "Friends",
                localField: "_id",
                foreignField: "userId",
                as: "Friends"
              }
          },
          {
            $lookup:
              {
                from: "GifLike",
                localField: "_id",
                foreignField: "userId",
                as: "Likes"
              }
          },
          {
            $lookup:
              {
                from: "Gif",
                localField: "_id",
                foreignField: "userId",
                as: "Gifs"
              }
          },
          {
            $project:
              {
                _id: 1,
                username: 1,
                bio:1,
                name:1,
                email: 1,
                createdAt: 1,
                Friends:1,
                Gifs:1,
                commentsCount: {
                  $size: "$comments"
                },
                likesCount: {
                  $size: "$Likes"
                },
                friendsCount: {
                  $size: "$Friends"
                },
                gifCount: {
                  $size: "$Gifs"
                }
              }
          }
        ]
      })
      return new Response(JSON.stringify(data[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}