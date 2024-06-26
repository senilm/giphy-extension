import prisma from "@/app/db";
import { convertToGif } from "@/lib/convertToGif";
import { generateUid } from "@/lib/generateUid";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// get friends gifs
export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    const friends = await prisma.friends.findMany({
      where: {
        userId: userId,
      },
    });

    if (!friends) {
      return new Response([], { status: 200 });
    }

    const friendIds = friends.map((friend) => friend.id);

    const gifs = await prisma.gif.findMany({
      where: {
        id: {
          $in: friendIds,
        },
      },
    });

    return new Response(gifs, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};

export const POST = async (req, { params }) => {
  try {
    const { userId } = params;

    const formData = await req.formData();
    const caption = formData.get("caption");
    const file = formData.get("file");

    if (!file) {
      return new Response(
        JSON.stringify({ message: "Please provide a file to upload" }),
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });

    if (!res || !res.secure_url) {
      throw new Error("Failed to upload the file to Cloudinary.");
    }

    let ans = res.secure_url;
    if(ans.endsWith('.mp4')){
      ans = convertToGif(ans)
    }
    const uid = generateUid(ans);

    const GifC = await prisma.gif.create({
      data: {
        userId: userId,
        url: ans,
        caption,
        gifyId: uid,
      },
    });

    if (!GifC) {
      throw new Error("Failed to save the GIF in the database.");
    }

    return new Response(JSON.stringify({ message: ans }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
