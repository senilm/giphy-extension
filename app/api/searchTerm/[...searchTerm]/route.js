import prisma from "@/app/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { searchTerm } = params;
    const [term, page] = searchTerm;
    // const { gif_url } = await req.json();

    const userId = cookies().get("userId");

    const searchTermData = await prisma.searchTerm.upsert({
      where: {
        keyword: term,
      },
      update: {},
      create: {
        keyword: term,
      },
    });

    await prisma.search.create({
        data:{
            searchTermId:searchTermData.id,
            userId:userId.value
        }
    })

    return NextResponse.json("search term done", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
};
