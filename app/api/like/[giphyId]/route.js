import prisma from "@/app/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export const PATCH = async (req, { params }) => {
  try {
    const { giphyId } = params;
    const data = await req.json();
    const { gifUrl } = data


    const gifData = await prisma.gif.upsert({
      where: { gifyId: giphyId },
      update: {},
      create: { gifyId: giphyId, url: gifUrl },
    });
    
    const userId = cookies().get("userId");

    const existingLike = await prisma.gifLike.findUnique({
      where: {
        giflikeid: {
          userId: userId.value,
          gifId: gifData.id,
        },
      },
    });

    if (existingLike) {
      await prisma.gifLike.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.gifLike.create({
        data: {
          user: { connect: { id: userId.value } },
          gif: { connect: { id: gifData.id } },
        },
      });
    }
    
    
    const likedGifsData = await prisma.gifLike.findMany({
      where: {
        userId: userId.value,
      },
      select: {
        gif: {
          select: {
            gifyId: true,
          },
        },
      },
    });
    const likedGifs = likedGifsData.map((gif)=>{
      return gif.gif.gifyId
    })
    cookies().set('likedGifs',JSON.stringify(likedGifs))

    return NextResponse.json("Liked request done", { status: 200 });
    
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
};
