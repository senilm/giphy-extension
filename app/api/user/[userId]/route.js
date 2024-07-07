import prisma from "@/app/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const PATCH = async (req, { params }) => {
  try {
    const { userId } = params;
    const formData = await req.formData();
    const profilePicture = formData.get("profilePicture");
    const bio = formData.get("bio");
    const MAX_BIO_LENGTH = 150;

    if (bio.length > MAX_BIO_LENGTH) {
      return new Response(
        JSON.stringify({
          message: `Bio cannot exceed ${MAX_BIO_LENGTH} characters`,
        }),
        {
          status: 400,
        }
      );
    }
    let profilePictureUrl = "";

    if (profilePicture) {
      const photoBuffer = await profilePicture.arrayBuffer();
      const photoUint8Array = new Uint8Array(photoBuffer);

      const res = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          })
          .end(photoUint8Array);
      });

      if (!res || !res.secure_url) {
        throw new Error("Failed to upload the file to Cloudinary.");
      }
      
      profilePictureUrl = res.secure_url;
    }

    let updatedUser;
    if(profilePictureUrl){
       updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profilePicture: profilePictureUrl,
          bio,
        },
      });
    }else{
      updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          bio,
        },
      });
    }
    
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;
    const data = await prisma.user.aggregateRaw({
      pipeline: [
        {
          $match: {
            _id: {
              $oid: userId,
            },
          },
        },
        {
          $lookup: {
            from: "Comment",
            localField: "_id",
            foreignField: "userId",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "Friends",
            localField: "_id",
            foreignField: "userId",
            as: "Friends",
          },
        },
        {
          $lookup: {
            from: "GifLike",
            localField: "_id",
            foreignField: "userId",
            as: "Likes",
          },
        },
        {
          $lookup: {
            from: "Gif",
            localField: "_id",
            foreignField: "userId",
            as: "Gifs",
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            bio: 1,
            name: 1,
            email: 1,
            profilePicture: 1,
            createdAt: 1,
            Friends: 1,
            Gifs: 1,
            commentsCount: {
              $size: "$comments",
            },
            likesCount: {
              $size: "$Likes",
            },
            friendsCount: {
              $size: "$Friends",
            },
            gifCount: {
              $size: "$Gifs",
            },
          },
        },
      ],
    });
    return new Response(JSON.stringify(data[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
